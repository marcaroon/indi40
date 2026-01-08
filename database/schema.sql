-- INDI 4.0 Assessment Database Schema
-- =====================================

DROP DATABASE IF EXISTS indi40_assessment;
CREATE DATABASE indi40_assessment CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE indi40_assessment;

-- Table: questions
-- Menyimpan semua pertanyaan assessment
CREATE TABLE questions (
  id VARCHAR(10) PRIMARY KEY,
  section_id VARCHAR(50) NOT NULL,
  section_title VARCHAR(100) NOT NULL,
  question_text TEXT NOT NULL,
  question_type ENUM('text', 'textarea', 'single', 'multiple') NOT NULL,
  scoring_type VARCHAR(20),
  section_weight DECIMAL(3,2) DEFAULT 0,
  question_order INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_section (section_id),
  INDEX idx_order (question_order)
) ENGINE=InnoDB;

-- Table: options
-- Menyimpan opsi jawaban untuk setiap pertanyaan
CREATE TABLE options (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question_id VARCHAR(10) NOT NULL,
  option_value VARCHAR(10) NOT NULL,
  option_label TEXT NOT NULL,
  score_value INT,
  is_exclusive BOOLEAN DEFAULT FALSE COMMENT 'True jika opsi ini eksklusif (tidak bisa dipilih bersamaan dengan lainnya)',
  display_order INT NOT NULL,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE,
  INDEX idx_question (question_id),
  INDEX idx_order (display_order)
) ENGINE=InnoDB;

-- Table: assessments
-- Menyimpan data utama assessment
CREATE TABLE assessments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  company_address TEXT,
  industry_sector VARCHAR(100),
  employee_count VARCHAR(50),
  annual_revenue VARCHAR(50),
  respondent_position VARCHAR(100),
  contact_info VARCHAR(255),
  total_score DECIMAL(4,2) NOT NULL,
  overall_level INT NOT NULL,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  user_agent TEXT,
  INDEX idx_completed (completed_at),
  INDEX idx_sector (industry_sector),
  INDEX idx_level (overall_level)
) ENGINE=InnoDB;

-- Table: responses
-- Menyimpan jawaban untuk setiap pertanyaan
CREATE TABLE responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessment_id INT NOT NULL,
  question_id VARCHAR(10) NOT NULL,
  response_value TEXT NOT NULL COMMENT 'JSON array untuk multiple choice, string untuk single/text',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id),
  INDEX idx_assessment (assessment_id),
  INDEX idx_question (question_id)
) ENGINE=InnoDB;

-- Table: pillar_scores
-- Menyimpan skor per pilar INDI 4.0
CREATE TABLE pillar_scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessment_id INT NOT NULL,
  pillar_id VARCHAR(50) NOT NULL,
  pillar_name VARCHAR(100) NOT NULL,
  score DECIMAL(4,2) NOT NULL,
  level INT NOT NULL,
  weight DECIMAL(3,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE CASCADE,
  INDEX idx_assessment_pillar (assessment_id, pillar_id)
) ENGINE=InnoDB;

-- Table: audit_log
-- Optional: untuk tracking perubahan
CREATE TABLE audit_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessment_id INT,
  action VARCHAR(50) NOT NULL,
  details TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (assessment_id) REFERENCES assessments(id) ON DELETE SET NULL,
  INDEX idx_assessment (assessment_id),
  INDEX idx_created (created_at)
) ENGINE=InnoDB;

-- =====================================
-- SAMPLE DATA INSERTION
-- =====================================

-- Insert Questions for Section 1: Company Info
INSERT INTO questions (id, section_id, section_title, question_text, question_type, scoring_type, section_weight, question_order) VALUES
('1.1', 'company_info', 'Informasi Umum Perusahaan', 'Nama Perusahaan', 'text', NULL, 0, 1),
('1.2', 'company_info', 'Informasi Umum Perusahaan', 'Alamat Perusahaan', 'textarea', NULL, 0, 2),
('1.3', 'company_info', 'Informasi Umum Perusahaan', 'Sektor Industri', 'single', NULL, 0, 3),
('1.4', 'company_info', 'Informasi Umum Perusahaan', 'Jumlah Karyawan', 'single', NULL, 0, 4),
('1.5', 'company_info', 'Informasi Umum Perusahaan', 'Omset Perusahaan Tahun Lalu', 'single', NULL, 0, 5),
('1.6', 'company_info', 'Informasi Umum Perusahaan', 'Posisi/Jabatan Anda', 'single', NULL, 0, 6),
('1.7', 'company_info', 'Informasi Umum Perusahaan', 'Email dan Nomor Telepon', 'text', NULL, 0, 7);

-- Options for 1.3
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('1.3', 'A', 'Industri makanan & minuman', NULL, FALSE, 1),
('1.3', 'B', 'Tekstil & busana', NULL, FALSE, 2),
('1.3', 'C', 'Otomotif', NULL, FALSE, 3),
('1.3', 'D', 'Elektronika dan logam', NULL, FALSE, 4),
('1.3', 'E', 'Industri kimia', NULL, FALSE, 5),
('1.3', 'F', 'Kayu & furniture', NULL, FALSE, 6),
('1.3', 'G', 'Industri kertas', NULL, FALSE, 7),
('1.3', 'H', 'Logam dasar', NULL, FALSE, 8),
('1.3', 'I', 'Industri mesin', NULL, FALSE, 9),
('1.3', 'J', 'Farmasi', NULL, FALSE, 10),
('1.3', 'K', 'Lainnya', NULL, FALSE, 11);

-- Options for 1.4
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('1.4', 'A', '1-9', NULL, FALSE, 1),
('1.4', 'B', '10-29', NULL, FALSE, 2),
('1.4', 'C', '30-299', NULL, FALSE, 3),
('1.4', 'D', '300-1.000', NULL, FALSE, 4),
('1.4', 'E', 'Lebih dari 1.000', NULL, FALSE, 5);

-- Options for 1.5
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('1.5', 'A', '< 50 juta', NULL, FALSE, 1),
('1.5', 'B', '50 juta - 500 juta', NULL, FALSE, 2),
('1.5', 'C', '500 juta - 10 milyar', NULL, FALSE, 3),
('1.5', 'D', 'Diatas 10 milyar', NULL, FALSE, 4);

-- Options for 1.6
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('1.6', 'A', 'Top manajemen', NULL, FALSE, 1),
('1.6', 'B', 'Middle manajemen', NULL, FALSE, 2),
('1.6', 'C', 'Low manajemen', NULL, FALSE, 3),
('1.6', 'D', 'Non manajemen (teknisi/operator)', NULL, FALSE, 4);

-- Section 2: Management & Organization
INSERT INTO questions (id, section_id, section_title, question_text, question_type, scoring_type, section_weight, question_order) VALUES
('2.1', 'management', 'Manajemen & Organisasi', 'Bagaimana Anda menggambarkan dukungan pihak manajemen terhadap implementasi transformasi Industri 4.0?', 'single', 'direct', 0.25, 8),
('2.2', 'management', 'Manajemen & Organisasi', 'Apa status implementasi strategi Industri 4.0 di perusahaan Anda?', 'single', 'direct', 0.25, 9),
('2.3', 'management', 'Manajemen & Organisasi', 'Berapa jumlah investasi untuk bertransformasi ke Industri 4.0?', 'single', 'direct', 0.25, 10),
('2.4', 'management', 'Manajemen & Organisasi', 'Adakah departemen/tim khusus untuk mentransformasikan ke Industri 4.0?', 'single', 'direct', 0.25, 11),
('2.5', 'management', 'Manajemen & Organisasi', 'Di bidang apa saja inovasi Industri 4.0 telah diimplementasikan?', 'single', 'direct', 0.25, 12);

-- Options for 2.1
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('2.1', 'A', 'Tidak mendukung', 0, FALSE, 1),
('2.1', 'B', 'Belum ada kata sepakat dari pihak manajemen', 1, FALSE, 2),
('2.1', 'C', 'Kurang mendukung', 2, FALSE, 3),
('2.1', 'D', 'Cukup mendukung', 3, FALSE, 4),
('2.1', 'E', 'Sangat mendukung', 4, FALSE, 5);

-- Options for 2.2
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('2.2', 'A', 'Belum ada strategi implementasinya', 0, FALSE, 1),
('2.2', 'B', 'Pilot proyek Industri 4.0 sedang diformulasikan', 1, FALSE, 2),
('2.2', 'C', 'Pilot proyek Industri 4.0 sedang berjalan', 2, FALSE, 3),
('2.2', 'D', 'Strategi implementasi Industri 4.0 sedang berjalan di semua lini', 3, FALSE, 4),
('2.2', 'E', 'Strategi implementasi Industri 4.0 sudah selesai di semua lini', 4, FALSE, 5);

-- Options for 2.3
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('2.3', 'A', 'Belum ada rencana investasi', 0, FALSE, 1),
('2.3', 'B', 'Investasi masih didiskusikan untuk tahun depan', 0, FALSE, 2),
('2.3', 'C', 'Investasi tahun ini kurang dari 1 milyar', 1, FALSE, 3),
('2.3', 'D', 'Investasi tahun ini 1 milyar - 5 milyar', 2, FALSE, 4),
('2.3', 'E', 'Investasi tahun ini 5 milyar - 10 milyar', 3, FALSE, 5),
('2.3', 'F', 'Investasi tahun ini diatas 10 milyar', 4, FALSE, 6);

-- Options for 2.4
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('2.4', 'A', 'Belum ada', 0, FALSE, 1),
('2.4', 'B', 'Belum ada tetapi sudah mendatangkan konsultan/ahli', 1, FALSE, 2),
('2.4', 'C', 'Sedang direncanakan untuk tahun depan', 2, FALSE, 3),
('2.4', 'D', 'Sudah ada tetapi belum maksimal', 3, FALSE, 4),
('2.4', 'E', 'Sudah ada dan berjalan efektif', 4, FALSE, 5);

-- Options for 2.5
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('2.5', 'A', 'Belum ada', 0, FALSE, 1),
('2.5', 'B', 'Teknologi informasi', 1, FALSE, 2),
('2.5', 'C', 'Teknologi informasi dan dua bidang lainnya', 2, FALSE, 3),
('2.5', 'D', 'Sudah di lebih dari tiga bidang/departemen', 3, FALSE, 4),
('2.5', 'E', 'Di semua bidang/departemen', 4, FALSE, 5);

-- Section 3: People & Culture
INSERT INTO questions (id, section_id, section_title, question_text, question_type, scoring_type, section_weight, question_order) VALUES
('3.1', 'people_culture', 'Orang & Budaya', 'Bagaimana budaya karyawan di perusahaan?', 'single', 'direct', 0.30, 13),
('3.2', 'people_culture', 'Orang & Budaya', 'Bagaimana etos kerja karyawan?', 'single', 'reverse', 0.30, 14),
('3.3', 'people_culture', 'Orang & Budaya', 'Karyawan sudah terbiasa dengan hal berikut? (boleh pilih lebih dari satu)', 'multiple', 'count', 0.30, 15),
('3.4', 'people_culture', 'Orang & Budaya', 'Seberapa terbuka karyawan terhadap teknologi baru?', 'single', 'direct', 0.30, 16),
('3.5', 'people_culture', 'Orang & Budaya', 'Apakah ada training/workshop/sertifikasi terkait Industri 4.0?', 'single', 'direct', 0.30, 17);

-- Options for 3.1
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('3.1', 'A', 'Belum memiliki budaya disiplin waktu', 0, FALSE, 1),
('3.1', 'B', 'Sudah memiliki budaya disiplin waktu', 1, FALSE, 2),
('3.1', 'C', 'Disiplin waktu dan kemauan belajar', 2, FALSE, 3),
('3.1', 'D', 'Disiplin, mau belajar, dan terbuka dengan perubahan', 3, FALSE, 4),
('3.1', 'E', 'Budaya sejalan dengan Industri 4.0 (disiplin, terbuka, dedikasi tinggi)', 4, FALSE, 5);

-- Options for 3.2
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('3.2', 'A', 'Sangat tinggi', 4, FALSE, 1),
('3.2', 'B', 'Tinggi', 3, FALSE, 2),
('3.2', 'C', 'Sedang', 2, FALSE, 3),
('3.2', 'D', 'Rendah', 1, FALSE, 4),
('3.2', 'E', 'Sangat rendah', 0, FALSE, 5);

-- Options for 3.3 (dengan exclusive option)
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('3.3', 'A', 'Perbaikan berkelanjutan (continuous improvement)', 1, FALSE, 1),
('3.3', 'B', 'Kritis dan terbuka', 1, FALSE, 2),
('3.3', 'C', 'Berwawasan internasional', 1, FALSE, 3),
('3.3', 'D', 'Fleksibel terhadap perubahan', 1, FALSE, 4),
('3.3', 'E', 'Tidak ada yang seperti di atas', 0, TRUE, 5);

-- Options for 3.4
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('3.4', 'A', 'Sangat tertutup/antipati', 0, FALSE, 1),
('3.4', 'B', 'Keinginan mengikuti perubahan ada, tetapi masih kurang', 1, FALSE, 2),
('3.4', 'C', 'Secara umum terbuka dengan perubahan', 2, FALSE, 3),
('3.4', 'D', 'Sangat mendukung perubahan dan perbaikan teknologi', 3, FALSE, 4),
('3.4', 'E', 'Sangat terbuka, siap belajar teknologi baru', 4, FALSE, 5);

-- Options for 3.5
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('3.5', 'A', 'Belum ada', 0, FALSE, 1),
('3.5', 'B', 'Ada rencana tahun depan', 0, FALSE, 2),
('3.5', 'C', 'Sudah menjadi agenda perusahaan', 1, FALSE, 3),
('3.5', 'D', 'Sudah dilakukan pada sebagian kecil', 2, FALSE, 4),
('3.5', 'E', 'Sudah dilakukan/sosialisasi ke semua karyawan', 3, FALSE, 5),
('3.5', 'F', 'Rutin dan termonitor untuk semua', 4, FALSE, 6);

-- Section 4: Product & Service
INSERT INTO questions (id, section_id, section_title, question_text, question_type, scoring_type, section_weight, question_order) VALUES
('4.1', 'product_service', 'Produk & Layanan', 'Seberapa persen tingkat kustomisasi produk?', 'single', 'direct', 0.15, 18),
('4.2', 'product_service', 'Produk & Layanan', 'Apakah melakukan analisis data dari customer dan vendor?', 'single', 'direct', 0.15, 19),
('4.3', 'product_service', 'Produk & Layanan', 'Data digunakan untuk apa? (boleh pilih lebih dari satu)', 'multiple', 'count', 0.15, 20),
('4.4', 'product_service', 'Produk & Layanan', 'Produk terintegrasi teknologi berikut? (boleh pilih lebih dari satu)', 'multiple', 'count', 0.15, 21);

-- Options for 4.1
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('4.1', 'A', '0% (belum ada kustomisasi)', 0, FALSE, 1),
('4.1', 'B', '1%-25% (beberapa produk kustom)', 1, FALSE, 2),
('4.1', 'C', '26%-50% (banyak produk kustom)', 2, FALSE, 3),
('4.1', 'D', '51%-75% (sebagian besar kustom)', 3, FALSE, 4),
('4.1', 'E', '76%-100% (hampir semua kustom)', 4, FALSE, 5);

-- Options for 4.2
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('4.2', 'A', 'Iya', 4, FALSE, 1),
('4.2', 'B', 'Tidak', 0, FALSE, 2),
('4.2', 'C', 'Sudah tapi belum dianalisis', 2, FALSE, 3);

-- Options for 4.3 (dengan exclusive option)
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('4.3', 'A', 'Belum mengumpulkan data', 0, TRUE, 1),
('4.3', 'B', 'Merancang model bisnis baru', 1, FALSE, 2),
('4.3', 'C', 'Meningkatkan pelayanan pelanggan', 1, FALSE, 3),
('4.3', 'D', 'Evaluasi kinerja produksi dan internal', 1, FALSE, 4),
('4.3', 'E', 'Meningkatkan kualitas produk', 1, FALSE, 5);

-- Options for 4.4 (dengan exclusive option)
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('4.4', 'A', 'RFID', 1, FALSE, 1),
('4.4', 'B', 'Interface koneksi internet', 1, FALSE, 2),
('4.4', 'C', 'Condition monitoring', 1, FALSE, 3),
('4.4', 'D', 'GPS', 1, FALSE, 4),
('4.4', 'E', 'Barcode', 1, FALSE, 5),
('4.4', 'F', 'Tidak ada', 0, TRUE, 6);

-- Section 5: Technology
INSERT INTO questions (id, section_id, section_title, question_text, question_type, scoring_type, section_weight, question_order) VALUES
('5.1', 'technology', 'Teknologi', 'Apakah menerapkan keamanan cyber?', 'single', 'direct', 0.15, 22),
('5.2', 'technology', 'Teknologi', 'Konektivitas M2M (komunikasi antar mesin) via internet/intranet?', 'single', 'direct', 0.15, 23),
('5.3', 'technology', 'Teknologi', 'Konektivitas antar sistem di/antar perusahaan?', 'single', 'direct', 0.15, 24),
('5.4', 'technology', 'Teknologi', 'Teknologi yang sudah dipakai? (boleh pilih lebih dari satu)', 'multiple', 'count', 0.15, 25),
('5.5', 'technology', 'Teknologi', 'Tingkat digitalisasi di perusahaan?', 'single', 'reverse', 0.15, 26);

-- Options for 5.1
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('5.1', 'A', 'Belum menerapkan', 0, FALSE, 1),
('5.1', 'B', 'Belum merasa perlu', 0, FALSE, 2),
('5.1', 'C', 'Sudah ada tetapi hanya untuk sistem IT', 1, FALSE, 3),
('5.1', 'D', 'Ada rencana tahun depan', 2, FALSE, 4),
('5.1', 'E', 'Sudah ada di bagian/departemen tertentu', 3, FALSE, 5),
('5.1', 'F', 'Sudah ada di semua lini operasi', 4, FALSE, 6),
('5.1', 'G', 'Sudah mendapat ISO 27001', 4, FALSE, 7);

-- Options for 5.2
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('5.2', 'A', 'Tidak ada', 0, FALSE, 1),
('5.2', 'B', 'Ada tetapi tidak terpakai', 1, FALSE, 2),
('5.2', 'C', 'Ada tetapi hanya sebagian terpakai', 2, FALSE, 3),
('5.2', 'D', 'Ada dan dipakai tetapi belum di-upgrade', 3, FALSE, 4),
('5.2', 'E', 'Ada dan terus menerus dipakai', 4, FALSE, 5);

-- Options for 5.3
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('5.3', 'A', 'Tidak ada', 0, FALSE, 1),
('5.3', 'B', 'Ada tetapi tidak terpakai', 1, FALSE, 2),
('5.3', 'C', 'Ada tetapi hanya sebagian terpakai', 2, FALSE, 3),
('5.3', 'D', 'Ada dan dipakai tetapi belum di-upgrade', 3, FALSE, 4),
('5.3', 'E', 'Ada dan terus menerus dipakai', 4, FALSE, 5);

-- Options for 5.4 (dengan exclusive option)
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('5.4', 'A', 'Computer network', 1, FALSE, 1),
('5.4', 'B', 'Databases', 1, FALSE, 2),
('5.4', 'C', 'Kecerdasan buatan', 1, FALSE, 3),
('5.4', 'D', 'Machine learning', 1, FALSE, 4),
('5.4', 'E', 'Industrial IoT', 1, FALSE, 5),
('5.4', 'F', 'Tidak ada', 0, TRUE, 6);

-- Options for 5.5
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('5.5', 'A', 'Semua bidang sudah didigitalisasi (100%)', 4, FALSE, 1),
('5.5', 'B', 'Lebih dari 75% sudah didigitalisasi', 3, FALSE, 2),
('5.5', 'C', 'Sebagian sudah didigitalisasi (50%)', 2, FALSE, 3),
('5.5', 'D', 'Baru beberapa bidang', 1, FALSE, 4),
('5.5', 'E', 'Belum menerapkan digitalisasi', 0, FALSE, 5);

-- Section 6: Factory Operation
INSERT INTO questions (id, section_id, section_title, question_text, question_type, scoring_type, section_weight, question_order) VALUES
('6.1', 'factory_operation', 'Operasi Pabrik', 'Di mana data perusahaan disimpan?', 'single', 'direct', 0.15, 27),
('6.2', 'factory_operation', 'Operasi Pabrik', 'Sistem di rantai pasok dan logistik? (boleh pilih lebih dari satu)', 'multiple', 'count', 0.15, 28),
('6.3', 'factory_operation', 'Operasi Pabrik', 'Seberapa persen proses otomasi?', 'single', 'direct', 0.15, 29),
('6.4', 'factory_operation', 'Operasi Pabrik', 'Sistem perawatan mesin yang diimplementasikan?', 'single', 'reverse', 0.15, 30);

-- Options for 6.1
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('6.1', 'A', 'Belum ada penyimpanan data', 0, FALSE, 1),
('6.1', 'B', 'Di komputer/hard disk masing-masing', 1, FALSE, 2),
('6.1', 'C', 'Di server masing-masing departemen', 2, FALSE, 3),
('6.1', 'D', 'Di pusat server internal/departemen IT', 3, FALSE, 4),
('6.1', 'E', 'Di cloud', 4, FALSE, 5);

-- Options for 6.2 (dengan exclusive option)
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('6.2', 'A', 'RFID di produk dan komponen', 1, FALSE, 1),
('6.2', 'B', 'Barcode di produk dan komponen', 1, FALSE, 2),
('6.2', 'C', 'GPS monitoring system', 1, FALSE, 3),
('6.2', 'D', 'Real time inventory control', 1, FALSE, 4),
('6.2', 'E', 'Integrasi logistik dengan vendor/supplier', 1, FALSE, 5),
('6.2', 'F', 'Tidak ada', 0, TRUE, 6);

-- Options for 6.3
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('6.3', 'A', '0%', 0, FALSE, 1),
('6.3', 'B', '25%', 1, FALSE, 2),
('6.3', 'C', '50%', 2, FALSE, 3),
('6.3', 'D', '75%', 3, FALSE, 4),
('6.3', 'E', '100%', 4, FALSE, 5);

-- Options for 6.4
INSERT INTO options (question_id, option_value, option_label, score_value, is_exclusive, display_order) VALUES
('6.4', 'A', 'Real time monitoring & OEE system', 4, FALSE, 1),
('6.4', 'B', 'Perawatan prediktif', 3, FALSE, 2),
('6.4', 'C', 'Perawatan preventif', 2, FALSE, 3),
('6.4', 'D', 'Perawatan corrective', 1, FALSE, 4),
('6.4', 'E', 'Belum ada', 0, FALSE, 5);

-- Create view for easy querying
CREATE VIEW v_assessment_summary AS
SELECT 
    a.id,
    a.company_name,
    a.industry_sector,
    a.total_score,
    a.overall_level,
    a.completed_at,
    GROUP_CONCAT(CONCAT(ps.pillar_name, ':', ps.score) SEPARATOR '; ') as pillar_scores
FROM assessments a
LEFT JOIN pillar_scores ps ON a.id = ps.assessment_id
GROUP BY a.id, a.company_name, a.industry_sector, a.total_score, a.overall_level, a.completed_at;

-- =====================================
-- USEFUL QUERIES
-- =====================================

-- Query untuk melihat distribusi level kesiapan
-- SELECT overall_level, COUNT(*) as count FROM assessments GROUP BY overall_level;

-- Query untuk melihat rata-rata skor per sektor
-- SELECT industry_sector, AVG(total_score) as avg_score, COUNT(*) as count 
-- FROM assessments GROUP BY industry_sector;

-- Query untuk melihat pertanyaan yang paling sering tidak dijawab
-- SELECT q.id, q.question_text, COUNT(r.id) as response_count 
-- FROM questions q 
-- LEFT JOIN responses r ON q.id = r.question_id 
-- GROUP BY q.id ORDER BY response_count ASC;