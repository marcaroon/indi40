"use client";

import React, { useState } from "react";
import AssessmentForm from "@/components/AssessmentForm";
import type { AssessmentResponse } from "@/lib/types";
import { ArrowRight } from "lucide-react";

export default function AssessmentPage() {
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  const handleSubmit = async (responses: AssessmentResponse) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });
      const data = await response.json();
      if (data.success) {
        setAssessmentId(data.assessmentId);
        setShowThankYou(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  // ── Loading ──────────────────────────────────────────────────────────────
  if (isSubmitting) {
    return (
      <div className="ap-root">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          .ap-root {
            font-family: 'DM Sans', sans-serif;
            background: #f8f7f4;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .ap-loading {
            text-align: center;
          }
          .ap-spinner {
            width: 40px;
            height: 40px;
            border: 2px solid #e5e2dc;
            border-top-color: #2563eb;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 24px;
          }
          @keyframes spin { to { transform: rotate(360deg); } }
          .ap-loading-label {
            font-size: 0.75rem;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #2563eb;
            margin-bottom: 8px;
          }
          .ap-loading-title {
            font-family: 'DM Serif Display', serif;
            font-size: 1.6rem;
            color: #1a1a1a;
            letter-spacing: -0.02em;
          }
        `}</style>
        <div className="ap-loading">
          <div className="ap-spinner" />
          <p className="ap-loading-label">Memproses</p>
          <p className="ap-loading-title">Menyimpan assessment Anda...</p>
        </div>
      </div>
    );
  }

  // ── Thank You ────────────────────────────────────────────────────────────
  if (showThankYou) {
    return (
      <div className="ty-root">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          .ty-root {
            font-family: 'DM Sans', sans-serif;
            color: #1a1a1a;
            background: #f8f7f4;
            min-height: 100vh;
            line-height: 1.6;
          }

          /* NAV */
          .ty-nav {
            padding: 20px 48px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e5e2dc;
          }
          .ty-nav-logo {
            font-family: 'DM Serif Display', serif;
            font-size: 1.25rem;
            letter-spacing: -0.01em;
            color: #1a1a1a;
            text-decoration: none;
          }
          .ty-nav-logo span { color: #2563eb; }

          /* HERO */
          .ty-hero {
            max-width: 760px;
            margin: 0 auto;
            padding: 80px 48px 64px;
          }
          .ty-label {
            font-size: 0.75rem;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #2563eb;
            margin-bottom: 20px;
          }
          .ty-title {
            font-family: 'DM Serif Display', serif;
            font-size: clamp(2.4rem, 5vw, 4rem);
            line-height: 1.05;
            letter-spacing: -0.02em;
            color: #1a1a1a;
            margin-bottom: 16px;
          }
          .ty-title em {
            font-style: italic;
            color: #2563eb;
          }
          .ty-desc {
            font-size: 1.05rem;
            color: #666;
            font-weight: 300;
            line-height: 1.75;
            max-width: 560px;
          }

          /* DIVIDER */
          .ty-divider {
            height: 1px;
            background: #e5e2dc;
            max-width: 760px;
            margin: 0 auto;
          }

          /* ID BLOCK */
          .ty-id-section {
            max-width: 760px;
            margin: 0 auto;
            padding: 56px 48px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 48px;
            align-items: start;
          }
          .ty-id-label {
            font-size: 0.75rem;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #888;
            margin-bottom: 12px;
          }
          .ty-id-number {
            font-family: 'DM Serif Display', serif;
            font-size: 3.5rem;
            color: #2563eb;
            letter-spacing: -0.04em;
            line-height: 1;
            margin-bottom: 8px;
          }
          .ty-id-note {
            font-size: 0.82rem;
            color: #aaa;
            font-weight: 300;
          }

          /* NEXT STEPS */
          .ty-steps {
            display: flex;
            flex-direction: column;
            gap: 0;
          }
          .ty-step-item {
            display: flex;
            gap: 16px;
            padding: 16px 0;
            border-top: 1px solid #e5e2dc;
          }
          .ty-step-item:last-child { border-bottom: 1px solid #e5e2dc; }
          .ty-step-idx {
            font-family: 'DM Serif Display', serif;
            font-size: 1rem;
            color: #e5e2dc;
            min-width: 20px;
            line-height: 1.6;
          }
          .ty-step-text {
            font-size: 0.88rem;
            color: #666;
            font-weight: 300;
            line-height: 1.65;
          }

          /* CTA */
          .ty-cta-section {
            background: #1a1a1a;
            padding: 64px 48px;
            text-align: center;
          }
          .ty-cta-inner { max-width: 560px; margin: 0 auto; }
          .ty-cta-label {
            font-size: 0.75rem;
            font-weight: 500;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            color: #6b9cf7;
            margin-bottom: 16px;
          }
          .ty-cta-title {
            font-family: 'DM Serif Display', serif;
            font-size: clamp(1.6rem, 3vw, 2.4rem);
            color: #f8f7f4;
            letter-spacing: -0.02em;
            line-height: 1.15;
            margin-bottom: 16px;
          }
          .ty-cta-desc {
            font-size: 0.95rem;
            color: #777;
            font-weight: 300;
            line-height: 1.7;
            margin-bottom: 36px;
          }
          .ty-btn-home {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #2563eb;
            color: #fff;
            font-size: 0.95rem;
            font-weight: 500;
            padding: 14px 32px;
            border-radius: 4px;
            border: none;
            cursor: pointer;
            transition: background 0.2s, transform 0.15s;
            font-family: 'DM Sans', sans-serif;
            text-decoration: none;
          }
          .ty-btn-home:hover { background: #1d4ed8; transform: translateY(-1px); }

          /* FOOTER */
          .ty-footer {
            padding: 32px 48px;
            border-top: 1px solid #e5e2dc;
            display: flex;
            align-items: center;
            justify-content: space-between;
            max-width: 760px;
            margin: 0 auto;
          }
          .ty-footer-logo {
            font-family: 'DM Serif Display', serif;
            font-size: 1rem;
            color: #1a1a1a;
          }
          .ty-footer-logo span { color: #2563eb; }
          .ty-footer-text {
            font-size: 0.78rem;
            color: #aaa;
            font-weight: 300;
          }

          @media (max-width: 700px) {
            .ty-nav { padding: 16px 20px; }
            .ty-hero { padding: 48px 20px 40px; }
            .ty-id-section { grid-template-columns: 1fr; gap: 32px; padding: 40px 20px; }
            .ty-divider { margin: 0 20px; }
            .ty-cta-section { padding: 48px 20px; }
            .ty-footer { flex-direction: column; gap: 10px; text-align: center; padding: 24px 20px; }
          }
        `}</style>

        {/* NAV */}
        <nav className="ty-nav">
          <a href="/" className="ty-nav-logo">INDI <span>4.0</span></a>
        </nav>

        {/* HERO */}
        <section className="ty-hero">
          <p className="ty-label">Assessment Selesai</p>
          <h1 className="ty-title">
            Terima kasih,<br /><em>assessment tercatat.</em>
          </h1>
          <p className="ty-desc">
            Data penilaian Anda telah berhasil tersimpan. Tim kami akan menindaklanjuti hasil assessment ini.
          </p>
        </section>

        <div className="ty-divider" />

        {/* ID + Next Steps */}
        <section className="ty-id-section">
          <div>
            <p className="ty-id-label">Nomor Assessment</p>
            <p className="ty-id-number">
              #{assessmentId?.toString().padStart(5, "0")}
            </p>
            <p className="ty-id-note">Simpan nomor ini untuk keperluan tindak lanjut</p>
          </div>

          <div>
            <p className="ty-id-label" style={{ marginBottom: 0 }}>Langkah Selanjutnya</p>
            <div className="ty-steps">
              {[
                "Data assessment Anda tersimpan dengan aman di sistem kami",
                "Tim ahli akan meninjau hasil dan menyusun rekomendasi",
                "Hasil lengkap akan dikirimkan ke email yang Anda daftarkan",
                "Hubungi kami dengan menyebut nomor assessment di atas",
              ].map((text, i) => (
                <div key={i} className="ty-step-item">
                  <span className="ty-step-idx">0{i + 1}</span>
                  <p className="ty-step-text">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="ty-cta-section">
          <div className="ty-cta-inner">
            <p className="ty-cta-label">Selesai</p>
            <h2 className="ty-cta-title">Kembali ke beranda</h2>
            <p className="ty-cta-desc">
              Jelajahi lebih lanjut tentang framework INDI 4.0 dan program transformasi industri nasional.
            </p>
            <a href="/" className="ty-btn-home">
              Kembali ke Beranda <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="ty-footer">
          <div className="ty-footer-logo">INDI <span>4.0</span></div>
          <p className="ty-footer-text">© 2026 Kementerian Perindustrian Republik Indonesia</p>
        </footer>
      </div>
    );
  }

  // ── Main Assessment Form ─────────────────────────────────────────────────
  return <AssessmentForm onSubmit={handleSubmit} />;
}