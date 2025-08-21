"use client";

import React from "react";

interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <main className="flex-1 w-full bg-gray-50 min-h-[70vh] pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
};

export default Body; 