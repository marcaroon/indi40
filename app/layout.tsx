
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'INDI 4.0 Assessment - Indonesia Industry 4.0 Readiness Index',
  description: 'Platform assessment untuk mengukur tingkat kesiapan industri Indonesia dalam bertransformasi menuju Industri 4.0',
  keywords: 'INDI 4.0, Industry 4.0, Assessment, Indonesia, Manufacturing, Digital Transformation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}