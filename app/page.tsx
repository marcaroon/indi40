"use client";

import React, { useState } from "react";
import AssessmentForm from "@/components/AssessmentForm";
import type { AssessmentResponse } from "@/lib/types";
import { CheckCircle, Home } from "lucide-react";

export default function HomePage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  const handleSubmit = async (responses: AssessmentResponse) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ responses }),
      });

      const data = await response.json();

      if (data.success) {
        setAssessmentId(data.assessmentId);
        setShowThankYou(true);
      } else {
        alert("Gagal menyimpan assessment: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Terjadi kesalahan saat menyimpan assessment. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewAssessment = () => {
    setShowThankYou(false);
    setAssessmentId(null);
    window.scrollTo(0, 0);
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-xl text-gray-700">Memproses assessment...</p>
        </div>
      </div>
    );
  }

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
              <CheckCircle className="w-16 h-16 text-green-600" />
            </div>
          </div>

          {/* Thank You Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Terima Kasih!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Assessment INDI 4.0 Anda telah berhasil dikirim dan tersimpan dengan
            baik.
          </p>

          {/* Assessment ID */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Nomor Assessment Anda:</p>
            <p className="text-3xl font-bold text-blue-600">
              #{assessmentId?.toString().padStart(5, "0")}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Simpan nomor ini untuk referensi Anda
            </p>
          </div>

          {/* Information */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-800 mb-3">
              Apa yang terjadi selanjutnya?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  Data assessment Anda telah tersimpan dalam database kami
                  dengan aman
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>Tim kami akan meninjau hasil assessment Anda</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  Hasil lengkap dan rekomendasi akan dikirimkan melalui email
                  yang Anda daftarkan
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span>
                  Jika ada pertanyaan, Anda dapat menghubungi kami dengan
                  menyebutkan nomor assessment di atas
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleNewAssessment}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
            >
              <Home className="w-5 h-5" />
              Kembali ke Beranda
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              © 2026 INDI 4.0 Assessment Platform - Total Quality Indonesia
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <AssessmentForm onSubmit={handleSubmit} />;
}
