// lib/db.ts
// MySQL database connection pool setup

import mysql from "mysql2/promise";

// Create the connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "indi40",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Test the connection
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();
    console.log("Database connection successful");
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}

// Execute query with error handling
export async function executeQuery<T = any>(
  query: string,
  params: any[] = []
): Promise<T> {
  try {
    const [results] = await pool.execute(query, params);
    return results as T;
  } catch (error) {
    console.error("Query execution error:", error);
    throw error;
  }
}

// Execute query and return first row
export async function queryOne<T = any>(
  query: string,
  params: any[] = []
): Promise<T | null> {
  try {
    const [results] = await pool.execute(query, params);
    const rows = results as T[];
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error("Query execution error:", error);
    throw error;
  }
}

// Transaction helper
export async function transaction<T>(
  callback: (connection: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// Batch insert helper
export async function batchInsert(
  table: string,
  columns: string[],
  values: any[][]
): Promise<void> {
  if (values.length === 0) return;

  const placeholders = values
    .map(() => `(${columns.map(() => "?").join(", ")})`)
    .join(", ");
  const query = `INSERT INTO ${table} (${columns.join(
    ", "
  )}) VALUES ${placeholders}`;
  const flatValues = values.flat();

  await executeQuery(query, flatValues);
}

// Get single assessment by ID
export async function getAssessmentById(id: number) {
  const assessment = await queryOne("SELECT * FROM assessments WHERE id = ?", [
    id,
  ]);

  if (!assessment) return null;

  const responses = await executeQuery(
    "SELECT * FROM responses WHERE assessment_id = ?",
    [id]
  );

  const pillarScores = await executeQuery(
    "SELECT * FROM pillar_scores WHERE assessment_id = ?",
    [id]
  );

  return {
    assessment,
    responses,
    pillarScores,
  };
}

// Get all assessments with pagination
export async function getAssessments(limit: number = 50, offset: number = 0) {
  const assessments = await executeQuery(
    `SELECT id, company_name, industry_sector, total_score, overall_level, completed_at 
     FROM assessments 
     ORDER BY completed_at DESC 
     LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  const total = await queryOne<{ count: number }>(
    "SELECT COUNT(*) as count FROM assessments"
  );

  return {
    assessments,
    total: total?.count || 0,
    limit,
    offset,
  };
}

// Get assessment statistics
export async function getAssessmentStats() {
  const [
    totalAssessments,
    averageScore,
    levelDistribution,
    sectorDistribution,
    recentAssessments,
  ] = await Promise.all([
    queryOne<{ count: number }>("SELECT COUNT(*) as count FROM assessments"),
    queryOne<{ avg_score: number }>(
      "SELECT AVG(total_score) as avg_score FROM assessments"
    ),
    executeQuery<Array<{ overall_level: number; count: number }>>(
      "SELECT overall_level, COUNT(*) as count FROM assessments GROUP BY overall_level ORDER BY overall_level"
    ),
    executeQuery<
      Array<{ industry_sector: string; count: number; avg_score: number }>
    >(
      `SELECT industry_sector, COUNT(*) as count, AVG(total_score) as avg_score 
       FROM assessments 
       WHERE industry_sector IS NOT NULL 
       GROUP BY industry_sector 
       ORDER BY count DESC 
       LIMIT 10`
    ),
    executeQuery(
      `SELECT id, company_name, industry_sector, total_score, overall_level, completed_at 
       FROM assessments 
       ORDER BY completed_at DESC 
       LIMIT 5`
    ),
  ]);

  return {
    totalAssessments: totalAssessments?.count || 0,
    averageScore: averageScore?.avg_score || 0,
    levelDistribution,
    sectorDistribution,
    recentAssessments,
  };
}

export default pool;
