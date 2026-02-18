// app/api/assessments/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { calculateAssessmentResults } from "@/lib/calculations";
import { sections } from "@/lib/questions";
import type { AssessmentResponse } from "@/lib/types";

/**
 * GET /api/assessments/[id]
 * Get assessment details by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const assessmentId = parseInt(id);

    if (isNaN(assessmentId)) {
      return NextResponse.json(
        { success: false, error: "Invalid assessment ID" },
        { status: 400 },
      );
    }

    // Get assessment data
    const [assessmentRows] = await pool.query(
      "SELECT * FROM assessments WHERE id = ?",
      [assessmentId],
    );

    const assessments = assessmentRows as any[];
    if (assessments.length === 0) {
      return NextResponse.json(
        { success: false, error: "Assessment not found" },
        { status: 404 },
      );
    }

    const assessment = assessments[0];

    // Get responses
    const [responsesRows] = await pool.query(
      "SELECT question_id, response_value FROM responses WHERE assessment_id = ?",
      [assessmentId],
    );

    const responses: AssessmentResponse = {};
    (responsesRows as any[]).forEach((row) => {
      try {
        // Try to parse as JSON (for multiple choice)
        responses[row.question_id] = JSON.parse(row.response_value);
      } catch {
        // If not JSON, use as string
        responses[row.question_id] = row.response_value;
      }
    });

    // Recalculate results
    const results = calculateAssessmentResults(responses, sections);

    return NextResponse.json({
      success: true,
      assessment: {
        id: assessment.id,
        completed_at: assessment.completed_at,
      },
      results,
    });
  } catch (error: any) {
    console.error("Error fetching assessment details:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch assessment details",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
