# INDI 4.0 Assessment Platform

Platform assessment untuk mengukur tingkat kesiapan industri di Indonesia dalam bertransformasi menuju Industri 4.0.

## Deskripsi

INDI 4.0 (Indonesia Industry 4.0 Readiness Index) adalah indeks yang dikembangkan oleh Kementerian Perindustrian Republik Indonesia untuk mengukur kesiapan industri bertransformasi menuju era Industri 4.0.

Platform ini mengimplementasikan:

- Form assessment multi-step dengan 30 pertanyaan
- 5 Pilar penilaian: Manajemen, Orang & Budaya, Produk, Teknologi, Operasi
- Perhitungan skor sesuai bobot per pilar
- Visualisasi hasil dengan Radar Chart
- Export hasil ke PDF
- Penyimpanan data ke database MySQL
- **Mutually Exclusive Options** untuk pertanyaan multiple choice

## Teknologi

- **Framework**: Next.js 14 (App Router)
- **Database**: MySQL 8.0+
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Language**: TypeScript
- **Icons**: Lucide React

## Instalasi

### Prerequisites

- Node.js 18+
- MySQL 8.0+
- npm atau yarn

### Langkah-langkah Setup

1. **Clone repository**

```bash
git clone <repository-url>
cd indi40-assessment
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup database**

```bash
# Login ke MySQL
mysql -u root -p

# Jalankan schema
mysql -u root -p < database/schema.sql
```

4. **Setup environment variables**

```bash
# Copy file .env.example ke .env.local
cp .env.example .env.local

# Edit .env.local dengan kredensial database Anda
```

5. **Test koneksi database**

```bash
npm run db:test
```

6. **Run development server**

```bash
npm run dev
```

7. **Buka browser**

```
http://localhost:3000
```

## Struktur Project

```
indi40-assessment/
├── app/
│   ├── api/
│   │   └── assessments/
│   │       └── route.ts          # API untuk submit & get assessment
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   └── globals.css               # Global styles
├── components/
│   ├── AssessmentForm.tsx        # Form component dengan mutually exclusive logic
│   └── ResultsDisplay.tsx        # Display hasil & visualisasi
├── lib/
│   ├── db.ts                     # MySQL connection
│   ├── types.ts                  # TypeScript interfaces
│   ├── questions.ts              # Data pertanyaan INDI 4.0
│   └── calculations.ts           # Logic perhitungan skor
├── database/
│   └── schema.sql                # Database schema
├── .env.local                    # Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── README.md
```

## Fitur Utama

### 1. Mutually Exclusive Options

Pada pertanyaan multiple choice, jika ada opsi seperti "Tidak ada", "Belum ada", atau "Belum mengumpulkan data", maka:

- Jika dipilih, otomatis **unselect** semua opsi lain
- Jika opsi lain dipilih, otomatis **unselect** opsi eksklusif

### 2. Perhitungan Skor

Sesuai dengan dokumen INDI 4.0:

- Manajemen & Organisasi: **25%**
- Orang & Budaya: **30%**
- Produk & Layanan: **15%**
- Teknologi: **15%**
- Operasi Pabrik: **15%**

### 3. Level Kesiapan

- **Level 0**: Belum Siap
- **Level 1**: Kesiapan Awal
- **Level 2**: Kesiapan Sedang
- **Level 3**: Kesiapan Matang
- **Level 4**: Sudah Menerapkan

## Database Schema

### Tables:

1. **assessments** - Data utama assessment
2. **questions** - Pertanyaan assessment
3. **options** - Opsi jawaban
4. **responses** - Jawaban responden
5. **pillar_scores** - Skor per pilar
6. **audit_log** - Log aktivitas

## Development

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm run start
```

### Linting

```bash
npm run lint
```

## Troubleshooting

### Database Connection Error

```bash
# Pastikan MySQL sudah running
sudo systemctl status mysql

# Test koneksi
npm run db:test
```

### Port sudah digunakan

```bash
# Ubah port di package.json
"dev": "next dev -p 3001"
```
