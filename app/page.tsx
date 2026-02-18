"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="landing-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .landing-root {
          font-family: 'DM Sans', sans-serif;
          color: #1a1a1a;
          background: #f8f7f4;
          min-height: 100vh;
          line-height: 1.6;
        }

        /* NAV */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 20px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.3s, box-shadow 0.3s;
        }
        .nav.scrolled {
          background: rgba(248,247,244,0.96);
          box-shadow: 0 1px 0 rgba(0,0,0,0.08);
          backdrop-filter: blur(8px);
        }
        .nav-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.25rem;
          letter-spacing: -0.01em;
          color: #1a1a1a;
        }
        .nav-logo span { color: #2563eb; }
        .nav-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #1a1a1a;
          color: #f8f7f4;
          font-size: 0.85rem;
          font-weight: 500;
          padding: 10px 22px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.01em;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
        }
        .nav-cta:hover { background: #2563eb; transform: translateY(-1px); }

        /* HERO */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 120px 48px 80px;
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
        }
        .hero-label {
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 28px;
        }
        .hero-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: #1a1a1a;
          max-width: 820px;
          margin-bottom: 28px;
        }
        .hero-title em {
          font-style: italic;
          color: #2563eb;
        }
        .hero-desc {
          font-size: 1.1rem;
          color: #555;
          max-width: 560px;
          margin-bottom: 48px;
          font-weight: 300;
          line-height: 1.7;
        }
        .hero-actions {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #1a1a1a;
          color: #f8f7f4;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 14px 32px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover { background: #2563eb; transform: translateY(-2px); }
        .btn-secondary {
          font-size: 0.9rem;
          color: #555;
          cursor: pointer;
          background: none;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-weight: 400;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 0.2s;
        }
        .btn-secondary:hover { color: #1a1a1a; }
        .hero-scroll {
          position: absolute;
          bottom: 36px;
          left: 48px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          color: #aaa;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }

        /* SECTION SHARED */
        .section {
          padding: 96px 48px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-label {
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #2563eb;
          margin-bottom: 16px;
        }
        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin-bottom: 20px;
          color: #1a1a1a;
        }
        .section-desc {
          font-size: 1rem;
          color: #666;
          max-width: 600px;
          font-weight: 300;
          line-height: 1.75;
        }

        /* DIVIDER */
        .divider {
          height: 1px;
          background: #e5e2dc;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* ABOUT */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
          margin-top: 56px;
        }
        .about-stat-row {
          display: flex;
          flex-direction: column;
          gap: 40px;
          margin-top: 4px;
        }
        .stat-item {}
        .stat-number {
          font-family: 'DM Serif Display', serif;
          font-size: 3rem;
          line-height: 1;
          color: #1a1a1a;
          letter-spacing: -0.03em;
        }
        .stat-label {
          font-size: 0.88rem;
          color: #888;
          margin-top: 6px;
          font-weight: 300;
        }
        .about-text {
          font-size: 1rem;
          color: #555;
          font-weight: 300;
          line-height: 1.8;
        }
        .about-text p + p { margin-top: 20px; }

        /* PILLARS */
        .pillars-wrap {
          background: #1a1a1a;
          padding: 96px 48px;
        }
        .pillars-inner {
          max-width: 1100px;
          margin: 0 auto;
        }
        .pillars-inner .section-label { color: #6b9cf7; }
        .pillars-inner .section-title { color: #f8f7f4; }
        .pillars-inner .section-desc { color: #aaa; }
        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2px;
          margin-top: 56px;
        }
        .pillar-card {
          background: #242424;
          padding: 32px 24px;
          position: relative;
          cursor: default;
          transition: background 0.2s;
        }
        .pillar-card:hover { background: #2c2c2c; }
        .pillar-number {
          font-family: 'DM Serif Display', serif;
          font-size: 2.5rem;
          color: #333;
          line-height: 1;
          margin-bottom: 20px;
          letter-spacing: -0.03em;
        }
        .pillar-name {
          font-size: 0.88rem;
          font-weight: 500;
          color: #f8f7f4;
          letter-spacing: 0.02em;
          margin-bottom: 12px;
        }
        .pillar-desc {
          font-size: 0.8rem;
          color: #777;
          font-weight: 300;
          line-height: 1.65;
        }
        .pillar-weight {
          margin-top: 24px;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #6b9cf7;
          font-weight: 500;
        }

        /* LEVELS */
        .levels-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2px;
          margin-top: 56px;
        }
        .level-card {
          padding: 32px 24px;
          border: 1px solid #e5e2dc;
          position: relative;
        }
        .level-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 2px;
          margin-bottom: 20px;
        }
        .level-0 .level-badge { background: #fee2e2; color: #b91c1c; }
        .level-1 .level-badge { background: #ffedd5; color: #c2410c; }
        .level-2 .level-badge { background: #fef9c3; color: #854d0e; }
        .level-3 .level-badge { background: #dcfce7; color: #15803d; }
        .level-4 .level-badge { background: #dbeafe; color: #1d4ed8; }
        .level-num {
          font-family: 'DM Serif Display', serif;
          font-size: 1.8rem;
          letter-spacing: -0.03em;
          color: #1a1a1a;
          margin-bottom: 8px;
        }
        .level-name {
          font-size: 0.88rem;
          font-weight: 500;
          color: #1a1a1a;
          margin-bottom: 10px;
        }
        .level-desc {
          font-size: 0.8rem;
          color: #888;
          font-weight: 300;
          line-height: 1.6;
        }

        /* SECTORS */
        .sectors-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 2px;
          margin-top: 56px;
        }
        .sector-card {
          padding: 28px 24px;
          border: 1px solid #e5e2dc;
          transition: border-color 0.2s, background 0.2s;
        }
        .sector-card:hover {
          border-color: #2563eb;
          background: #f0f5ff;
        }
        .sector-name {
          font-size: 0.9rem;
          font-weight: 500;
          color: #1a1a1a;
          margin-bottom: 8px;
        }
        .sector-target {
          font-size: 0.78rem;
          color: #888;
          font-weight: 300;
          line-height: 1.55;
        }

        /* PROCESS */
        .process-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          margin-top: 56px;
        }
        .step {
          position: relative;
          padding-left: 0;
        }
        .step-num {
          font-family: 'DM Serif Display', serif;
          font-size: 4rem;
          color: #e5e2dc;
          line-height: 1;
          margin-bottom: 16px;
          letter-spacing: -0.04em;
        }
        .step-title {
          font-size: 1rem;
          font-weight: 500;
          color: #1a1a1a;
          margin-bottom: 10px;
        }
        .step-desc {
          font-size: 0.88rem;
          color: #888;
          font-weight: 300;
          line-height: 1.7;
        }

        /* CTA BOTTOM */
        .cta-bottom {
          background: #2563eb;
          padding: 96px 48px;
          text-align: center;
        }
        .cta-bottom-inner { max-width: 600px; margin: 0 auto; }
        .cta-bottom .section-label { color: #93c5fd; }
        .cta-bottom-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin-bottom: 20px;
        }
        .cta-bottom-desc {
          font-size: 1rem;
          color: #bfdbfe;
          font-weight: 300;
          line-height: 1.7;
          margin-bottom: 40px;
        }
        .btn-white {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          color: #2563eb;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 14px 32px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: transform 0.15s, box-shadow 0.2s;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }

        /* FOOTER */
        .footer {
          padding: 40px 48px;
          border-top: 1px solid #e5e2dc;
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1100px;
          margin: 0 auto;
        }
        .footer-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1rem;
          color: #1a1a1a;
        }
        .footer-logo span { color: #2563eb; }
        .footer-text {
          font-size: 0.78rem;
          color: #aaa;
          font-weight: 300;
        }

        @media (max-width: 900px) {
          .nav { padding: 16px 24px; }
          .hero { padding: 100px 24px 60px; }
          .section { padding: 64px 24px; }
          .pillars-wrap { padding: 64px 24px; }
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
          .pillars-grid { grid-template-columns: 1fr 1fr; }
          .levels-grid { grid-template-columns: 1fr 1fr; }
          .sectors-grid { grid-template-columns: 1fr 1fr; }
          .process-steps { grid-template-columns: 1fr; gap: 32px; }
          .cta-bottom { padding: 64px 24px; }
          .footer { flex-direction: column; gap: 12px; text-align: center; padding: 32px 24px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-logo">
          INDI <span>4.0</span>
        </div>
        <button className="nav-cta" onClick={() => router.push("/assessment")}>
          Mulai Assessment <ArrowRight size={14} />
        </button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <p className="hero-label">
          Kementerian Perindustrian Republik Indonesia
        </p>
        <h1 className="hero-title">
          Seberapa siap industri Anda menuju <em>era baru</em>?
        </h1>
        <p className="hero-desc">
          INDI 4.0 adalah indeks nasional untuk mengukur kesiapan industri
          Indonesia bertransformasi menuju Industri 4.0 — standar resmi yang
          dirancang khusus untuk kondisi industri dalam negeri.
        </p>
        <div className="hero-actions">
          <button
            className="btn-primary"
            onClick={() => router.push("/assessment")}
          >
            Mulai Assessment <ArrowRight size={16} />
          </button>
          <button
            className="btn-secondary"
            onClick={() => {
              document
                .getElementById("tentang")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Pelajari lebih lanjut
          </button>
        </div>
        <div className="hero-scroll">
          <ChevronDown size={14} /> Scroll
        </div>
      </section>

      <div className="divider" />

      {/* ABOUT */}
      <section className="section" id="tentang">
        <p className="section-label">Tentang INDI 4.0</p>
        <div className="about-grid">
          <div>
            <h2 className="section-title">
              Indeks kesiapan industri yang dirancang untuk Indonesia
            </h2>
            <div className="about-text">
              <p>
                Diluncurkan sebagai bagian dari program{" "}
                <strong>Making Indonesia 4.0</strong>, INDI 4.0 hadir sebagai
                alat ukur standar nasional yang membantu industri dan pemerintah
                memahami posisi transformasi digital secara akurat dan terukur.
              </p>
              <p>
                Berbeda dengan indeks internasional lainnya, INDI 4.0
                mempertimbangkan kekhasan industri lokal — termasuk budaya
                kerja, kearifan daerah, dan kondisi infrastruktur yang beragam
                di seluruh Indonesia.
              </p>
              <p>
                Hasil assessment digunakan sebagai dasar penentuan strategi
                implementasi Industri 4.0 di perusahaan, sekaligus menjadi acuan
                bagi pemerintah dalam merancang kebijakan dan insentif yang
                tepat sasaran.
              </p>
            </div>
          </div>
          <div className="about-stat-row">
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Pilar penilaian utama</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">17</div>
              <div className="stat-label">Bidang yang dievaluasi</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Sektor industri prioritas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">0–4</div>
              <div className="stat-label">Skala level kesiapan</div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* PILLARS */}
      <div className="pillars-wrap">
        <div className="pillars-inner">
          <p className="section-label">5 Pilar Penilaian</p>
          <h2 className="section-title">Dimensi yang diukur</h2>
          <p className="section-desc">
            Setiap pilar mencerminkan aspek krusial transformasi industri, dari
            komitmen pemimpin hingga kesiapan teknologi di lantai produksi.
          </p>
          <div className="pillars-grid">
            {[
              {
                num: "01",
                name: "Manajemen & Organisasi",
                desc: "Komitmen pimpinan, investasi transformasi, kebijakan inovasi, dan struktur organisasi untuk mendukung perubahan.",
              },
              {
                num: "02",
                name: "Orang & Budaya",
                desc: "Kompetensi SDM, budaya kerja, keterbukaan terhadap perubahan, dan program pengembangan karyawan.",
              },
              {
                num: "03",
                name: "Produk & Layanan",
                desc: "Tingkat kustomisasi produk, layanan berbasis data, dan integrasi teknologi pada produk yang dihasilkan.",
              },
              {
                num: "04",
                name: "Teknologi",
                desc: "Konektivitas mesin, keamanan siber, digitalisasi proses, dan adopsi teknologi Industri 4.0.",
              },
              {
                num: "05",
                name: "Operasi Pabrik",
                desc: "Pengelolaan data produksi, rantai pasok cerdas, otomasi, dan sistem perawatan berbasis kondisi.",
              },
            ].map((p) => (
              <div className="pillar-card" key={p.num}>
                <div className="pillar-number">{p.num}</div>
                <div className="pillar-name">{p.name}</div>
                <div className="pillar-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LEVELS */}
      <section className="section">
        <p className="section-label">Skala Penilaian</p>
        <h2 className="section-title">5 level kesiapan industri</h2>
        <p className="section-desc">
          Skor INDI 4.0 berkisar dari level 0 hingga 4. Setiap level
          menggambarkan tahap kesiapan yang berbeda dan menjadi panduan aksi
          konkret bagi perusahaan.
        </p>
        <div className="levels-grid">
          {[
            {
              lv: "Level 0",
              name: "Belum Siap",
              cls: "level-0",
              desc: "Industri belum mengenal atau belum memiliki kesiapan apapun untuk bertransformasi ke Industri 4.0.",
            },
            {
              lv: "Level 1",
              name: "Kesiapan Awal",
              cls: "level-1",
              desc: "Sudah mengenal konsep Industri 4.0 dan mulai mengarahkan sebagian operasi untuk bertransformasi.",
            },
            {
              lv: "Level 2",
              name: "Kesiapan Sedang",
              cls: "level-2",
              desc: "Terdapat fondasi yang baik. Dukungan teknologi, manajemen, dan operasi pabrik mulai terbentuk.",
            },
            {
              lv: "Level 3",
              name: "Kesiapan Matang",
              cls: "level-3",
              desc: "Industri mulai menerapkan Industri 4.0 di sebagian lini operasi secara nyata dan terstruktur.",
            },
            {
              lv: "Level 4",
              name: "Sudah Menerapkan",
              cls: "level-4",
              desc: "Sebagian besar konsep Industri 4.0 telah diterapkan dan perusahaan siap untuk transformasi penuh.",
            },
          ].map((l) => (
            <div className={`level-card ${l.cls}`} key={l.lv}>
              <div className="level-badge">{l.lv}</div>
              <div className="level-name">{l.name}</div>
              <div className="level-desc">{l.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* SECTORS */}
      <section className="section">
        <p className="section-label">Sektor Prioritas</p>
        <h2 className="section-title">Lima sektor yang diprioritaskan</h2>
        <p className="section-desc">
          Making Indonesia 4.0 menargetkan lima sektor manufaktur yang dipilih
          berdasarkan kontribusi ekonomi, potensi ekspor, dan kelayakan
          implementasi.
        </p>
        <div className="sectors-grid">
          {[
            {
              name: "Makanan & Minuman",
              target: "Menjadi ASEAN F&B powerhouse pada 2030",
            },
            {
              name: "Tekstil & Busana",
              target: "Produsen functional clothing terkemuka",
            },
            {
              name: "Otomotif",
              target: "Pemain ekspor ICE dan kendaraan listrik",
            },
            {
              name: "Elektronika",
              target: "Pemain terkemuka di industri biokimia",
            },
            {
              name: "Industri Kimia",
              target: "Mengembangkan kapabilitas pelaku industri domestik",
            },
          ].map((s) => (
            <div className="sector-card" key={s.name}>
              <div className="sector-name">{s.name}</div>
              <div className="sector-target">{s.target}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* PROCESS */}
      <section className="section">
        <p className="section-label">Cara Kerja</p>
        <h2 className="section-title">Proses assessment</h2>
        <p className="section-desc">
          Assessment INDI 4.0 dirancang agar efisien dan mudah diikuti — hanya
          membutuhkan sekitar 15 menit untuk menyelesaikan survei online.
        </p>
        <div className="process-steps">
          <div className="step">
            <div className="step-num">01</div>
            <div className="step-title">Isi Survei Online</div>
            <div className="step-desc">
              33 pertanyaan terstruktur mencakup 5 pilar INDI 4.0. Diisi oleh
              perwakilan perusahaan yang memahami kondisi operasional secara
              keseluruhan. Estimasi waktu: 15 menit.
            </div>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <div className="step-title">Verifikasi Lapangan</div>
            <div className="step-desc">
              Pakar Industri 4.0 dari Kementerian Perindustrian melakukan
              kunjungan langsung untuk memverifikasi data yang disampaikan dalam
              survei online.
            </div>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <div className="step-title">Hasil & Rekomendasi</div>
            <div className="step-desc">
              Perusahaan menerima skor INDI 4.0 per pilar beserta interpretasi
              dan rekomendasi langkah strategis untuk meningkatkan kesiapan
              transformasi.
            </div>
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <div className="cta-bottom">
        <div className="cta-bottom-inner">
          <p className="section-label">Assessment</p>
          <h2 className="cta-bottom-title">
            Ketahui posisi industri Anda hari ini
          </h2>
          <p className="cta-bottom-desc">
            Mulai assessment INDI 4.0 untuk mendapatkan gambaran lengkap
            kesiapan transformasi perusahaan Anda — gratis dan berbasis standar
            nasional resmi.
          </p>
          <button
            className="btn-white"
            onClick={() => router.push("/assessment")}
          >
            Mulai Assessment Sekarang <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #e5e2dc", padding: "0" }}>
        <div className="footer">
          <div className="footer-logo">
            INDI <span>4.0</span>
          </div>
          <div className="footer-text">
            © 2026 Badan Penelitian dan Pengembangan Industri · Kementerian
            Perindustrian Republik Indonesia
          </div>
        </div>
      </footer>
    </div>
  );
}
