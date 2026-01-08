// lib/calculations.ts
// Logic perhitungan skor INDI 4.0 sesuai dengan PDF

import type {
  Question,
  AssessmentResponse,
  PillarDetail,
  AssessmentResults,
} from "./types";

/**
 * Calculate score for a single question
 */
export function calculateQuestionScore(
  question: Question,
  response: string | string[] | undefined
): number {
  if (!response || response === "") return 0;

  // For questions without scoring (company info)
  if (!question.scoring) return 0;

  // For multiple choice with count scoring
  if (question.scoring === "count") {
    if (!Array.isArray(response)) return 0;

    // Filter out exclusive options (A, E, F - typically "Tidak ada", "Belum ada")
    const validSelections = response.filter(
      (value) => !["A", "E", "F"].includes(value)
    );

    // If "Tidak ada" or similar is selected, score is 0
    if (
      response.includes("A") ||
      response.includes("E") ||
      response.includes("F")
    ) {
      return 0;
    }

    // Score is the count of valid selections, max 4
    return Math.min(validSelections.length, 4);
  }

  // For single choice with direct scoring
  if (typeof question.scoring === "object") {
    const value = Array.isArray(response) ? response[0] : response;
    return question.scoring[value] || 0;
  }

  return 0;
}

/**
 * Calculate pillar score (average of all questions in the pillar)
 */
export function calculatePillarScore(
  responses: AssessmentResponse,
  questions: Question[]
): number {
  let totalScore = 0;
  let questionCount = 0;

  questions.forEach((question) => {
    if (!question.scoring) return; // Skip non-scored questions

    const response = responses[question.id];
    if (!response) return; // Skip unanswered questions

    const score = calculateQuestionScore(question, response);
    totalScore += score;
    questionCount++;
  });

  return questionCount > 0 ? totalScore / questionCount : 0;
}

/**
 * Get level from score (0-4)
 */
export function getLevel(score: number): number {
  if (score >= 4) return 4;
  if (score >= 3) return 3;
  if (score >= 2) return 2;
  if (score >= 1) return 1;
  return 0;
}

/**
 * Get level description in Indonesian
 */
export function getLevelDescription(level: number): string {
  const descriptions: Record<number, string> = {
    0: "Belum Siap",
    1: "Kesiapan Awal",
    2: "Kesiapan Sedang",
    3: "Kesiapan Matang",
    4: "Sudah Menerapkan",
  };
  return descriptions[level] || "N/A";
}

/**
 * Get detailed level interpretation
 */
export function getLevelInterpretation(
  level: number,
  pillarName?: string
): string {
  const interpretations: Record<number, string> = {
    0: pillarName
      ? `${pillarName} belum siap untuk bertransformasi ke Industri 4.0. Diperlukan peningkatan signifikan.`
      : "Perusahaan belum siap untuk bertransformasi ke Industri 4.0. Diperlukan peningkatan signifikan di semua aspek.",
    1: pillarName
      ? `${pillarName} berada pada tahap kesiapan awal. Sudah ada pemahaman tentang Industri 4.0 tetapi masih memerlukan banyak persiapan.`
      : "Perusahaan berada pada tahap kesiapan awal. Sudah ada pemahaman tentang Industri 4.0 tetapi masih memerlukan banyak persiapan.",
    2: pillarName
      ? `${pillarName} berada pada tahap kesiapan sedang. Sudah ada fondasi yang baik untuk bertransformasi ke Industri 4.0.`
      : "Perusahaan berada pada tahap kesiapan sedang. Sudah ada fondasi yang baik untuk bertransformasi ke Industri 4.0.",
    3: pillarName
      ? `${pillarName} berada pada tahap kesiapan matang. Siap untuk mengimplementasikan Industri 4.0 secara lebih luas.`
      : "Perusahaan berada pada tahap kesiapan matang. Siap untuk mengimplementasikan Industri 4.0 secara lebih luas.",
    4: pillarName
      ? `${pillarName} sudah menerapkan sebagian besar konsep Industri 4.0 dan sangat siap untuk transformasi penuh.`
      : "Perusahaan sudah menerapkan sebagian besar konsep Industri 4.0 dan sangat siap untuk transformasi penuh.",
  };
  return interpretations[level] || "Interpretasi tidak tersedia.";
}

/**
 * Get pillar-specific interpretation
 */
export function getPillarInterpretation(
  pillarId: string,
  level: number
): string {
  const interpretations: Record<string, Record<number, string>> = {
    management: {
      0: "Dukungan manajemen dan organisasi belum ada",
      1: "Manajemen dan organisasi sudah memiliki rencana transformasi ke Industri 4.0",
      2: "Manajemen dan organisasi sudah mulai bertransformasi ke Industri 4.0",
      3: "Manajemen organisasi sudah melaksanakan transformasi ke Industri 4.0",
      4: "Manajemen dan organisasi sudah menerapkan Industri 4.0",
    },
    people_culture: {
      0: "Orang dan budaya belum mendukung transformasi ke Industri 4.0",
      1: "Orang dan budaya sudah mengenal transformasi ke Industri 4.0",
      2: "Orang dan budaya sudah menuju ke Industri 4.0",
      3: "Orang dan budaya sudah siap bertransformasi ke Industri 4.0",
      4: "Orang dan budaya sudah menerapkan Industri 4.0",
    },
    product_service: {
      0: "Produk dan layanan belum mendukung transformasi ke Industri 4.0",
      1: "Produk dan layanan sudah memiliki rencana transformasi ke Industri 4.0",
      2: "Produk dan layanan sudah mulai bertransformasi ke Industri 4.0",
      3: "Produk dan layanan sudah bertransformasi ke Industri 4.0",
      4: "Produk dan layanan sudah sebagian besar menerapkan Industri 4.0",
    },
    technology: {
      0: "Teknologi di perusahaan belum mengarah ke Industri 4.0",
      1: "Teknologi di perusahaan sudah ada rencana ditransformasi ke Industri 4.0",
      2: "Teknologi di perusahaan sudah mulai ditransformasi ke Industri 4.0",
      3: "Teknologi di perusahaan sudah bertransformasi ke Industri 4.0",
      4: "Teknologi di perusahaan sudah sebagian besar menerapkan Industri 4.0",
    },
    factory_operation: {
      0: "Operasi pabrik belum mengenal Industri 4.0",
      1: "Operasi pabrik sudah memiliki rencana transformasi ke Industri 4.0",
      2: "Operasi pabrik sudah mulai bertransformasi ke Industri 4.0",
      3: "Sebagian operasi pabrik sudah bertransformasi ke Industri 4.0",
      4: "Operasi pabrik sudah sebagian besar menerapkan Industri 4.0",
    },
  };

  return interpretations[pillarId]?.[level] || getLevelInterpretation(level);
}

/**
 * Calculate complete assessment results
 */
export function calculateAssessmentResults(
  responses: AssessmentResponse,
  sections: Array<{
    id: string;
    title: string;
    weight: number;
    questions: Question[];
  }>
): AssessmentResults {
  const pillarScores: Record<string, number> = {};
  const pillarDetails: Record<string, PillarDetail> = {};

  // Calculate score for each pillar (skip company_info with weight 0)
  sections.forEach((section) => {
    if (section.weight > 0) {
      const score = calculatePillarScore(responses, section.questions);
      const level = getLevel(score);

      pillarScores[section.id] = score;
      pillarDetails[section.id] = {
        title: section.title,
        score: score,
        level: level,
        weight: section.weight,
      };
    }
  });

  // Calculate weighted total score
  // Formula: (Management × 0.25) + (People × 0.30) + (Product × 0.15) + (Tech × 0.15) + (Operation × 0.15)
  const weightedSum = Object.keys(pillarScores).reduce((sum, key) => {
    const section = sections.find((s) => s.id === key);
    if (!section) return sum;
    return sum + pillarScores[key] * section.weight;
  }, 0);

  const totalScore = weightedSum;
  const overallLevel = getLevel(totalScore);

  return {
    pillarScores,
    pillarDetails,
    totalScore,
    overallLevel,
    timestamp: new Date().toISOString(),
    companyInfo: {
      name: (responses["1.1"] as string) || "N/A",
      sector: (responses["1.3"] as string) || "N/A",
      employees: (responses["1.4"] as string) || "N/A",
    },
  };
}

/**
 * Validate assessment responses
 */
export function validateResponses(
  responses: AssessmentResponse,
  questions: Question[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields: string[] = [];

  questions.forEach((question) => {
    if (question.required) {
      const response = responses[question.id];
      if (
        !response ||
        response === "" ||
        (Array.isArray(response) && response.length === 0)
      ) {
        missingFields.push(question.id);
      }
    }
  });

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
}

/**
 * Format score for display
 */
export function formatScore(score: number): string {
  return score.toFixed(2);
}

/**
 * Get color for level (for UI)
 */
export function getLevelColor(level: number): string {
  const colors: Record<number, string> = {
    0: "#ef4444", // red-500
    1: "#f97316", // orange-500
    2: "#eab308", // yellow-500
    3: "#22c55e", // green-500
    4: "#3b82f6", // blue-500
  };
  return colors[level] || "#6b7280"; // gray-500 default
}

/**
 * Get percentage from score
 */
export function getScorePercentage(score: number): number {
  return (score / 4) * 100;
}
