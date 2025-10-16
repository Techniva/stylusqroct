"use client";
import React, { useState, useEffect, useRef } from "react";
import { RefreshCw, Lock, QrCode, Edit3, Download, ExternalLink, Trash2, BarChart2 } from "lucide-react";
import { formatQRDataToURL } from '../../../lib/qrDataUtils';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyQRReportPDF from './QRReportPDF';
import QrStatusToggle from './QrStatusToggle';
import router from "next/router";
import { useRouter } from "next/navigation";

interface UserData {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

interface QRCode {
  id: number;
  qrData: any; // JSON data for QR code
  lastLink?: string;
  uniqueCode: string;
  serverLink?: string;
  cornerShape: string;
  eyeShape: string;
  qrShape: string;
  foregroundColor: string;
  backgroundColor: string;
  dotColor?: string;
  cornerColor?: string;
  eyeColor?: string;
  updateCount: number; // Added updateCount
  createdAt: string;
  updatedAt: string;
  userId?: number;
  user?: {
    id: number;
    fullName: string;
    email: string;
  };
  qrCodeImage?: string;
  qrCodeImagePath?: string; // Added for new rendering
  qrStatus: boolean; // true = active, false = deactive
}

interface QRStats {
  last7Days: { [date: string]: number };
  last6Months: { [month: string]: number };
  devices?: { [os: string]: number };
}

interface ScanLocation {
  city: string;
  country: string;
  region: string;
  scanCount: number;
  displayName: string;
}

interface ScanLocationsData {
  locations: ScanLocation[];
  topLocations: ScanLocation[];
  bottomLocations: ScanLocation[];
  totalScans: number;
}

interface MyQRCodesProps {
  url: string;
  onUrlChange: (url: string) => void;
  user?: UserData | null;
  onStatsChange?: (stats: { totalScans: number; totalUpdates: number }) => void;
}

const MyQRCodes: React.FC<MyQRCodesProps> = ({ url, user = null, onStatsChange }) => {
  // All hooks at the top
  const [qrCodes, setQrCodes] = useState<QRCode[]>([]);
  const [selectedQRId, setSelectedQRId] = useState<number | null>(null);
  const [newUrl, setNewUrl] = useState(url);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingQRId, setEditingQRId] = useState<number | null>(null);
  const [editUrl, setEditUrl] = useState("");
  // Track checked state for each QR code
  const [checked, setChecked] = useState<{ [id: number]: boolean }>({});
  const [deletingId, setDeletingId] = useState<number | null>(null);
  // Modal for editing
  const [showModal, setShowModal] = useState(false);
  const [openAnalyticsId, setOpenAnalyticsId] = useState<number | null>(null);
  const [qrStats, setQrStats] = useState<{ [qrId: number]: QRStats }>({});
  const [qrStatsLoading, setQrStatsLoading] = useState<{ [qrId: number]: boolean }>({});
  // Add state for scanCounts and smooth analytics panel
  // Remove scanCounts state and bulk fetch, add per-QR scan count state
  const [qrScanCounts, setQrScanCounts] = useState<{ [qrId: number]: number }>({});
  const [qrScanLocations, setQrScanLocations] = useState<{ [qrId: number]: ScanLocationsData }>({});
  const [qrScanLocationsLoading, setQrScanLocationsLoading] = useState<{ [qrId: number]: boolean }>({});
  const [visibleAnalyticsId, setVisibleAnalyticsId] = useState<number | null>(null);
  const analyticsTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [qrToDelete, setQrToDelete] = useState<QRCode | null>(null);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const QR_CODES_PER_PAGE = 4;
  const totalPages = Math.ceil(qrCodes.length / QR_CODES_PER_PAGE);
  const paginatedQRCodes = qrCodes.slice((currentPage - 1) * QR_CODES_PER_PAGE, currentPage * QR_CODES_PER_PAGE);
  // Add state for DBC loading
  const [isDBCLoading, setIsDBCLoading] = useState(false);
  const router = useRouter(); // ✅ inside component
  
  useEffect(() => {
    // Reset to first page if QR codes change and current page is out of range
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [qrCodes, totalPages]);

  // Handle edit button click
  const handleEditClick = (qr: QRCode) => {
    setEditingQRId(qr.id);
    setEditUrl("");
    setShowModal(true);
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingQRId(null);
    setEditUrl("");
    setShowModal(false);
  };

  // Handle save edit
  const handleSaveEdit = async (qr: QRCode) => {
    if (!qr) return;
    setIsSaving(true);
    setMessage("");
  
    try {
      // Determine QR type
      const currentQRData = qr.qrData;
      const qrType = currentQRData?.type || 'website';
  
      // Create new QR data object
      const newQRData = {
        type: qrType,
        url: editUrl
      };
  
      // 1️⃣ Update QR code
      const response = await fetch(`/api/qr/${qr.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          qrType: qrType,
          qrData: newQRData,
          metadata: {
            updatedFrom: 'web-interface',
            originalDataType: currentQRData?.type
          }
        }),
      });
  
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to update QR code');
      }
  
      const updated = await response.json();
  
      // Update QR codes state
      setQrCodes((prev) =>
        prev.map((item) =>
          item.id === qr.id
            ? { ...item, qrData: updated.qrData, lastLink: updated.lastLink, updateCount: updated.updateCount, updatedAt: updated.updatedAt }
            : item
        )
      );
  
      // 2️⃣ If it's a Digital Business Card, store uniqueCode
      if (qrType === 'businesscard' && user?.id) {
        try {
          const dbcRes = await fetch('/api/digital-business-cards/store-unique-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userId: user.id,
              uniqueCode: updated.qrData.uniqueCode,
            }),
          });
  
          if (!dbcRes.ok) {
            console.warn('Failed to store uniqueCode in Digital Business Card table');
          }
        } catch (err) {
          console.error('Error storing uniqueCode:', err);
        }
      }
  
      // Update stats in parent
      if (onStatsChange) {
        const totalScans = qrCodes.reduce((sum, item) => sum + (qrScanCounts[item.id] ?? 0), 0);
        const totalUpdates = qrCodes.reduce((sum, item) => sum + (item.updateCount || 0), 0) + 1;
        onStatsChange({ totalScans, totalUpdates });
      }
  
      setEditingQRId(null);
      setEditUrl("");
      setShowModal(false);
  
    } catch (error: any) {
      setMessage(error.message || 'Failed to update QR code');
    }
  
    setIsSaving(false);
  };
  

  // Download QR image
  const handleDownload = async (qr: QRCode) => {
    try {
      const res = await fetch(`/api/qr/download/${qr.id}`);
      if (!res.ok) return;
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-code-${qr.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      // Optionally: trigger analytics refresh here if needed
    } catch (e) {
      // handle error
    }
  };

  // Test QR (open URL from qrData in new tab)
  const handleTestLink = (qr: QRCode) => {
    try {
      const url = formatQRDataToURL(qr.qrData);
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  // Replace handleDelete to show modal
  const handleDeleteClick = (qr: QRCode) => {
    setQrToDelete(qr);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!qrToDelete) return;
    setDeletingId(qrToDelete.id);
    setShowDeleteModal(false);
    try {
      const response = await fetch(`/api/qr/${qrToDelete.id}`, { method: 'DELETE' });
      if (response.ok) {
        setQrCodes((prev) => prev.filter((item) => item.id !== qrToDelete.id));
      } else {
        const err = await response.json();
        setMessage(err.error || 'Failed to delete QR code');
      }
    } catch (error) {
      setMessage('Failed to delete QR code');
    }
    setDeletingId(null);
    setQrToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setQrToDelete(null);
  };


  // If user is not logged in, show login prompt
  if (!user) {
    return (
      <div className="bg-white rounded-xl shadow p-8 space-y-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Lock className="w-8 h-8 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-700">Authentication Required</h2>
        </div>
        <p className="text-gray-600 mb-6">
          You need to be logged in to access the My QR Codes feature. This allows you to manage and update your saved QR codes.
        </p>
      </div>
    );
  }

  // Load existing QR codes
  const loadQRCodes = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      let currentUser: UserData | null = user;
      if (!currentUser) {
        const userData = localStorage.getItem('user');
        if (userData && userData.trim() !== '') {
          try {
            currentUser = JSON.parse(userData);
          } catch (error) {
            console.error('Error parsing user data:', error);
            localStorage.removeItem('user');
            currentUser = null;
          }
        } else {
          currentUser = null;
        }
      }
      if (!currentUser) {
        setMessage("User not found. Please login again.");
        setQrCodes([]);
        setQrScanCounts({});
        return;
      }
      if (!currentUser.id || isNaN(currentUser.id)) {
        console.error('User ID is missing or invalid:', currentUser);
        setMessage("Invalid user data. Please login again.");
        setQrCodes([]);
        setQrScanCounts({});
        return;
      }
      const url = `/api/qr?userId=${currentUser.id}`;
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setQrCodes(data);
        setMessage(data.length === 0 ? "No QR codes found for your account" : "");
        // Fetch scan counts for these QR codes
        if (data.length > 0 && currentUser.id && !isNaN(currentUser.id)) {
          const scanRes = await fetch(`/api/qr/scan-counts?userId=${currentUser.id}`);
          if (scanRes.ok) {
            const scanCountsData = await scanRes.json();
            setQrScanCounts(scanCountsData);
          } else {
            setQrScanCounts({});
          }
        } else {
          setQrScanCounts({});
        }
      } else {
        let errorData;
        let responseText = '';
        try {
          errorData = await response.json();
        } catch (parseError) {
          try {
            responseText = await response.text();
          } catch (textError) {
            responseText = 'Unable to read response';
          }
          errorData = { error: 'Unknown error', status: response.status };
        }
        if (!errorData || typeof errorData !== 'object' || Object.keys(errorData).length === 0) {
          errorData = { error: 'Unknown error', status: response.status };
        }
        setMessage(`Failed to load QR codes: ${errorData.error || errorData.message || errorData.details || responseText || 'Unknown error'}`);
        setQrCodes([]);
        setQrScanCounts({});
      }
    } catch (error) {
      setMessage(`Failed to load QR codes: ${error instanceof Error ? error.message : 'Network error'}`);
      setQrCodes([]);
      setQrScanCounts({});
    }
    setIsLoading(false);
  };

  const fetchScanLocations = async (qrId: number) => {
    if (qrScanLocationsLoading[qrId]) return; // Prevent duplicate requests
    
    setQrScanLocationsLoading(prev => ({ ...prev, [qrId]: true }));
    
    try {
      const response = await fetch(`/api/qr/scan-locations?qrCodeId=${qrId}`);
      if (response.ok) {
        const data = await response.json();
        setQrScanLocations(prev => ({ ...prev, [qrId]: data }));
      } else {
        console.error('Failed to fetch scan locations for QR:', qrId);
        setQrScanLocations(prev => ({ 
          ...prev, 
          [qrId]: { locations: [], topLocations: [], bottomLocations: [], totalScans: 0 } 
        }));
      }
    } catch (error) {
      console.error('Error fetching scan locations:', error);
      setQrScanLocations(prev => ({ 
        ...prev, 
        [qrId]: { locations: [], topLocations: [], bottomLocations: [], totalScans: 0 } 
      }));
    } finally {
      setQrScanLocationsLoading(prev => ({ ...prev, [qrId]: false }));
    }
  };

  // Load QR codes on component mount
  useEffect(() => {
    loadQRCodes();
  }, []);

  // Reload QR codes when user changes
  useEffect(() => {
    if (user) {
      loadQRCodes();
    } else {
      setQrCodes([]);
      setQrScanCounts({});
    }
  }, [user]);

  // Update newUrl when selected QR changes
  useEffect(() => {
    if (selectedQRId) {
      const selectedQR = qrCodes.find(qr => qr.id === selectedQRId);
      if (selectedQR) {
        setNewUrl(formatQRDataToURL(selectedQR.qrData));
      }
    }
  }, [selectedQRId, qrCodes]);

  // Fetch stats for a QR code when analytics is opened
  useEffect(() => {
    if (openAnalyticsId) {
      if (!qrStats[openAnalyticsId]) {
        setQrStatsLoading(prev => ({ ...prev, [openAnalyticsId]: true }));
        fetch(`/api/qr/stats?qr_code_id=${openAnalyticsId}`)
          .then(res => res.ok ? res.json() : Promise.reject())
          .then(data => {
            setQrStats(prev => ({ ...prev, [openAnalyticsId]: { last7Days: data.last7Days || {}, last6Months: data.last6Months || {}, devices: data.devices || {} } }));
          })
          .catch(() => {
            setQrStats(prev => ({ ...prev, [openAnalyticsId]: { last7Days: {}, last6Months: {}, devices: {} } }));
          })
          .finally(() => {
            setQrStatsLoading(prev => ({ ...prev, [openAnalyticsId]: false }));
          });
      }
    }
  }, [openAnalyticsId]);

  // Fetch scan counts from ScanLog table
  useEffect(() => {
    if (user) {
      fetch(`/api/qr/scan-counts?userId=${user.id}`)
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => setQrScanCounts(data))
        .catch(() => setQrScanCounts({}));
    }
  }, [user]);

  // Fetch scan count for each QR code when qrCodes change
  useEffect(() => {
    if (qrCodes.length > 0) {
      qrCodes.forEach(qr => {
        if (qr && qr.id && !(qr.id in qrScanCounts)) {
          fetch(`/api/qr/scan-counts?qrCodeId=${qr.id}`)
            .then(res => res.ok ? res.json() : Promise.reject())
            .then(data => {
              setQrScanCounts(prev => ({ ...prev, [qr.id]: data[qr.id] ?? 0 }));
            })
            .catch(() => {
              setQrScanCounts(prev => ({ ...prev, [qr.id]: 0 }));
            });
        }
      });
    }
  }, [qrCodes]);

  // Smooth analytics panel closing
  useEffect(() => {
    if (openAnalyticsId !== null) {
      setVisibleAnalyticsId(openAnalyticsId);
      if (analyticsTimeout.current) clearTimeout(analyticsTimeout.current);
    } else if (visibleAnalyticsId !== null) {
      analyticsTimeout.current = setTimeout(() => setVisibleAnalyticsId(null), 400); // match transition duration
    }
    return () => { if (analyticsTimeout.current) clearTimeout(analyticsTimeout.current); };
  }, [openAnalyticsId]);

  // Fetch scan locations when analytics is opened
  useEffect(() => {
    if (openAnalyticsId !== null && !qrScanLocations[openAnalyticsId]) {
      fetchScanLocations(openAnalyticsId);
    }
  }, [openAnalyticsId]);

  // ... (rest of the render logic, unchanged)
  
  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <QrCode className="w-6 h-6 text-[#063970]" />
          <h2 className="text-xl font-semibold text-gray-800">My QR Codes</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={loadQRCodes}
            disabled={isLoading}
            className="flex text-sm items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      {/* QR Codes List and rest of the UI logic remains unchanged */}
      {qrCodes.length === 0 && !isLoading ? (
        <div className="text-center py-8 text-gray-500">
          <QrCode className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="text-lg font-medium">
            No QR codes have been created yet.
          </p>
          <p className="text-sm mb-4">
            Start by creating your first QR code to manage and track them here.
          </p>
        </div>
      ) : (
        <>
        <div className="space-y-5">
          {paginatedQRCodes.map((qr) => (
            <div
              key={qr.id}
              className="relative border border-gray-300 rounded-xl bg-white py-2 w-full max-w-full"
              style={{ maxHeight: openAnalyticsId === qr.id || visibleAnalyticsId === qr.id ? '1200px' : '150px' }}
            >
              <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-sm text-gray-700" style={{marginLeft: 12}}>
                QR No. {qrCodes.length - ((currentPage - 1) * QR_CODES_PER_PAGE + paginatedQRCodes.findIndex(q => q.id === qr.id))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center bg-white rounded-xl px-4 border-0 relative transition-all duration-300 overflow-visible">
                {/* Column 1: QR Image & Info */}
                <div className="flex flex-row items-center min-w-[180px]">
                  <img
                    src={qr.qrCodeImagePath || '/placeholder.png'}
                    alt="QR Code"
                    className="w-16 h-16 rounded-lg border border-gray-200"
                  />
                  <div className="flex flex-col justify-center pl-4">
                    <div className="text-xs text-orange-600 font-semibold mb-0.5">QR id: {qr.id}</div>
                    <div className="flex items-center text-xs text-gray-500 mb-0.5">
                      <span>Data Type: {qr.qrData.type}</span>
                    </div>
                    <div className="text-[11px] text-gray-400">
                      <div>Created: {new Date(qr.createdAt).toLocaleDateString()}</div>
                      <div>Modified: {new Date(qr.updatedAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
                {/* Column 2: Links + Scan/Update (split into 2 sub-columns) */}
                <div className="flex flex-row w-full md:w-auto">
                  {/* Sub-column 1: Links */}
                  <div className="min-w-[140px] hidden md:flex flex-col">
                    <div className="text-xs text-orange-600 mb-1">Type: Dynamic QR</div>
                    <div className="flex flex-col gap-1">
                      <a
                        href={formatQRDataToURL(qr.qrData)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-700 font-semibold no-underline hover:no-underline flex items-center gap-1"
                      >
                        <span>🌐</span>
                        <span>Active Link</span>
                      </a>
                      {qr.lastLink && (
                        <a
                          href={qr.lastLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-gray-500 no-underline hover:no-underline flex items-center gap-1"
                        >
                          <span>🔗</span>
                          <span>Previous Link</span>
                        </a>
                      )}
                      <a
                        href={qr.serverLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-700 no-underline hover:no-underline flex items-center gap-1"
                      >
                        <span>🌐</span>
                        <span>Dynamic Link</span>
                      </a>
                    </div>
                  </div>
                  {/* Sub-column 2: Scan/Update (md+ only) */}
                  <div className="hidden md:flex flex-col items-center justify-center ml-4">
                    <div className="flex flex-row items-center gap-4">
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-gray-900 leading-none">{qrScanCounts[qr.id] ?? 0}</span>
                        <span className="text-xs text-orange-600 font-medium leading-none">Scans</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold text-gray-900 leading-none">{qr.updateCount}</span>
                        <span className="text-xs text-blue-600 font-medium leading-none">Updates</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Column 3: Toggle (md+ only) */}
                <div className="hidden md:flex flex-col items-center justify-center ml-4">
                  <QrStatusToggle qr={qr} setQrCodes={setQrCodes} />
                </div>
                {/* Column 4: Action buttons (always visible) */}
                <div className="flex flex-row items-center justify-center w-full md:w-auto ">
                  <button
                    title="Analytics"
                    className={`w-10 h-10 flex items-center justify-center rounded-full border transition ${openAnalyticsId === qr.id ? 'bg-[#063970] text-white border-[#063970]' : 'border-[#063970] text-[#063970] hover:bg-[#063970] hover:text-white'}`}
                    onClick={() => setOpenAnalyticsId(openAnalyticsId === qr.id ? null : qr.id)}
                  >
                    <BarChart2 className="w-5 h-5" />
                  </button>
                  <button
                    title="Download"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[#063970] text-[#063970] hover:bg-[#063970] hover:text-white transition ml-2"
                    onClick={() => handleDownload(qr)}
                  >
                    <Download className="w-5 h-5" />
                  </button>
                  <button
                    title="Edit"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[#063970] text-[#063970] hover:bg-[#063970] hover:text-white transition ml-2"
                    onClick={() => handleEditClick(qr)}
                    disabled={editingQRId !== null && editingQRId !== qr.id}
                  >
                    <Edit3 className="w-5 h-5" />
                  </button>
                  <button
                    title="Test Link"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[#063970] text-[#063970] hover:bg-[#063970] hover:text-white transition ml-2"
                    onClick={() => handleTestLink(qr)}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </button>
                  <button
                    title="Delete"
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition ml-2"
                    onClick={() => handleDeleteClick(qr)}
                    disabled={deletingId === qr.id}
                  >
                    {deletingId === qr.id ? (
                      <span className="w-5 h-5 flex items-center justify-center animate-spin">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity=".25"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
                      </span>
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              {/* Analytics Box */}
              {(visibleAnalyticsId === qr.id) && (
                <div className={`transition-all duration-700 ${openAnalyticsId === qr.id ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'} mx-4 py-2 my-2 border-t border-gray-200 relative`}
                >
                  <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
                    onClick={() => setOpenAnalyticsId(null)}
                    aria-label="Close Analytics"
                  >
                    &times;
                  </button>
                  <h4 className="text-sm font-semibold mb-2 text-[#063970]">QR Analytics</h4>
                  <div className="flex flex-row gap-4 flex-wrap w-full">
                    {/* Scan Activity (Last 7 Days) */}
                    <div className="relative border border-gray-300 rounded-xl bg-white px-4 pt-4 pb-2 flex-1 min-w-[220px] max-w-[350px]">
                    {/* Floating label positioned at top left */}
                    <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-sm text-gray-700">
                      Scan Activity (Last 7 Days)
                    </div>
                    
                      <div className="flex items-end gap-2 h-32">
                        {qrStatsLoading[qr.id] ? (
                          <div className="w-full text-xs text-center text-gray-400">Loading...</div>
                        ) : qrStats[qr.id] && Object.keys(qrStats[qr.id].last7Days).length > 0 ? (
                          Object.entries(qrStats[qr.id].last7Days).map(([label, value]) => {
                            const max = Math.max(...Object.values(qrStats[qr.id].last7Days), 1);
                            return (
                              <div key={label} className="flex flex-col items-center flex-1">
                                <div
                                  className="w-4 rounded-t bg-blue-400"
                                  style={{ height: `${Math.min((value / max) * 84, 84)}px` }}
                                ></div>
                                <span className="text-[10px] text-gray-400 mt-1">
                                  {label.slice(5)}
                                </span>
                                <span className="text-[10px] text-gray-700 font-semibold mt-0.5">{value}</span>
                              </div>
                            );
                          })
                        ) : (
                          <div className="w-full text-center text-gray-400">No data</div>
                        )}
                      </div>
                    </div>
                    {/* Yearly (Last 6 Months) */}
                   
                      <div className="relative border border-gray-300 rounded-xl bg-white px-4 pt-4 pb-2 flex-1 min-w-[220px] max-w-[350px]">
                      {/* Floating label positioned at top left */}
                      <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-sm text-gray-700">
                        Yearly (Last 6 Months)
                      </div>
                      <div className="flex flex-col items-end">
                        {qrStatsLoading[qr.id] ? (
                          <div className="w-full text-xs text-center text-gray-400">Loading...</div>
                        ) : qrStats[qr.id] && Object.keys(qrStats[qr.id].last6Months).length > 0 ? (
                          <>
                            <svg width="220" height="96" viewBox="0 0 240 66">
                              <polyline
                                fill="none"
                                stroke="#22c55e"
                                strokeWidth="3"
                                points={
                                  Object.values(qrStats[qr.id].last6Months)
                                    .map((v, i) => {
                                      const max = Math.max(...Object.values(qrStats[qr.id].last6Months), 1);
                                      const min = Math.min(...Object.values(qrStats[qr.id].last6Months));
                                      const y = 80 - ((v - min) / (max - min || 1)) * 60;
                                      const x = 20 + i * 40;
                                      return `${x},${y}`;
                                    })
                                    .join(' ')
                                }
                              />
                              {Object.values(qrStats[qr.id].last6Months).map((v, i) => {
                                const max = Math.max(...Object.values(qrStats[qr.id].last6Months), 1);
                                const min = Math.min(...Object.values(qrStats[qr.id].last6Months));
                                const y = 80 - ((v - min) / (max - min || 1)) * 60;
                                const x = 20 + i * 40;
                                return (
                                  <circle key={i} cx={x} cy={y} r="4" fill="#22c55e" stroke="#fff" strokeWidth="2" />
                                );
                              })}
                            </svg>
                            <div className="flex w-full justify-between text-[10px] text-gray-400">
                              {Object.keys(qrStats[qr.id].last6Months).map(month => (
                                <span key={month} className="w-8 text-center">{month}</span>
                              ))}
                            </div>
                          </>
                        ) : (
                          <div className="w-full text-center text-gray-400">No data</div>
                        )}
                      </div>
                    </div>
                    {/* Location Scrollable Section */}
                    <div className="relative border border-gray-300 rounded-xl bg-white px-4 pt-4 pb-2 flex-1 min-w-[220px] max-w-[350px]">
                      {/* Floating label positioned at top left */}
                      <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-sm text-gray-700">
                        Scanned Places (scans)
                      </div>
                      <div className="text-xs font-semibold text-gray-700 mb-1">All Places</div>
                      <div className="max-h-24 overflow-y-auto pr-2">
                        {qrScanLocationsLoading[qr.id] ? (
                          <div className="text-xs text-gray-500 text-center py-2">Loading locations...</div>
                        ) : qrScanLocations[qr.id]?.locations?.length > 0 ? (
                          <ul className="text-xs text-gray-700 space-y-1">
                            {qrScanLocations[qr.id].locations.map((location, index) => (
                              <li key={index}>
                                {location.displayName} <span className="text-gray-400">({location.scanCount})</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <div className="text-xs text-gray-500 text-center py-2">No scan location data available</div>
                        )}
                      </div>
                    </div>
                   {/* Performance Section */}
                   <div className="relative border border-gray-300 rounded-xl bg-white px-4 pt-4 pb-2 flex-1 min-w-[220px] max-w-[350px]">
                      {/* Floating label positioned at top left */}
                      <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-sm text-gray-700">
                        Performance (scans)
                      </div>
                     <div className="grid grid-cols-2 gap-4">
                       <div>
                         <div className="text-xs font-semibold text-green-700 mb-1">Top 3 Places</div>
                         {qrScanLocationsLoading[qr.id] ? (
                           <div className="text-xs text-gray-500 text-center py-2">Loading...</div>
                         ) : qrScanLocations[qr.id]?.topLocations?.length > 0 ? (
                           <ul className="text-xs text-green-700 space-y-1">
                             {qrScanLocations[qr.id].topLocations.map((location, index) => (
                               <li key={index}>
                                 {location.displayName} <span className="text-gray-400">({location.scanCount})</span>
                               </li>
                             ))}
                           </ul>
                         ) : (
                           <div className="text-xs text-gray-500 text-center py-2">No data</div>
                         )}
                       </div>
                       <div>
                         <div className="text-xs font-semibold text-red-700 mb-1">Bottom 3 Places</div>
                         {qrScanLocationsLoading[qr.id] ? (
                           <div className="text-xs text-gray-500 text-center py-2">Loading...</div>
                         ) : qrScanLocations[qr.id]?.bottomLocations?.length > 0 ? (
                           <ul className="text-xs text-red-700 space-y-1">
                             {qrScanLocations[qr.id].bottomLocations.map((location, index) => (
                               <li key={index}>
                                 {location.displayName} <span className="text-gray-400">({location.scanCount})</span>
                               </li>
                             ))}
                           </ul>
                         ) : (
                           <div className="text-xs text-gray-500 text-center py-2">No data</div>
                         )}
                       </div>
                     </div>
                   </div>
                    {/* Device Analytics Pie Chart (always show) */}
                    
                      <div className="relative border border-gray-300 rounded-xl bg-white px-4 pt-4 pb-2 flex-1 min-w-[220px] max-w-[350px]">
                      {/* Floating label positioned at top left */}
                      <div className="absolute top-0 left-4 -translate-y-1/2 bg-white px-2 text-sm text-gray-700">
                        Device Analytics
                      </div>
                      <div className="flex flex-col items-center">
                        <DevicePieChart data={qrStats[qr.id]?.devices || {}} />
                        {/* Legend outside SVG */}
                        <div className="flex flex-row items-start mt-2 mb-2">
                          {Object.entries(qrStats[qr.id]?.devices || {}).map(([os], i) => (
                            <div key={os} className="flex items-center text-xs mx-1">
                              <span
                                className="inline-block w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                              />
                              <span>{os}</span>
                            </div>
                          ))}
                        </div>
                        {/* Table */}
                        <table className="w-full text-xs mt-2 bg-gray-50 rounded">
                          <thead>
                            <tr>
                              <th className="text-left px-2 py-1">Device</th>
                              <th className="text-left px-2 py-1">Scans</th>
                              <th className="text-left px-2 py-1">%</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(qrStats[qr.id]?.devices || {}).map(([os, count]) => {
                              const total = Object.values(qrStats[qr.id]?.devices || {}).reduce((a, b) => a + b, 0);
                              const percent = total > 0 ? ((count / total) * 100).toFixed(1) : '0.0';
                              return (
                                <tr key={os}>
                                  <td className="px-2 py-1">{os}</td>
                                  <td className="text-left px-2 py-1">{count}</td>
                                  <td className="text-left px-2 py-1">{percent}%</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    {/* Print and Download Analytics Report of QR  */}
                    <div className="flex flex-row items-center justify-center gap-2">
                      
                    <PDFDownloadLink
                        document={<MyQRReportPDF 
                          qr={qr} 
                          stats={qrStats[qr.id] || { last7Days: {}, last6Months: {}, devices: {} }} 
                          scanCount={qrScanCounts[qr.id] ?? 0} 
                          userName={user?.fullName || ''} 
                          scanLocations={qrScanLocations[qr.id]}
                        />}
                        fileName={`qr-analytics-report-${qr.id}.pdf`}
                      >
                        {({ loading }) => (
                          <button
                            className="px-4 py-2 rounded-full text-xs bg-[#063970] hover:bg-[#052c5c] text-white disabled:opacity-50"
                            disabled={loading}
                            onClick={() => {
                              // Fetch scan locations if not already loaded
                              if (!qrScanLocations[qr.id]) {
                                fetchScanLocations(qr.id);
                              }
                            }}
                          > 
                            Download Report (PDF)
                          </button>
                        )}
                      </PDFDownloadLink>
                      
                    </div>

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              className="px-4 py-1 rounded-full bg-gray-100 text-gray-700 text-xs border border-gray-200 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-700 text-xs">Page {currentPage} of {totalPages}</span>
            <button
              className="px-4 py-1 rounded-full bg-gray-100 text-gray-700 text-xs border border-gray-200 hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
        {/* Delete Confirmation Modal (must be inside main return) */}
        {showDeleteModal && qrToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" style={{ marginTop: 0 }}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs p-6 flex flex-col items-center">
              <div className="text-lg font-semibold text-gray-800 mb-2">Delete QR Code?</div>
              <div className="text-gray-600 mb-6 text-center">Are you sure you want to delete this QR code? This action cannot be undone.</div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={cancelDelete}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Edit Modal */}
        {showModal && editingQRId !== null && (() => {
          const editingQR = qrCodes.find(q => q.id === editingQRId);
          if (!editingQR) return null;

          // Business Card Modal
          if (editingQR.qrData?.type === "businesscard") {
            return (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" style={{ marginTop: 0 }}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                  {/* Header */}
                  <div className="rounded-t-2xl bg-[#063970]/90 px-6 pt-6 pb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Edit Digital Business Card</h3>
                    <button
                      onClick={handleCancelEdit}
                      className="text-white text-2xl hover:text-gray-200"
                      aria-label="Close"
                    >
                      &times;
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col gap-4">
                    <p className="text-gray-700 text-sm">
                      You can edit your digital business card below.
                    </p>

                    {/* Edit Button */}
                    <button
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50"
                      disabled={isDBCLoading}
                      onClick={() =>
                        router.push(`/digital-business-cards/create?uniqueCode=${editingQR.uniqueCode}`)
                      }
                    >
                      {isDBCLoading ? "Loading..." : "Edit Business Card"}
                    </button>

                    {/* Cancel Button */}
                    <button
                      className="w-full bg-gray-300 text-gray-700 py-3 px-4 rounded-full hover:bg-gray-400 transition-colors"
                      onClick={handleCancelEdit}
                      disabled={isDBCLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            );
          }
          
        // Default: normal edit modal for other types
        return (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" style={{ marginTop: 0 }}>
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-0">
                    <div className="rounded-t-2xl bg-[#063970]/90 px-6 pt-6 pb-4 flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white">Edit QR Redirect URL</h3>
                      <button
                        className="text-white text-2xl hover:text-gray-200"
                        onClick={handleCancelEdit}
                        aria-label="Close"
                      >
                        &times;
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Active URL</label>
                        <div className="w-full px-3 py-2 rounded bg-gray-50 text-green-700 font-semibold text-sm break-all border border-gray-200 cursor-not-allowed select-all">
                    {editingQR ? formatQRDataToURL(editingQR.qrData) : ''}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-600 mb-1">New URL</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded text-green-700 font-semibold bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
                          value={editUrl}
                          onChange={e => setEditUrl(e.target.value)}
                          disabled={isSaving}
                          autoFocus
                          placeholder="Enter New URL"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          className="px-4 py-2 bg-[#063970] hover:bg-[#052c5c] text-white rounded disabled:opacity-50"
                    onClick={() => handleSaveEdit(editingQR!)}
                          disabled={isSaving || !editUrl.trim()}
                        >
                          {isSaving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                          onClick={handleCancelEdit}
                          disabled={isSaving}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
            </>
          )}
          
      </div>
        

      )}
   

export default MyQRCodes; 

const PIE_COLORS = ["#3b82f6", "#6366f1", "#f59e42", "#10b981", "#ef4444", "#a855f7", "#fbbf24", "#14b8a6", "#eab308", "#f472b6"];

function DevicePieChart({ data }: { data: { [os: string]: number } }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const entries = Object.entries(data);

  if (entries.length === 1) {
    // Only one device: draw a full circle
    const [os, count] = entries[0];
    const color = PIE_COLORS[0];
    return (
      <svg width={225} height={200} viewBox="0 0 200 180" className="mb-2">
        <circle
          cx={100}
          cy={90}
          r={80}
          fill={color}
        >
          <title>{`${os}: ${count}`}</title>
        </circle>
      </svg>
    );
  }

  let startAngle = 0;
  const slices = entries.map(([os, count], i) => {
    const angle = (count / total) * 360;
    const large = angle > 180 ? 1 : 0;
    const endAngle = startAngle + angle;
    const start = polarToCartesian(100, 90, 80, startAngle);
    const end = polarToCartesian(100, 90, 80, endAngle);
    const d = [
      `M 100 90`,
      `L ${start.x} ${start.y}`,
      `A 80 80 0 ${large} 1 ${end.x} ${end.y}`,
      `Z`
    ].join(' ');
    const color = PIE_COLORS[i % PIE_COLORS.length];
    startAngle += angle;
    return { d, color, os, count };
  });

  return (
    <svg width={225} height={200} viewBox="0 0 200 180" className="mb-2">
      {slices.map((slice, i) => (
        <path key={i} d={slice.d} fill={slice.color}>
          <title>{`${slice.os}: ${slice.count}`}</title>
        </path>
      ))}
    </svg>
  );
}
function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = (angle - 90) * Math.PI / 180.0;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}
