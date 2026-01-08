// app/api/assessments/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool, { transaction } from "@/lib/db";
import { calculateAssessmentResults } from "@/lib/calculations";
import { sections } from "@/lib/questions";
import type { AssessmentResponse } from "@/lib/types";

/**
 * POST /api/assessments
 * Submit assessment and calculate results
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const responses: AssessmentResponse = body.responses;

    if (!responses || Object.keys(responses).length === 0) {
      return NextResponse.json(
        { success: false, error: "No responses provided" },
        { status: 400 }
      );
    }

    // Calculate results
    const results = calculateAssessmentResults(responses, sections);

    // Save to database using transaction
    const assessmentId = await transaction(async (connection) => {
      // 1. Insert main assessment record
      const [assessmentResult] = await connection.execute(
        `INSERT INTO assessments 
         (company_name, company_address, industry_sector, employee_count, 
          annual_revenue, respondent_position, contact_info, total_score, 
          overall_level, ip_address, user_agent) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          responses["1.1"] || "",
          responses["1.2"] || "",
          responses["1.3"] || "",
          responses["1.4"] || "",
          responses["1.5"] || "",
          responses["1.6"] || "",
          responses["1.7"] || "",
          results.totalScore,
          results.overallLevel,
          request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "unknown",
          request.headers.get("user-agent") || "unknown",
        ]
      );

      const insertId = (assessmentResult as any).insertId;

      // 2. Insert all responses
      for (const [questionId, value] of Object.entries(responses)) {
        const responseValue = Array.isArray(value)
          ? JSON.stringify(value)
          : String(value);

        await connection.execute(
          "INSERT INTO responses (assessment_id, question_id, response_value) VALUES (?, ?, ?)",
          [insertId, questionId, responseValue]
        );
      }

      // 3. Insert pillar scores
      for (const [pillarId, detail] of Object.entries(results.pillarDetails)) {
        await connection.execute(
          `INSERT INTO pillar_scores 
           (assessment_id, pillar_id, pillar_name, score, level, weight) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [
            insertId,
            pillarId,
            detail.title,
            detail.score,
            detail.level,
            detail.weight,
          ]
        );
      }

      // 4. Log to audit
      await connection.execute(
        "INSERT INTO audit_log (assessment_id, action, details) VALUES (?, ?, ?)",
        [
          insertId,
          "CREATE",
          `Assessment submitted from IP: ${
            request.headers.get("x-forwarded-for") || "unknown"
          }`,
        ]
      );

      return insertId;
    });

    return NextResponse.json({
      success: true,
      assessmentId,
      results,
    });
  } catch (error: any) {
    console.error("Error processing assessment:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process assessment",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/assessments
 * Get all assessments with pagination
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const [assessments] = await pool.query(
      `SELECT id, company_name, industry_sector, total_score, 
              overall_level, completed_at 
       FROM assessments 
       ORDER BY completed_at DESC 
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [totalResult] = await pool.query(
      "SELECT COUNT(*) as count FROM assessments"
    );
    const total = (totalResult as any)[0].count;

    return NextResponse.json({
      success: true,
      data: {
        assessments,
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });
  } catch (error: any) {
    console.error("Error fetching assessments:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch assessments",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
