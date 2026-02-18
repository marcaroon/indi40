"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
    })),
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
    isExclusive?: boolean,
  ) => {
    const currentResponse = (responses[questionId] as string[]) || [];
    const isSelected = currentResponse.includes(value);

    let newResponse: string[];

    if (isSelected) {
      newResponse = currentResponse.filter((v) => v !== value);
    } else {
      if (isExclusive) {
        newResponse = [value];
      } else {
        const exclusiveOptions =
          currentQ.options
            ?.filter((opt) => opt.isExclusive)
            .map((opt) => opt.value) || [];
        const filteredResponse = currentResponse.filter(
          (v) => !exclusiveOptions.includes(v),
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = () => {
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
        `Harap lengkapi semua pertanyaan wajib. ${missingFields.length} pertanyaan belum dijawab.`,
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
    <div className="af-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .af-root {
          font-family: 'DM Sans', sans-serif;
          color: #1a1a1a;
          background: #f8f7f4;
          min-height: 100vh;
          line-height: 1.6;
          display: flex;
          flex-direction: column;
        }

        /* ── NAV ── */
        .af-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 18px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(248,247,244,0.96);
          box-shadow: 0 1px 0 rgba(0,0,0,0.08);
          backdrop-filter: blur(8px);
        }
        .af-nav-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          letter-spacing: -0.01em;
          color: #1a1a1a;
          text-decoration: none;
        }
        .af-nav-logo span { color: #2563eb; }
        .af-nav-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .af-nav-counter {
          font-size: 0.78rem;
          color: #aaa;
          font-weight: 300;
          letter-spacing: 0.04em;
        }
        .af-nav-counter strong {
          color: #1a1a1a;
          font-weight: 500;
        }
        .af-nav-back {
          font-size: 0.82rem;
          color: #888;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .af-nav-back:hover { color: #1a1a1a; }

        /* ── PROGRESS BAR ── */
        .af-progress-wrap {
          position: fixed;
          top: 61px; left: 0; right: 0;
          z-index: 99;
          height: 2px;
          background: #e5e2dc;
        }
        .af-progress-fill {
          height: 100%;
          background: #2563eb;
          transition: width 0.35s ease;
        }

        /* ── MAIN ── */
        .af-main {
          flex: 1;
          width: 100%;
          max-width: 720px;
          margin: 0 auto;
          padding: 108px 48px 96px;
        }

        /* ── SECTION BADGE ── */
        .af-section-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 20px;
        }

        /* ── QUESTION ── */
        .af-question-text {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.4rem, 2.8vw, 2rem);
          letter-spacing: -0.02em;
          line-height: 1.25;
          color: #1a1a1a;
          margin-bottom: 8px;
        }
        .af-required { color: #2563eb; }
        .af-multiple-hint {
          font-size: 0.82rem;
          color: #aaa;
          font-weight: 300;
          margin-top: 4px;
          margin-bottom: 0;
        }
        .af-divider {
          height: 1px;
          background: #e5e2dc;
          margin: 28px 0 32px;
        }

        /* ── TEXT INPUT ── */
        .af-input, .af-textarea {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: #1a1a1a;
          background: #fff;
          border: 1px solid #e5e2dc;
          border-radius: 4px;
          padding: 14px 18px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }
        .af-input:focus, .af-textarea:focus { border-color: #2563eb; }
        .af-textarea { resize: vertical; min-height: 120px; }

        /* ── OPTIONS ── */
        .af-options { display: flex; flex-direction: column; gap: 8px; }

        .af-option-label {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 18px;
          border: 1px solid #e5e2dc;
          border-radius: 4px;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          background: #fff;
        }
        .af-option-label:hover {
          border-color: #aac4fb;
          background: #f5f8ff;
        }
        .af-option-label.selected {
          border-color: #2563eb;
          background: #eff5ff;
        }
        .af-option-label.exclusive {
          border-color: #f5e6d0;
          background: #fffbf5;
        }
        .af-option-label.exclusive.selected {
          border-color: #d97706;
          background: #fffbeb;
        }

        .af-option-input {
          margin-top: 2px;
          flex-shrink: 0;
          accent-color: #2563eb;
          width: 16px;
          height: 16px;
          cursor: pointer;
        }
        .af-option-text { flex: 1; font-size: 0.92rem; color: #333; line-height: 1.55; }
        .af-exclusive-note {
          display: block;
          font-size: 0.75rem;
          color: #d97706;
          font-weight: 300;
          margin-top: 3px;
        }

        /* ── ANSWERED INDICATOR ── */
        .af-answered {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 20px;
          font-size: 0.8rem;
          color: #16a34a;
          font-weight: 400;
        }
        .af-answered-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #16a34a;
          flex-shrink: 0;
        }

        /* ── NAV BUTTONS ── */
        .af-nav-buttons {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 56px;
          padding-top: 28px;
          border-top: 1px solid #e5e2dc;
        }
        .af-btn-prev {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          color: #aaa;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.2s;
        }
        .af-btn-prev:hover:not(:disabled) { color: #1a1a1a; }
        .af-btn-prev:disabled { opacity: 0.3; cursor: not-allowed; }

        .af-btn-next {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1a1a1a;
          color: #f8f7f4;
          font-size: 0.92rem;
          font-weight: 500;
          padding: 13px 28px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .af-btn-next:hover:not(:disabled) { background: #4F4F4F; transform: translateY(-1px); }
        .af-btn-next:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
        .af-btn-submit { background: #2563eb; }
        .af-btn-submit:hover:not(:disabled) { background: #1d4ed8; }

        /* ── PROGRESS DOTS ── */
        .af-dots-wrap {
          display: flex;
          justify-content: center;
          gap: 4px;
          padding: 20px 48px 40px;
          flex-wrap: wrap;
          max-width: 720px;
          margin: 0 auto;
        }
        .af-dot {
          height: 5px;
          width: 5px;
          border-radius: 99px;
          background: #e5e2dc;
          transition: width 0.2s, background 0.2s;
          flex-shrink: 0;
        }
        .af-dot.current { width: 16px; background: #2563eb; }
        .af-dot.answered { background: #86efac; }

        /* ── FOOTER ── */
        .af-footer {
          border-top: 1px solid #e5e2dc;
          padding: 28px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 720px;
          margin: 0 auto;
        }
        .af-footer-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 0.95rem;
          color: #1a1a1a;
        }
        .af-footer-logo span { color: #2563eb; }
        .af-footer-text { font-size: 0.75rem; color: #bbb; font-weight: 300; }

        @media (max-width: 700px) {
          .af-nav { padding: 16px 20px; }
          .af-nav-back { display: none; }
          .af-main { padding: 96px 20px 64px; }
          .af-dots-wrap { padding: 16px 20px 32px; }
          .af-footer { flex-direction: column; gap: 8px; text-align: center; padding: 20px; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="af-nav">
        <a href="/" className="af-nav-logo">
          INDI <span>4.0</span>
        </a>
        <div className="af-nav-right">
          <span className="af-nav-counter">
            <strong>{currentQuestion + 1}</strong> / {totalQuestions}
          </span>
          <button
            className="af-nav-back"
            onClick={() => (window.location.href = "/")}
          >
            ← Beranda
          </button>
        </div>
      </nav>

      {/* ── PROGRESS BAR ── */}
      <div className="af-progress-wrap">
        <div className="af-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {/* ── MAIN ── */}
      <main className="af-main">
        <span className="af-section-badge">{currentQ.sectionTitle}</span>

        <h2 className="af-question-text">
          {currentQ.text}
          {currentQ.required && <span className="af-required"> *</span>}
        </h2>

        {currentQ.type === "multiple" && (
          <p className="af-multiple-hint">
            Anda dapat memilih lebih dari satu jawaban
          </p>
        )}

        <div className="af-divider" />

        {/* ── TEXT ── */}
        {currentQ.type === "text" && (
          <input
            type="text"
            className="af-input"
            value={(responses[currentQ.id] as string) || ""}
            onChange={(e) => handleTextInput(currentQ.id, e.target.value)}
            placeholder={currentQ.placeholder || "Masukkan jawaban Anda"}
          />
        )}

        {/* ── TEXTAREA ── */}
        {currentQ.type === "textarea" && (
          <textarea
            className="af-textarea"
            value={(responses[currentQ.id] as string) || ""}
            onChange={(e) => handleTextInput(currentQ.id, e.target.value)}
            placeholder={currentQ.placeholder || "Masukkan jawaban Anda"}
            rows={4}
          />
        )}

        {/* ── SINGLE CHOICE ── */}
        {currentQ.type === "single" && (
          <div className="af-options">
            {currentQ.options?.map((option) => (
              <label
                key={option.value}
                className={`af-option-label${responses[currentQ.id] === option.value ? " selected" : ""}`}
              >
                <input
                  type="radio"
                  name={currentQ.id}
                  value={option.value}
                  checked={responses[currentQ.id] === option.value}
                  onChange={(e) =>
                    handleSingleChoice(currentQ.id, e.target.value)
                  }
                  className="af-option-input"
                />
                <span className="af-option-text">{option.label}</span>
              </label>
            ))}
          </div>
        )}

        {/* ── MULTIPLE CHOICE ── */}
        {currentQ.type === "multiple" && (
          <div className="af-options">
            {currentQ.options?.map((option) => {
              const currentResponses =
                (responses[currentQ.id] as string[]) || [];
              const isChecked = currentResponses.includes(option.value);
              return (
                <label
                  key={option.value}
                  className={`af-option-label${option.isExclusive ? " exclusive" : ""}${isChecked ? " selected" : ""}`}
                >
                  <input
                    type="checkbox"
                    value={option.value}
                    checked={isChecked}
                    onChange={() =>
                      handleMultipleChoice(
                        currentQ.id,
                        option.value,
                        option.isExclusive,
                      )
                    }
                    className="af-option-input"
                  />
                  <div className="af-option-text">
                    {option.label}
                    {option.isExclusive && (
                      <span className="af-exclusive-note">
                        Jika dipilih, opsi lain akan otomatis tidak terpilih
                      </span>
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        )}

        {/* ── ANSWERED INDICATOR ── */}
        {isAnswered(currentQ.id) && (
          <div className="af-answered">
            <div className="af-answered-dot" />
            Pertanyaan sudah dijawab
          </div>
        )}

        {/* ── NAV BUTTONS ── */}
        <div className="af-nav-buttons">
          <button
            className="af-btn-prev"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft size={15} /> Sebelumnya
          </button>

          {currentQuestion < totalQuestions - 1 ? (
            <button
              className="af-btn-next"
              onClick={handleNext}
              disabled={!isAnswered(currentQ.id)}
            >
              Selanjutnya <ArrowRight size={15} />
            </button>
          ) : (
            <button
              className="af-btn-next af-btn-submit"
              onClick={handleSubmit}
              disabled={!isAnswered(currentQ.id)}
            >
              Selesai & Kirim <ArrowRight size={15} />
            </button>
          )}
        </div>
      </main>

      {/* ── PROGRESS DOTS ── */}
      {/* <div className="af-dots-wrap">
        {allQuestions.map((q, idx) => (
          <div
            key={idx}
            className={`af-dot${
              idx === currentQuestion
                ? " current"
                : isAnswered(q.id)
                  ? " answered"
                  : ""
            }`}
          />
        ))}
      </div> */}

      {/* ── FOOTER ── */}
      <footer className="af-footer">
        <div className="af-footer-logo">
          INDI <span>4.0</span>
        </div>
        <p className="af-footer-text">
          © 2026 Kementerian Perindustrian Republik Indonesia
        </p>
      </footer>
    </div>
  );
}
