'use client';

import { useState } from 'react';

interface LogoutModalProps {
  cancelLogout: () => void;
  confirmLogout: () => Promise<void>; // Assumed async logout action
}

export default function LogoutModal({ cancelLogout, confirmLogout }: LogoutModalProps) {
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await confirmLogout();
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-8 flex flex-col items-center animate-fade-in">
        <svg
          className="w-12 h-12 text-red-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 14a9 9 0 110-18 9 9 0 010 18z"
          />
        </svg>

        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Confirm Logout</h2>
        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to log out of your account?
        </p>

        <div className="flex gap-4 w-full">
          <button
            onClick={cancelLogout}
            className="flex-1 px-5 py-3 rounded-lg border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
            disabled={loggingOut}
          >
            Cancel
          </button>

          <button
            onClick={handleLogout}
            className="flex-1 px-5 py-3 rounded-lg bg-[#063970] text-white font-semibold hover:bg-[#052c5c] transition flex items-center justify-center"
            disabled={loggingOut}
          >
            {loggingOut ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Logging out...
              </>
            ) : (
              'Log Out'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
