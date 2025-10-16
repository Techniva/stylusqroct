"use client";

import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  loading: boolean;
  loggingOut: boolean;
  onComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ loading, loggingOut, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!loading && !loggingOut) return;

    setProgress(0);
    const totalDuration = 2000; // 2 seconds
    const intervalTime = 20;
    const increment = 100 / (totalDuration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);
        if (next === 100) {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [loading, loggingOut, onComplete]);

  if (!loading && !loggingOut) return null;

  return (
    <div className="h-screen bg-[#f6f6fa] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center mb-6">
        <div className="bg-white p-2 rounded-lg shadow-lg">
          <img src="/qr-code.png" alt="StylusQR" className="h-40 w-40" />
        </div>
        <span className="mt-4 text-xl font-semibold text-[#063970]">StylusQR</span>
      </div>

      <div className="w-64 h-3 bg-gray-300 rounded-full overflow-hidden">
        <div
          className="h-3 bg-gradient-to-r from-[#063970] via-[#1d4ed8] to-[#0ea5e9] transition-all ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-4 text-gray-600">
        {loading ? "Loading dashboard data..." : "Logging out..."}
      </p>
    </div>
  );
};

export default LoadingScreen;
