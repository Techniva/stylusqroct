import React, { useState } from 'react';

export default function QrStatusToggle({ qr, setQrCodes }) {
  const [loading, setLoading] = useState(false);

  const toggle = async () => {
    if (loading) return;
    const newStatus = !qr.qrStatus;

    // Optimistic UI update
    setQrCodes(prev => prev.map(item => item.id === qr.id ? { ...item, qrStatus: newStatus } : item));
    setLoading(true);

    try {
      const response = await fetch(`/api/qr/${qr.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrStatus: newStatus }),
      });

      if (!response.ok) {
        // revert on failure
        setQrCodes(prev => prev.map(item => item.id === qr.id ? { ...item, qrStatus: qr.qrStatus } : item));
        console.error('Failed to update QR status', await response.text());
      }
    } catch (err) {
      // revert on error
      setQrCodes(prev => prev.map(item => item.id === qr.id ? { ...item, qrStatus: qr.qrStatus } : item));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
// Compact toggle (small pill + label)
        <div className="flex items-center ml-4">
        <button
            type="button"
            aria-pressed={qr.qrStatus}
            onClick={toggle}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }}
            disabled={loading}
            className={`relative w-14 h-7 rounded-full p-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200
            ${qr.qrStatus ? 'bg-green-800' : 'bg-red-500'}`}
        >
            {/* sliding knob */}
            <span
            aria-hidden
            className={`block w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200
                ${qr.qrStatus ? 'translate-x-7' : 'translate-x-0'}`}
            />
            {/* optional small focus ring / disabled style */}
            {loading && (
            <span className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-full">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.15)" strokeWidth="3"></circle>
                <path d="M22 12a10 10 0 00-10-10" stroke="white" strokeWidth="3" strokeLinecap="round"></path>
                </svg>
            </span>
            )}
        </button>

        {/* label to the right */}
        <span className="ml-3 text-sm font-medium select-none">
            {qr.qrStatus ? (
            <span className="text-green-900 font-bold">Active</span>
            ) : (
            <span className="text-red-700 font-bold">Inactive</span>
            )}
        </span>
        </div>

  );
}
