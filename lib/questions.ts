// lib/questions.ts
// Complete INDI 4.0 questionnaire data

import type { Section } from "./types";

export const sections: Section[] = [
  // ============================================
  // SECTION 1: Company Information
  // ============================================
  {
    id: "company_info",
    title: "Informasi Umum Perusahaan",
    weight: 0,
    questions: [
      {
        id: "1.1",
        text: "Nama Perusahaan",
        type: "text",
        required: true,
        placeholder: "Masukkan nama perusahaan",
      },
      {
        id: "1.2",
        text: "Alamat Perusahaan",
        type: "textarea",
        required: true,
        placeholder: "Masukkan alamat lengkap perusahaan",
      },
      {
        id: "1.3",
        text: "Sektor Industri",
        type: "single",
        required: true,
        options: [
          { value: "A", label: "Industri makanan & minuman" },
          { value: "B", label: "Tekstil & busana" },
          { value: "C", label: "Otomotif" },
          { value: "D", label: "Elektronika dan logam" },
          { value: "E", label: "Industri kimia" },
          { value: "F", label: "Kayu & furniture" },
          { value: "G", label: "Industri kertas" },
          { value: "H", label: "Logam dasar" },
          { value: "I", label: "Industri mesin" },
          { value: "J", label: "Farmasi" },
          { value: "K", label: "Lainnya" },
        ],
      },
      {
        id: "1.4",
        text: "Jumlah Karyawan",
        type: "single",
        required: true,
        options: [
          { value: "A", label: "1-9" },
          { value: "B", label: "10-29" },
          { value: "C", label: "30-299" },
          { value: "D", label: "300-1.000" },
          { value: "E", label: "Lebih dari 1.000" },
        ],
      },
      {
        id: "1.5",
        text: "Omset Perusahaan Tahun Lalu",
        type: "single",
        required: true,
        options: [
          { value: "A", label: "< 50 juta" },
          { value: "B", label: "50 juta - 500 juta" },
          { value: "C", label: "500 juta - 10 milyar" },
          { value: "D", label: "Diatas 10 milyar" },
        ],
      },
      {
        id: "1.6",
        text: "Posisi/Jabatan Anda",
        type: "single",
        required: true,
        options: [
          { value: "A", label: "Top manajemen" },
          { value: "B", label: "Middle manajemen" },
          { value: "C", label: "Low manajemen" },
          { value: "D", label: "Non manajemen (teknisi/operator)" },
        ],
      },
      {
        id: "1.7",
        text: "Email dan Nomor Telepon",
        type: "text",
        required: true,
        placeholder: "contoh@email.com / 08123456789",
      },
    ],
  },

  // ============================================
  // SECTION 2: Management & Organization (25%)
  // ============================================
  {
    id: "management",
    title: "Manajemen & Organisasi",
    weight: 0.25,
    questions: [
      {
        id: "2.1",
        text: "Bagaimana Anda menggambarkan dukungan pihak manajemen terhadap implementasi transformasi Industri 4.0?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 1, C: 2, D: 3, E: 4 },
        options: [
          { value: "A", label: "Tidak mendukung", score: 0 },
          {
            value: "B",
            label: "Belum ada kata sepakat dari pihak manajemen",
            score: 1,
          },
          { value: "C", label: "Kurang mendukung", score: 2 },
          { value: "D", label: "Cukup mendukung", score: 3 },
          { value: "E", label: "Sangat mendukung", score: 4 },
        ],
      },
      {
        id: "2.2",
        text: "Apa status implementasi strategi Industri 4.0 di perusahaan Anda?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 1, C: 2, D: 3, E: 4 },
        options: [
          { value: "A", label: "Belum ada strategi implementasinya", score: 0 },
          {
            value: "B",
            label: "Pilot proyek Industri 4.0 sedang diformulasikan",
            score: 1,
          },
          {
            value: "C",
            label: "Pilot proyek Industri 4.0 sedang berjalan",
            score: 2,
          },
          {
            value: "D",
            label:
              "Strategi implementasi Industri 4.0 sedang berjalan di semua lini",
            score: 3,
          },
          {
            value: "E",
            label:
              "Strategi implementasi Industri 4.0 sudah selesai di semua lini",
            score: 4,
          },
        ],
      },
      {
        id: "2.3",
        text: "Berapa jumlah investasi untuk bertransformasi ke Industri 4.0?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 0, C: 1, D: 2, E: 3, F: 4 },
        options: [
          { value: "A", label: "Belum ada rencana investasi", score: 0 },
          {
            value: "B",
            label: "Investasi masih didiskusikan untuk tahun depan",
            score: 0,
          },
          {
            value: "C",
            label: "Investasi tahun ini kurang dari 1 milyar",
            score: 1,
          },
          {
            value: "D",
            label: "Investasi tahun ini 1 milyar - 5 milyar",
            score: 2,
          },
          {
            value: "E",
            label: "Investasi tahun ini 5 milyar - 10 milyar",
            score: 3,
          },
          {
            value: "F",
            label: "Investasi tahun ini diatas 10 milyar",
            score: 4,
          },
        ],
      },
      {
        id: "2.4",
        text: "Adakah departemen/tim khusus untuk mentransformasikan ke Industri 4.0?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 1, C: 2, D: 3, E: 4 },
        options: [
          { value: "A", label: "Belum ada", score: 0 },
          {
            value: "B",
            label: "Belum ada tetapi sudah mendatangkan konsultan/ahli",
            score: 1,
          },
          {
            value: "C",
            label: "Sedang direncanakan untuk tahun depan",
            score: 2,
          },
          { value: "D", label: "Sudah ada tetapi belum maksimal", score: 3 },
          { value: "E", label: "Sudah ada dan berjalan efektif", score: 4 },
        ],
      },
      {
        id: "2.5",
        text: "Di bidang apa saja inovasi Industri 4.0 telah diimplementasikan?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 1, C: 2, D: 3, E: 4 },
        options: [
          { value: "A", label: "Belum ada", score: 0 },
          { value: "B", label: "Teknologi informasi", score: 1 },
          {
            value: "C",
            label: "Teknologi informasi dan dua bidang lainnya",
            score: 2,
          },
          {
            value: "D",
            label: "Sudah di lebih dari tiga bidang/departemen",
            score: 3,
          },
          { value: "E", label: "Di semua bidang/departemen", score: 4 },
        ],
      },
    ],
  },

  // ============================================
  // SECTION 3: People & Culture (30%)
  // ============================================
  {
    id: "people_culture",
    title: "Orang & Budaya",
    weight: 0.3,
    questions: [
      {
        id: "3.1",
        text: "Bagaimana budaya karyawan di perusahaan?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 1, C: 2, D: 3, E: 4 },
        options: [
          {
            value: "A",
            label: "Belum memiliki budaya disiplin waktu",
            score: 0,
          },
          {
            value: "B",
            label: "Sudah memiliki budaya disiplin waktu",
            score: 1,
          },
          { value: "C", label: "Disiplin waktu dan kemauan belajar", score: 2 },
          {
            value: "D",
            label: "Disiplin, mau belajar, dan terbuka dengan perubahan",
            score: 3,
          },
          {
            value: "E",
            label:
              "Budaya sejalan dengan Industri 4.0 (disiplin, terbuka, dedikasi tinggi)",
            score: 4,
          },
        ],
      },
      {
        id: "3.2",
        text: "Bagaimana etos kerja karyawan?",
        type: "single",
        required: true,
        scoring: { A: 4, B: 3, C: 2, D: 1, E: 0 },
        options: [
          { value: "A", label: "Sangat tinggi", score: 4 },
          { value: "B", label: "Tinggi", score: 3 },
          { value: "C", label: "Sedang", score: 2 },
          { value: "D", label: "Rendah", score: 1 },
          { value: "E", label: "Sangat rendah", score: 0 },
        ],
      },
      {
        id: "3.3",
        text: "Karyawan sudah terbiasa dengan hal berikut? (boleh pilih lebih dari satu)",
        type: "multiple",
        required: true,
        scoring: "count",
        options: [
          {
            value: "A",
            label: "Perbaikan berkelanjutan (continuous improvement)",
            isExclusive: false,
          },
          { value: "B", label: "Kritis dan terbuka", isExclusive: false },
          { value: "C", label: "Berwawasan internasional", isExclusive: false },
          {
            value: "D",
            label: "Fleksibel terhadap perubahan",
            isExclusive: false,
          },
          {
            value: "E",
            label: "Tidak ada yang seperti di atas",
            isExclusive: true,
          },
        ],
      },
      {
        id: "3.4",
        text: "Seberapa terbuka karyawan terhadap teknologi baru?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 1, C: 2, D: 3, E: 4 },
        options: [
          { value: "A", label: "Sangat tertutup/antipati", score: 0 },
          {
            value: "B",
            label: "Keinginan mengikuti perubahan ada, tetapi masih kurang",
            score: 1,
          },
          {
            value: "C",
            label: "Secara umum terbuka dengan perubahan",
            score: 2,
          },
          {
            value: "D",
            label: "Sangat mendukung perubahan dan perbaikan teknologi",
            score: 3,
          },
          {
            value: "E",
            label: "Sangat terbuka, siap belajar teknologi baru",
            score: 4,
          },
        ],
      },
      {
        id: "3.5",
        text: "Apakah ada training/workshop/sertifikasi terkait Industri 4.0?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 0, C: 1, D: 2, E: 3, F: 4 },
        options: [
          { value: "A", label: "Belum ada", score: 0 },
          { value: "B", label: "Ada rencana tahun depan", score: 0 },
          { value: "C", label: "Sudah menjadi agenda perusahaan", score: 1 },
          {
            value: "D",
            label: "Sudah dilakukan pada sebagian kecil",
            score: 2,
          },
          {
            value: "E",
            label: "Sudah dilakukan/sosialisasi ke semua karyawan",
            score: 3,
          },
          { value: "F", label: "Rutin dan termonitor untuk semua", score: 4 },
        ],
      },
    ],
  },

  // ============================================
  // SECTION 4: Product & Service (15%)
  // ============================================
  {
    id: "product_service",
    title: "Produk & Layanan",
    weight: 0.15,
    questions: [
      {
        id: "4.1",
        text: "Seberapa persen tingkat kustomisasi produk?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 1, C: 2, D: 3, E: 4 },
        options: [
          { value: "A", label: "0% (belum ada kustomisasi)", score: 0 },
          { value: "B", label: "1%-25% (beberapa produk kustom)", score: 1 },
          { value: "C", label: "26%-50% (banyak produk kustom)", score: 2 },
          { value: "D", label: "51%-75% (sebagian besar kustom)", score: 3 },
          { value: "E", label: "76%-100% (hampir semua kustom)", score: 4 },
        ],
      },
      {
        id: "4.2",
        text: "Apakah melakukan analisis data dari customer dan vendor?",
        type: "single",
        required: true,
        scoring: { A: 4, B: 0, C: 2 },
        options: [
          { value: "A", label: "Iya", score: 4 },
          { value: "B", label: "Tidak", score: 0 },
          { value: "C", label: "Sudah tapi belum dianalisis", score: 2 },
        ],
      },
      {
        id: "4.3",
        text: "Data digunakan untuk apa? (boleh pilih lebih dari satu)",
        type: "multiple",
        required: true,
        scoring: "count",
        options: [
          { value: "A", label: "Belum mengumpulkan data", isExclusive: true },
          {
            value: "B",
            label: "Merancang model bisnis baru",
            isExclusive: false,
          },
          {
            value: "C",
            label: "Meningkatkan pelayanan pelanggan",
            isExclusive: false,
          },
          {
            value: "D",
            label: "Evaluasi kinerja produksi dan internal",
            isExclusive: false,
          },
          {
            value: "E",
            label: "Meningkatkan kualitas produk",
            isExclusive: false,
          },
        ],
      },
      {
        id: "4.4",
        text: "Produk terintegrasi teknologi berikut? (boleh pilih lebih dari satu)",
        type: "multiple",
        required: true,
        scoring: "count",
        options: [
          { value: "A", label: "RFID", isExclusive: false },
          {
            value: "B",
            label: "Interface koneksi internet",
            isExclusive: false,
          },
          { value: "C", label: "Condition monitoring", isExclusive: false },
          { value: "D", label: "GPS", isExclusive: false },
          { value: "E", label: "Barcode", isExclusive: false },
          { value: "F", label: "Tidak ada", isExclusive: true },
        ],
      },
    ],
  },

  // ============================================
  // SECTION 5: Technology (15%)
  // ============================================
  {
    id: "technology",
    title: "Teknologi",
    weight: 0.15,
    questions: [
      {
        id: "5.1",
        text: "Apakah menerapkan keamanan cyber?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 0, C: 1, D: 2, E: 3, F: 4, G: 4 },
        options: [
          { value: "A", label: "Belum menerapkan", score: 0 },
          { value: "B", label: "Belum merasa perlu", score: 0 },
          {
            value: "C",
            label: "Sudah ada tetapi hanya untuk sistem IT",
            score: 1,
          },
          { value: "D", label: "Ada rencana tahun depan", score: 2 },
          {
            value: "E",
            label: "Sudah ada di bagian/departemen tertentu",
            score: 3,
          },
          { value: "F", label: "Sudah ada di semua lini operasi", score: 4 },
          { value: "G", label: "Sudah mendapat ISO 27001", score: 4 },
        ],
      },
      {
        id: "5.2",
        text: "Konektivitas M2M (komunikasi antar mesin) via internet/intranet?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 1, C: 2, D: 3, E: 4 },
        options: [
          { value: "A", label: "Tidak ada", score: 0 },
          { value: "B", label: "Ada tetapi tidak terpakai", score: 1 },
          { value: "C", label: "Ada tetapi hanya sebagian terpakai", score: 2 },
          {
            value: "D",
            label: "Ada dan dipakai tetapi belum di-upgrade",
            score: 3,
          },
          { value: "E", label: "Ada dan terus menerus dipakai", score: 4 },
        ],
      },
      {
        id: "5.3",
        text: "Konektivitas antar sistem di/antar perusahaan?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 1, C: 2, D: 3, E: 4 },
        options: [
          { value: "A", label: "Tidak ada", score: 0 },
          { value: "B", label: "Ada tetapi tidak terpakai", score: 1 },
          { value: "C", label: "Ada tetapi hanya sebagian terpakai", score: 2 },
          {
            value: "D",
            label: "Ada dan dipakai tetapi belum di-upgrade",
            score: 3,
          },
          { value: "E", label: "Ada dan terus menerus dipakai", score: 4 },
        ],
      },
      {
        id: "5.4",
        text: "Teknologi yang sudah dipakai? (boleh pilih lebih dari satu)",
        type: "multiple",
        required: true,
        scoring: "count",
        options: [
          { value: "A", label: "Computer network", isExclusive: false },
          { value: "B", label: "Databases", isExclusive: false },
          { value: "C", label: "Kecerdasan buatan", isExclusive: false },
          { value: "D", label: "Machine learning", isExclusive: false },
          { value: "E", label: "Industrial IoT", isExclusive: false },
          { value: "F", label: "Tidak ada", isExclusive: true },
        ],
      },
      {
        id: "5.5",
        text: "Tingkat digitalisasi di perusahaan?",
        type: "single",
        required: true,
        scoring: { A: 4, B: 3, C: 2, D: 1, E: 0 },
        options: [
          {
            value: "A",
            label: "Semua bidang sudah didigitalisasi (100%)",
            score: 4,
          },
          {
            value: "B",
            label: "Lebih dari 75% sudah didigitalisasi",
            score: 3,
          },
          {
            value: "C",
            label: "Sebagian sudah didigitalisasi (50%)",
            score: 2,
          },
          { value: "D", label: "Baru beberapa bidang", score: 1 },
          { value: "E", label: "Belum menerapkan digitalisasi", score: 0 },
        ],
      },
    ],
  },

  // ============================================
  // SECTION 6: Factory Operation (15%)
  // ============================================
  {
    id: "factory_operation",
    title: "Operasi Pabrik",
    weight: 0.15,
    questions: [
      {
        id: "6.1",
        text: "Di mana data perusahaan disimpan?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 1, C: 2, D: 3, E: 4 },
        options: [
          { value: "A", label: "Belum ada penyimpanan data", score: 0 },
          {
            value: "B",
            label: "Di komputer/hard disk masing-masing",
            score: 1,
          },
          { value: "C", label: "Di server masing-masing departemen", score: 2 },
          {
            value: "D",
            label: "Di pusat server internal/departemen IT",
            score: 3,
          },
          { value: "E", label: "Di cloud", score: 4 },
        ],
      },
      {
        id: "6.2",
        text: "Sistem di rantai pasok dan logistik? (boleh pilih lebih dari satu)",
        type: "multiple",
        required: true,
        scoring: "count",
        options: [
          {
            value: "A",
            label: "RFID di produk dan komponen",
            isExclusive: false,
          },
          {
            value: "B",
            label: "Barcode di produk dan komponen",
            isExclusive: false,
          },
          { value: "C", label: "GPS monitoring system", isExclusive: false },
          {
            value: "D",
            label: "Real time inventory control",
            isExclusive: false,
          },
          {
            value: "E",
            label: "Integrasi logistik dengan vendor/supplier",
            isExclusive: false,
          },
          { value: "F", label: "Tidak ada", isExclusive: true },
        ],
      },
      {
        id: "6.3",
        text: "Seberapa persen proses otomasi?",
        type: "single",
        required: true,
        scoring: { A: 0, B: 1, C: 2, D: 3, E: 4 },
        options: [
          { value: "A", label: "0%", score: 0 },
          { value: "B", label: "25%", score: 1 },
          { value: "C", label: "50%", score: 2 },
          { value: "D", label: "75%", score: 3 },
          { value: "E", label: "100%", score: 4 },
        ],
      },
      {
        id: "6.4",
        text: "Sistem perawatan mesin yang diimplementasikan?",
        type: "single",
        required: true,
        scoring: { A: 4, B: 3, C: 2, D: 1, E: 0 },
        options: [
          { value: "A", label: "Real time monitoring & OEE system", score: 4 },
          { value: "B", label: "Perawatan prediktif", score: 3 },
          { value: "C", label: "Perawatan preventif", score: 2 },
          { value: "D", label: "Perawatan corrective", score: 1 },
          { value: "E", label: "Belum ada", score: 0 },
        ],
      },
    ],
  },
];

// Export individual sections for easier access
export const companyInfoSection = sections[0];
export const managementSection = sections[1];
export const peopleCultureSection = sections[2];
export const productServiceSection = sections[3];
export const technologySection = sections[4];
export const factoryOperationSection = sections[5];

// Get all questions flattened
export const getAllQuestions = () => {
  return sections.flatMap((section) =>
    section.questions.map((q) => ({
      ...q,
      sectionId: section.id,
      sectionTitle: section.title,
    }))
  );
};

// Get assessment sections only (excluding company info)
export const getAssessmentSections = () => {
  return sections.filter((s) => s.weight > 0);
};

// Get total number of questions
export const getTotalQuestions = () => {
  return sections.reduce(
    (total, section) => total + section.questions.length,
    0
  );
};
