"use client";

import React from "react";

interface LoginCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

const LoginCheckModal: React.FC<LoginCheckModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full text-center transform transition-all duration-300 scale-95 hover:scale-100">
        
        {/* Top Icon */}
        <div className="flex justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-[#063970] animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 1.79-8 4v1h16v-1c0-2.21-3.582-4-8-4z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#063970]">Welcome to StylusQR!</h2>

        {/* Description */}
        <p className="text-gray-700 mb-10 text-lg md:text-xl">
          To access this feature, you need an account. Login or register in just a few seconds.
        </p>

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-2">
          <button
            className="bg-gradient-to-r from-[#063970] to-[#052c5c] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-[#052c5c] hover:to-[#063970] transition transform hover:scale-105"
            onClick={onLogin}
          >
            Login
          </button>

          <button
            className="bg-white border border-[#063970] text-[#063970] px-6 py-3 rounded-xl font-semibold shadow hover:bg-[#063970] hover:text-white transition transform hover:scale-105"
            onClick={onRegister}
          >
            Register
          </button>
        </div>

        {/* Cancel */}
        <button
          className="text-gray-500 hover:text-gray-700 font-medium underline mt-2"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginCheckModal;
