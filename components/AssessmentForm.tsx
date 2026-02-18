"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import type { AssessmentResponse, Question } from "@/lib/types";
import { sections } from "@/lib/questions";

interface AssessmentFormProps {
  onSubmit: (responses: AssessmentResponse) => void;
}

export default function AssessmentForm({ onSubmit }: AssessmentFormProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse>({});

  // Flatten all questions
  const allQuestions = sections.flatMap((section) =>
    section.questions.map((q) => ({
      ...q,
      sectionId: section.id,
      sectionTitle: section.title,
    }))
  );

  const totalQuestions = allQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const currentQ = allQuestions[currentQuestion];

  /**
   * LOGIC MUTUALLY EXCLUSIVE OPTIONS
   * Jika user pilih opsi eksklusif (Tidak ada, Belum ada, dll), maka:
   * - Unselect semua opsi lain
   * Jika user pilih opsi lain:
   * - Unselect opsi eksklusif
   */
  const handleMultipleChoice = (
    questionId: string,
    value: string,
    isExclusive?: boolean
  ) => {
    const currentResponse = (responses[questionId] as string[]) || [];
    const isSelected = currentResponse.includes(value);

    let newResponse: string[];

    if (isSelected) {
      // Unselect the option
      newResponse = currentResponse.filter((v) => v !== value);
    } else {
      // Select the option
      if (isExclusive) {
        // Jika pilih opsi eksklusif, hapus semua pilihan lain
        newResponse = [value];
      } else {
        // Jika pilih opsi non-eksklusif, hapus opsi eksklusif (jika ada)
        const exclusiveOptions =
          currentQ.options
            ?.filter((opt) => opt.isExclusive)
            .map((opt) => opt.value) || [];
        const filteredResponse = currentResponse.filter(
          (v) => !exclusiveOptions.includes(v)
        );
        newResponse = [...filteredResponse, value];
      }
    }

    setResponses((prev) => ({
      ...prev,
      [questionId]: newResponse,
    }));
  };

  const handleSingleChoice = (questionId: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleTextInput = (questionId: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Validate required fields
    const missingFields = allQuestions
      .filter((q) => q.required)
      .filter((q) => {
        const response = responses[q.id];
        return (
          !response ||
          response === "" ||
          (Array.isArray(response) && response.length === 0)
        );
      });

    if (missingFields.length > 0) {
      alert(
        `Harap lengkapi semua pertanyaan wajib. ${missingFields.length} pertanyaan belum dijawab.`
      );
      return;
    }

    onSubmit(responses);
  };

  const isAnswered = (questionId: string): boolean => {
    const response = responses[questionId];
    return (
      response !== undefined &&
      response !== "" &&
      (!Array.isArray(response) || response.length > 0)
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-700 p-6 md:p-8 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              INDI 4.0 Assessment Form
            </h1>
            <p className="text-blue-100 text-sm md:text-base">
              Indonesia Industry 4.0 Readiness Index
            </p>
            <div className="mt-4">
              <div className="flex justify-between text-md font-medium">
                <span>
                  Pertanyaan {currentQuestion + 1} dari {totalQuestions}
                </span>
                {/* <span>{progress.toFixed(0)}%</span> */}
              </div>
              {/* <div className="w-full bg-blue-400 bg-opacity-30 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div> */}
            </div>
          </div>

          {/* Question Content */}
          <div className="p-6 md:p-8">
            <div className="mb-6">
              <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                {currentQ.sectionTitle}
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                {currentQ.text}
                {currentQ.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </h2>
              {currentQ.type === "multiple" && (
                <p className="text-sm text-gray-600 italic">
                  Anda dapat memilih lebih dari satu jawaban
                </p>
              )}
            </div>

            <div className="space-y-3">
              {/* TEXT INPUT */}
              {currentQ.type === "text" && (
                <input
                  type="text"
                  value={(responses[currentQ.id] as string) || ""}
                  onChange={(e) => handleTextInput(currentQ.id, e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={currentQ.placeholder || "Masukkan jawaban Anda"}
                />
              )}

              {/* TEXTAREA INPUT */}
              {currentQ.type === "textarea" && (
                <textarea
                  value={(responses[currentQ.id] as string) || ""}
                  onChange={(e) => handleTextInput(currentQ.id, e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder={currentQ.placeholder || "Masukkan jawaban Anda"}
                />
              )}

              {/* SINGLE CHOICE */}
              {currentQ.type === "single" &&
                currentQ.options?.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      responses[currentQ.id] === option.value
                        ? "border-blue-500 bg-blue-50 shadow-md"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={currentQ.id}
                      value={option.value}
                      checked={responses[currentQ.id] === option.value}
                      onChange={(e) =>
                        handleSingleChoice(currentQ.id, e.target.value)
                      }
                      className="mt-1 mr-3 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    />
                    <span className="text-gray-700 flex-1">{option.label}</span>
                  </label>
                ))}

              {/* MULTIPLE CHOICE - WITH MUTUALLY EXCLUSIVE LOGIC */}
              {currentQ.type === "multiple" &&
                currentQ.options?.map((option) => {
                  const currentResponses =
                    (responses[currentQ.id] as string[]) || [];
                  const isChecked = currentResponses.includes(option.value);

                  return (
                    <label
                      key={option.value}
                      className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        isChecked
                          ? "border-blue-500 bg-blue-50 shadow-md"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      } ${
                        option.isExclusive
                          ? "border-orange-300 bg-orange-50/30"
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={isChecked}
                        onChange={() =>
                          handleMultipleChoice(
                            currentQ.id,
                            option.value,
                            option.isExclusive
                          )
                        }
                        className="mt-1 mr-3 text-blue-600 focus:ring-blue-500 rounded w-4 h-4"
                      />
                      <div className="flex-1">
                        <span className="text-gray-700">{option.label}</span>
                        {option.isExclusive && (
                          <span className="block text-xs text-orange-600 mt-1">
                            (Jika dipilih, opsi lain akan otomatis tidak
                            terpilih)
                          </span>
                        )}
                      </div>
                    </label>
                  );
                })}
            </div>

            {/* Answer Status Indicator */}
            {isAnswered(currentQ.id) && (
              <div className="mt-4 flex items-center text-green-600 text-sm">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Pertanyaan sudah dijawab
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                Sebelumnya
              </button>

              {currentQuestion < totalQuestions - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  Selanjutnya
                  <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  <FileText className="w-5 h-5" />
                  Selesai & Lihat Hasil
                </button>
              )}
            </div>
          </div>

          {/* Mini Progress Dots */}
          <div className="px-6 pb-6 flex justify-center gap-1 overflow-x-auto">
            {allQuestions.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-2 rounded-full transition-all ${
                  idx === currentQuestion
                    ? "bg-blue-600 w-8"
                    : isAnswered(allQuestions[idx].id)
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
