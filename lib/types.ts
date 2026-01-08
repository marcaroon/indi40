// lib/types.ts
// TypeScript type definitions untuk INDI 4.0 Assessment

export interface QuestionOption {
  value: string;
  label: string;
  score?: number;
  isExclusive?: boolean; // True jika pilihan ini eksklusif (tidak bisa dipilih bersamaan dengan opsi lain)
}

export type QuestionType = "text" | "textarea" | "single" | "multiple";
export type ScoringType = "direct" | "reverse" | "count" | null;

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options?: QuestionOption[];
  scoring?: Record<string, number> | "count";
  required?: boolean;
  placeholder?: string;
}

export interface Section {
  id: string;
  title: string;
  weight: number; // Bobot pilar (0 untuk info, 0.15-0.30 untuk pilar assessment)
  questions: Question[];
}

export interface AssessmentResponse {
  [questionId: string]: string | string[];
}

export interface PillarScore {
  score: number;
  level: number;
  weight: number;
}

export interface PillarDetail extends PillarScore {
  title: string;
}

export interface AssessmentResults {
  pillarScores: Record<string, number>;
  pillarDetails: Record<string, PillarDetail>;
  totalScore: number;
  overallLevel: number;
  timestamp: string;
  companyInfo: {
    name: string;
    sector: string;
    employees: string;
  };
}

export interface SavedAssessment extends AssessmentResults {
  id?: number;
  assessmentId?: number;
}

// Database types
export interface DBQuestion {
  id: string;
  section_id: string;
  section_title: string;
  question_text: string;
  question_type: QuestionType;
  scoring_type: ScoringType;
  section_weight: number;
  question_order: number;
  created_at: Date;
}

export interface DBOption {
  id: number;
  question_id: string;
  option_value: string;
  option_label: string;
  score_value: number | null;
  is_exclusive: boolean;
  display_order: number;
}

export interface DBAssessment {
  id: number;
  company_name: string;
  company_address: string | null;
  industry_sector: string | null;
  employee_count: string | null;
  annual_revenue: string | null;
  respondent_position: string | null;
  contact_info: string | null;
  total_score: number;
  overall_level: number;
  completed_at: Date;
  ip_address: string | null;
  user_agent: string | null;
}

export interface DBResponse {
  id: number;
  assessment_id: number;
  question_id: string;
  response_value: string;
  created_at: Date;
}

export interface DBPillarScore {
  id: number;
  assessment_id: number;
  pillar_id: string;
  pillar_name: string;
  score: number;
  level: number;
  weight: number;
  created_at: Date;
}

// API Response types
export interface APIResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SubmitAssessmentResponse {
  success: boolean;
  assessmentId: number;
  results: AssessmentResults;
}

export interface GetAssessmentResponse {
  success: boolean;
  assessment: DBAssessment;
  responses: DBResponse[];
  pillarScores: DBPillarScore[];
}

// Utility types
export type LevelDescription =
  | "Belum Siap"
  | "Kesiapan Awal"
  | "Kesiapan Sedang"
  | "Kesiapan Matang"
  | "Sudah Menerapkan";

export interface RadarChartData {
  subject: string;
  A: number;
  fullMark: number;
}

export interface ExportPDFOptions {
  elementId: string;
  filename: string;
  format?: "a4" | "letter";
  orientation?: "portrait" | "landscape";
}
