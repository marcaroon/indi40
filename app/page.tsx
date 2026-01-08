'use client';

import React, { useState } from 'react';
import AssessmentForm from '@/components/AssessmentForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import type { AssessmentResponse, AssessmentResults } from '@/lib/types';

export default function HomePage() {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (responses: AssessmentResponse) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses }),
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.results);
        setShowResults(true);
      } else {
        alert('Gagal menyimpan assessment: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Terjadi kesalahan saat menyimpan assessment. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewAssessment = () => {
    setShowResults(false);
    setResults(null);
    window.scrollTo(0, 0);
  };

  const handleExportPDF = () => {
    window.print();
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

  if (showResults && results) {
    return (
      <ResultsDisplay
        results={results}
        onNewAssessment={handleNewAssessment}
        onExportPDF={handleExportPDF}
      />
    );
  }

  return <AssessmentForm onSubmit={handleSubmit} />;
}