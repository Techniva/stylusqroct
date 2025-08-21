"use client";

import React, { useState, useEffect } from 'react';
import { QrCode, Search, Filter, BarChart3, Eye, EyeOff, RefreshCw, Download, Calendar, Users, Activity } from 'lucide-react';

interface QRCode {
  id: number;
  activeLink: string;
  originalLink: string;
  qrType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    fullName: string;
    email: string;
  };
  scanCount: number;
  downloadCount: number;
  lastScannedAt?: string;
  logoPath?: string;
  customSettings?: any;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface QRCodeStats {
  totalQRCodes: number;
  activeQRCodes: number;
  inactiveQRCodes: number;
  totalScans: number;
  totalDownloads: number;
  dynamicQRCodes: number;
  staticQRCodes: number;
  qrTypes: {
    [key: string]: number;
  };
}

export default function AdminQRCodes() {
  const [qrcodes, setQRCodes] = useState<QRCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  const [stats, setStats] = useState<QRCodeStats | null>(null);

  useEffect(() => {
    fetchQRCodes();
    fetchStats();
  }, [pagination.page, searchTerm, statusFilter, typeFilter]);

  const fetchQRCodes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(typeFilter && { type: typeFilter })
      });

      const response = await fetch(`/api/admin/qrcodes?${params}`);
      if (response.ok) {
        const data = await response.json();
        console.log('QR codes data:', data);
        setQRCodes(data.qrcodes || []);
        setPagination(data.pagination || { page: 1, limit: 20, total: 0, pages: 0 });
      } else {
        console.error('Failed to fetch QR codes:', response.status);
      }
    } catch (error) {
      console.error('Error fetching QR codes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/qrcodes/stats');
      if (response.ok) {
        const data = await response.json();
        console.log('Stats data:', data);
        setStats(data.stats || null);
      } else {
        console.error('Failed to fetch stats:', response.status);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleQRCodeAction = async (qrCodeId: number, action: string) => {
    try {
      const response = await fetch('/api/admin/qrcodes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCodeId, action })
      });

      if (response.ok) {
        fetchQRCodes();
        fetchStats();
        alert('Action completed successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Action failed');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const getQRTypeIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'website': <QrCode className="w-4 h-4" />,
      'text': <QrCode className="w-4 h-4" />,
      'email': <QrCode className="w-4 h-4" />,
      'phone': <QrCode className="w-4 h-4" />,
      'wifi': <QrCode className="w-4 h-4" />,
      'facebook': <QrCode className="w-4 h-4" />,
      'instagram': <QrCode className="w-4 h-4" />,
      'linkedin': <QrCode className="w-4 h-4" />,
      'youtube': <QrCode className="w-4 h-4" />,
      'pinterest': <QrCode className="w-4 h-4" />,
      'whatsapp': <QrCode className="w-4 h-4" />,
      'google-form': <QrCode className="w-4 h-4" />,
      'picture': <QrCode className="w-4 h-4" />,
      'trackable': <QrCode className="w-4 h-4" />
    };
    return icons[type] || <QrCode className="w-4 h-4" />;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
        Active
      </span>
    ) : (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        <div className="w-2 h-2 bg-red-400 rounded-full mr-1"></div>
        Inactive
      </span>
    );
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#063970]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 px-4">
      {/* Page Header */}
      <div className="mb-2">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold text-gray-900">QR Codes Management</h1>
          </div>
          <button
            onClick={() => { fetchQRCodes(); fetchStats(); }}
            className="flex items-center space-x-2 px-2 py-2 bg-[#063970] text-white rounded-full hover:bg-[#052c5c] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && stats.totalQRCodes !== undefined && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <QrCode className="w-4 h-4 text-blue-600" />
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-gray-600">Total QR Codes</p>
                <p className="text-lg font-bold text-gray-900">{stats.totalQRCodes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="w-4 h-4 text-green-600" />
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-gray-600">Active QR Codes</p>
                <p className="text-lg font-bold text-gray-900">{stats.activeQRCodes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-4 h-4 text-purple-600" />
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-gray-600">Total Scans</p>
                <p className="text-lg font-bold text-gray-900">{stats.totalScans}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Download className="w-4 h-4 text-orange-600" />
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-gray-600">Total Downloads</p>
                <p className="text-lg font-bold text-gray-900">{stats.totalDownloads}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search QR codes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-[#063970] focus:border-[#063970]"
            />
          </div>
          
          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#063970] focus:border-[#063970]"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          {/* Type Filter */}
          <div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#063970] focus:border-[#063970]"
            >
              <option value="">All Types</option>
              <option value="website">Website</option>
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="wifi">WiFi</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
              <option value="pinterest">Pinterest</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="google-form">Google Form</option>
              <option value="picture">Picture</option>
              <option value="trackable">Trackable</option>
            </select>
          </div>
          
          {/* Total Count */}
          <div className="text-sm text-gray-500 text-center md:text-left">
            Total: {pagination.total} QR codes
          </div>
        </div>
      </div>

      {/* QR Codes Table */}
      <div className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  QR Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Id
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Analytics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center">
                      <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                      Loading QR codes...
                    </div>
                  </td>
                </tr>
              ) : qrcodes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No QR codes found
                  </td>
                </tr>
              ) : (
                (qrcodes || []).map((qr) => (
                  <tr key={qr.id} className="hover:bg-gray-50">
                    <td className="px-6 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 bg-gray-200 rounded flex items-center justify-center">
                            <QrCode className="w-6 h-6 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            QR-{qr.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getQRTypeIcon(qr.qrType || 'website')}
                        <span className="ml-2 text-sm text-gray-900 capitalize">
                          {(qr.qrType || 'website').replace('-', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{qr.user?.id || 'Unknown'}</div>                         
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(qr.isActive)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            {qr.scanCount || 0} scans
                          </span>
                          <span className="flex items-center">
                            <Download className="w-4 h-4 mr-1" />
                            {qr.downloadCount || 0} downloads
                          </span>
                        </div>
                        {qr.lastScannedAt && (
                          <div className="text-xs text-gray-500 mt-1">
                            Last scanned: {formatDate(qr.lastScannedAt)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(qr.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {qr.isActive ? (
                          <button
                            onClick={() => handleQRCodeAction(qr.id, 'deactivate')}
                            className="text-red-600 hover:text-red-900 flex items-center transition-colors"
                          >
                            <EyeOff className="w-4 h-4 mr-1" />
                            Deactivate
                          </button>
                        ) : (
                          <button
                            onClick={() => handleQRCodeAction(qr.id, 'activate')}
                            className="text-green-600 hover:text-green-900 flex items-center transition-colors"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Activate
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.pages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span>
                  {' '}to{' '}
                  <span className="font-medium">
                    {Math.min(pagination.page * pagination.limit, pagination.total)}
                  </span>
                  {' '}of{' '}
                  <span className="font-medium">{pagination.total}</span>
                  {' '}results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        page === pagination.page
                          ? 'z-10 bg-[#063970] border-[#063970] text-white'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 