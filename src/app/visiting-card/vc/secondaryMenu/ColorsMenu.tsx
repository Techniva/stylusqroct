"use client";

import React, { FC, useState } from "react";

interface ColorsMenuProps {
  initialColor?: string;
  onSelect: (color: string) => void;
  onClose?: () => void;
}

// Monochrome (light → dark neutrals)
const MONOCHROMATIC = [
  "#000000", "#1F2937", "#374151", "#4B5563", "#6B7280", "#9CA3AF", "#D1D5DB", "#F3F4F6", "#FFFFFF"
];

// Warm tones (reds, oranges, yellows, pinks)
const WARM_TONES = [
  "#EF4444", "#F97316", "#F59E0B", "#EAB308", "#FCD34D", "#F472B6", "#EC4899"
];

// Cool tones (greens, teals, blues, indigos, violets)
const COOL_TONES = [
  "#84CC16", "#10B981", "#14B8A6", "#06B6D4", "#3B82F6", "#6366F1", "#8B5CF6", "#A78BFA"
];

// Deep/dark shades (rich muted colors for contrast)
const DEEP_SHADES = [
  "#0F0F0F", "#1C1C1C", "#2D2D2D", // very dark grays
  "#7F1D1D", "#991B1B", "#B91C1C", // deep reds
  "#78350F", "#92400E", "#B45309", // earthy browns
  "#064E3B", "#065F46", "#047857", // dark greens
  "#1E3A8A", "#1D4ED8", "#2563EB", // indigo/blues
  "#4338CA", "#312E81", "#4C1D95", "#6D28D9" // purples
];

// Gradient sets (light + dark combos)
const GRADIENTS = [
  "linear-gradient(45deg, #3B82F6, #06B6D4)",
  "linear-gradient(90deg, #EF4444, #F59E0B)",
  "linear-gradient(135deg, #10B981, #FBBF24)",
  "linear-gradient(225deg, #F472B6, #EC4899)",
  "linear-gradient(160deg, #1F2937, #000000)", // dark gray fade
  "linear-gradient(120deg, #4338CA, #0F172A)", // indigo-dark
  "linear-gradient(200deg, #7F1D1D, #0B0B0B)", // red-black
];

const ColorsMenu: FC<ColorsMenuProps> = ({ initialColor, onSelect }) => {
  const [search, setSearch] = useState("");

  const filterColors = (colors: string[]) =>
    colors.filter(c =>
      c.toLowerCase().includes(search.toLowerCase()) ||
      (c === "#FFFFFF" && "white".includes(search.toLowerCase())) ||
      (c === "#000000" && "black".includes(search.toLowerCase()))
    );

  const filterGradients = (gradients: string[]) =>
    gradients.filter(g => g.toLowerCase().includes(search.toLowerCase()) || "gradient".includes(search.toLowerCase()));

  const renderSwatch = (c: string) => (
    <button
      key={c}
      onClick={() => onSelect(c)}
      title={c}
      className={`w-12 h-12 rounded-full shadow-md transition-transform duration-150
        hover:scale-110 hover:shadow-lg ${
          initialColor === c ? "ring-2 ring-blue-500" : ""
        }`}
      style={{
        backgroundImage: c.includes("gradient") ? c : undefined,
        backgroundColor: !c.includes("gradient") ? c : undefined,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    />
  );

  const renderCategory = (title: string, colors: string[]) => (
    <div key={title} className="mb-4">
      <h4 className="text-xs font-semibold text-gray-500 py-1">{title}</h4>
      <div className="grid grid-cols-6 gap-3 p-1">{colors.map(renderSwatch)}</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4 p-4 h-[540px]">
      {/* Search input */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search color or gradient..."
        className="w-full pl-3 pr-10 py-2 rounded-xl border border-gray-300 text-sm placeholder-gray-400 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      />

      {/* Scrollable color sets */}
      <div className="flex-1 overflow-y-auto scrollbar-hide mt-2">
        {renderCategory("Monochromatic", filterColors(MONOCHROMATIC))}
        {renderCategory("Warm Tones", filterColors(WARM_TONES))}
        {renderCategory("Cool Tones", filterColors(COOL_TONES))}
        {renderCategory("Deep Shades", filterColors(DEEP_SHADES))}
        {renderCategory("Gradient Colors", filterGradients(GRADIENTS))}
      </div>
    </div>
  );
};

export default ColorsMenu;
