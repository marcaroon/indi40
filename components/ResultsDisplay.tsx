"use client";

import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Download, FileText, BarChart3 } from "lucide-react";
import type { AssessmentResults, RadarChartData } from "@/lib/types";
import {
  getLevelDescription,
  getLevelInterpretation,
} from "@/lib/calculations";

interface ResultsDisplayProps {
  results: AssessmentResults;
  onNewAssessment: () => void;
  onExportPDF: () => void;
}

export default function ResultsDisplay({
  results,
  onNewAssessment,
  onExportPDF,
}: ResultsDisplayProps) {
  // Prepare radar chart data
  const radarData: RadarChartData[] = [
    {
      subject: "Manajemen",
      A: results.pillarDetails["management"]?.score || 0,
      fullMark: 4,
    },
    {
      subject: "Orang & Budaya",
      A: results.pillarDetails["people_culture"]?.score || 0,
      fullMark: 4,
    },
    {
      subject: "Produk",
      A: results.pillarDetails["product_service"]?.score || 0,
      fullMark: 4,
    },
    {
      subject: "Teknologi",
      A: results.pillarDetails["technology"]?.score || 0,
      fullMark: 4,
    },
    {
      subject: "Operasi",
      A: results.pillarDetails["factory_operation"]?.score || 0,
      fullMark: 4,
    },
  ];

  const getLevelColor = (level: number): string => {
    const colors: Record<number, string> = {
      0: "bg-red-500",
      1: "bg-orange-500",
      2: "bg-yellow-500",
      3: "bg-green-500",
      4: "bg-blue-500",
    };
    return colors[level] || "bg-gray-500";
  };

  return (
    <div
      id="results-content"
      className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 print:shadow-none">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Hasil Asesmen INDI 4.0
            </h1>
            <p className="text-gray-600">
              Indonesia Industry 4.0 Readiness Index
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {new Date(results.timestamp).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Score Summary Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Total Score Card */}
            <div className="bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Skor Total</h3>
                <BarChart3 className="w-6 h-6 opacity-80" />
              </div>
              <div className="text-5xl font-bold mb-2">
                {results.totalScore.toFixed(2)}
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`${getLevelColor(
                    results.overallLevel
                  )} w-3 h-3 rounded-full`}
                />
                <div className="text-xl opacity-90">
                  Level {results.overallLevel}:{" "}
                  {getLevelDescription(results.overallLevel)}
                </div>
              </div>
            </div>

            {/* Company Info Card */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Informasi Perusahaan
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Nama:</span>
                  <span className="text-gray-800">
                    {results.companyInfo.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Sektor:</span>
                  <span className="text-gray-800">
                    {results.companyInfo.sector}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Karyawan:</span>
                  <span className="text-gray-800">
                    {results.companyInfo.employees}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="mb-8 bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Visualisasi Kesiapan per Pilar
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#374151", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 4]}
                  tick={{ fill: "#6b7280", fontSize: 10 }}
                />
                <Radar
                  name="Skor INDI 4.0"
                  dataKey="A"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Pillar Details */}
          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Detail Skor per Pilar
            </h3>
            {Object.entries(results.pillarDetails).map(([key, detail]) => (
              <div
                key={key}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-800">
                    {detail.title}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div
                      className={`${getLevelColor(
                        detail.level
                      )} w-3 h-3 rounded-full`}
                    />
                    <span className="text-sm text-gray-600">
                      Bobot: {(detail.weight * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-linear-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(detail.score / 4) * 100}%` }}
                    />
                  </div>
                  <div className="text-right min-w-30">
                    <div className="text-2xl font-bold text-gray-800">
                      {detail.score.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-600">
                      Level {detail.level}: {getLevelDescription(detail.level)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interpretation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              Interpretasi Hasil
            </h3>
            <p className="text-blue-800 text-sm leading-relaxed">
              {getLevelInterpretation(results.overallLevel)}
            </p>

            {/* Recommendations based on level */}
            {results.overallLevel < 3 && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <p className="font-semibold text-blue-900 mb-2">Rekomendasi:</p>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  {results.overallLevel === 0 && (
                    <>
                      <li>
                        Mulai dengan sosialisasi konsep Industri 4.0 ke seluruh
                        jajaran manajemen
                      </li>
                      <li>
                        Lakukan assessment mendalam terhadap infrastruktur
                        teknologi saat ini
                      </li>
                      <li>Bentuk tim khusus untuk transformasi digital</li>
                    </>
                  )}
                  {results.overallLevel === 1 && (
                    <>
                      <li>
                        Buat roadmap implementasi Industri 4.0 yang terukur
                      </li>
                      <li>Alokasikan budget untuk investasi teknologi</li>
                      <li>Mulai pilot project di departemen tertentu</li>
                    </>
                  )}
                  {results.overallLevel === 2 && (
                    <>
                      <li>Perluas implementasi ke departemen lainnya</li>
                      <li>
                        Tingkatkan kompetensi SDM melalui training intensif
                      </li>
                      <li>Integrasikan sistem yang sudah ada</li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center print:hidden">
            <button
              onClick={onExportPDF}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              Cetak / Export PDF
            </button>
            <button
              onClick={onNewAssessment}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <FileText className="w-5 h-5" />
              Asesmen Baru
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600 print:hidden">
          <p>© 2026 INDI 4.0 - Total Quality Indonesia</p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:shadow-none {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
