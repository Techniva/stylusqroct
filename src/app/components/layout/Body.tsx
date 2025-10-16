"use client";

import React from "react";

interface BodyProps {
  children: React.ReactNode;
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <main className="pb-8">   
        {children}
    </main>
  );
};

export default Body; 