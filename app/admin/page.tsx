'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Download, Search, Calendar, Building2, BarChart3 } from 'lucide-react';
import ResultsDisplay from '@/components/ResultsDisplay';
import type { AssessmentResults } from '@/lib/types';

interface AssessmentListItem {
  id: number;
  company_name: string;
  industry_sector: string;
  total_score: number;
  overall_level: number;
  completed_at: string;
}

export default function AdminDashboard() {
  const [assessments, setAssessments] = useState<AssessmentListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentResults | null>(null);
  const [viewingDetail, setViewingDetail] = useState(false);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const response = await fetch('/api/assessments?limit=100');
      const data = await response.json();
      
      if (data.success) {
        setAssessments(data.data.assessments);
      }
    } catch (error) {
      console.error('Error fetching assessments:', error);
      alert('Gagal memuat data assessment');
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = async (assessmentId: number) => {
    try {
      const response = await fetch(`/api/assessments/${assessmentId}`);
      const data = await response.json();
      
      if (data.success) {
        setSelectedAssessment(data.results);
        setViewingDetail(true);
      }
    } catch (error) {
      console.error('Error fetching assessment details:', error);
      alert('Gagal memuat detail assessment');
    }
  };

  const getLevelColor = (level: number): string => {
    const colors: Record<number, string> = {
      0: 'bg-red-500',
      1: 'bg-orange-500',
      2: 'bg-yellow-500',
      3: 'bg-green-500',
      4: 'bg-blue-500',
    };
    return colors[level] || 'bg-gray-500';
  };

  const getLevelText = (level: number): string => {
    const texts: Record<number, string> = {
      0: 'Belum Siap',
      1: 'Kesiapan Awal',
      2: 'Kesiapan Sedang',
      3: 'Kesiapan Matang',
      4: 'Sudah Menerapkan',
    };
    return texts[level] || 'N/A';
  };

  const filteredAssessments = assessments.filter((assessment) =>
    assessment.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assessment.industry_sector?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (viewingDetail && selectedAssessment) {
    return (
      <ResultsDisplay
        results={selectedAssessment}
        onNewAssessment={() => {
          setViewingDetail(false);
          setSelectedAssessment(null);
        }}
        onExportPDF={() => {}}
        isAdminView={true}
      />
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Admin Dashboard - INDI 4.0
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {assessments.length}
                </div>
                <div className="text-sm text-gray-600">Total Assessment</div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari berdasarkan nama perusahaan atau sektor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Assessment List */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Memuat data...</p>
            </div>
          ) : filteredAssessments.length === 0 ? (
            <div className="p-8 text-center">
              <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">
                {searchTerm
                  ? 'Tidak ada hasil yang ditemukan'
                  : 'Belum ada assessment yang tersedia'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-linear-to-r from-blue-600 to-indigo-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      No
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Perusahaan
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Sektor
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Skor Total
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Level
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAssessments.map((assessment, index) => (
                    <tr
                      key={assessment.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-gray-800">
                            {assessment.company_name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {assessment.industry_sector || '-'}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-lg font-bold text-blue-600">
                          {assessment.total_score.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className={`${getLevelColor(
                              assessment.overall_level
                            )} w-3 h-3 rounded-full`}
                          />
                          <span className="text-sm font-medium text-gray-700">
                            Level {assessment.overall_level}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 text-center mt-1">
                          {getLevelText(assessment.overall_level)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {new Date(assessment.completed_at).toLocaleDateString(
                            'id-ID',
                            {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            }
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(assessment.completed_at).toLocaleTimeString(
                            'id-ID',
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => viewDetails(assessment.id)}
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md hover:shadow-lg"
                        >
                          <Eye className="w-4 h-4" />
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>© 2026 INDI 4.0 Admin Dashboard - Total Quality Indonesia</p>
        </div>
      </div>
    </div>
  );
}