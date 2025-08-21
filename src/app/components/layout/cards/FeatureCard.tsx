import React from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex flex-col items-center bg-white rounded-xl shadow p-6 w-full max-w-xs min-h-[220px] border border-gray-100 hover:shadow-lg transition-shadow">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{title}</h3>
    <p className="text-gray-500 text-center text-sm">{description}</p>
  </div>
);

export default FeatureCard; 