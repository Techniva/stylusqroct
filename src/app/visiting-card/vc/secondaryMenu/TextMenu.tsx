"use client";

import React, { FC, useState, useEffect } from "react";
import {
  textFeatures,
  quickPresets,
  TextFeature,
  textEffects,
} from "../data/textFeatures";
import { ArrowUp, ArrowDown, Trash2, Sparkles, PlayCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// -------------------- MOCK API --------------------
const fetchEffects = async () => [
  { id: "shadow", label: "Shadow", style: { shadow: { color: "#000000", blur: 5, offsetX: 2, offsetY: 2 } } },
  { id: "outline", label: "Outline", style: { stroke: "#000000", strokeWidth: 2 } },
  { id: "opacity50", label: "50% Opacity", style: { opacity: 0.5 } },
];

const fetchAnimations = async () => [
  { id: "fadeIn", label: "Fade In", type: "opacity", value: 1, duration: 500 },
  { id: "slideRight", label: "Slide Right", type: "position", dx: 50, dy: 0, duration: 500 },
  { id: "rotate15", label: "Rotate 15°", type: "rotate", angle: 15, duration: 500 },
];

// -------------------- TYPES --------------------
interface TextMenuProps {
  selectedObject: any;
  handleBringForward: () => void;
  handleSendBackward: () => void;
  handleDelete: () => void;
  handleAddText: (feature?: TextFeature) => void;
  textColor: string;
  fontSize: number;
  setTextColor: (color: string) => void;
  setFontSize: (size: number) => void;
  canvas: any;
}

type Tab = "Style" | "Effect" | "Animation";

// -------------------- COMPONENT --------------------
const TextMenu: FC<TextMenuProps> = ({
  selectedObject,
  handleBringForward,
  handleSendBackward,
  handleDelete,
  handleAddText,
  canvas,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>("Style");
  const [effects, setEffects] = useState<any[]>([]);
  const [animations, setAnimations] = useState<any[]>([]);

  useEffect(() => {
    fetchEffects().then(setEffects);
    fetchAnimations().then(setAnimations);
  }, []);

  // --- Helpers ---
  const applyAnimation = (anim: any) => {
    if (!selectedObject || !canvas) return;
    if (anim.type === "opacity") {
      selectedObject.animate("opacity", anim.value, { duration: anim.duration });
    } else if (anim.type === "position") {
      selectedObject.animate("left", selectedObject.left + anim.dx, { duration: anim.duration });
      selectedObject.animate("top", selectedObject.top + anim.dy, { duration: anim.duration });
    } else if (anim.type === "rotate") {
      selectedObject.animate("angle", (selectedObject.angle || 0) + anim.angle, { duration: anim.duration });
    }
    canvas.renderAll();
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
      {/* ---------- Sticky Tabs ---------- */}
      <div className="sticky top-0 z-10 bg-gray-50 border-b border-gray-200">
        <ul className="flex text-sm font-medium">
          {(["Style", "Effect", "Animation"] as Tab[]).map((tab) => (
            <li key={tab}>
              <button
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-[#2a0062] text-[#2a0062] font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* ---------- Tab Panels ---------- */}
      <div className="flex flex-col gap-5 p-4">
        {/* ----- Style Tab ----- */}
        {activeTab === "Style" && (
          <>
            <div className="grid gap-3">
              {quickPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handleAddText(preset)}
                  className={`w-full py-3 px-4 bg-white border rounded-lg shadow-sm hover:shadow-md hover:scale-[1.02] transition transform text-left ${preset.fontClass}`}
                  style={{
                    fontWeight: preset.fontWeight,
                    fontStyle: preset.italic ? "italic" : "normal",
                    textTransform: preset.uppercase ? "uppercase" : "none",
                    fontSize: preset.previewSize,
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <button
              onClick={() =>
                handleAddText({
                  id: "bodyText",
                  label: "Add a little bit of body text",
                  fontClass: "font-sans",
                  previewSize: 14,
                })
              }
              className="w-full mt-2 py-3 px-4 bg-gray-100 rounded-lg hover:bg-gray-200 text-left text-gray-700 transition"
            >
              Add a little bit of body text
            </button>

            <hr className="border-gray-200 my-3" />

            <div className="grid gap-3">
              {textFeatures.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => handleAddText(feature)}
                  className={`w-full py-2 px-4 bg-white border rounded-lg hover:bg-gray-100 shadow-sm transition text-left ${feature.fontClass}`}
                  style={{
                    fontWeight: feature.fontWeight,
                    fontStyle: feature.italic ? "italic" : "normal",
                    textTransform: feature.uppercase ? "uppercase" : "none",
                    fontSize: feature.previewSize,
                  }}
                >
                  {feature.label}
                </button>
              ))}
            </div>
          </>
        )}

        {/* ----- Effect Tab ----- */}
        {activeTab === "Effect" && (
          <div className="flex flex-wrap gap-5 p-2">
            {textEffects.map((effect) => (
              <div
                key={effect.id}
                onClick={() => {
                  if (!selectedObject || !canvas) return;
                  selectedObject.set(effect.style);
                  canvas.renderAll();
                }}
                className="w-24 h-24 border rounded-lg shadow-sm flex items-center justify-center cursor-pointer hover:scale-105 transition transform relative group"
                title={effect.label}
              >
                {/* Letter Preview */}
                <span
                  style={effect.style}
                  className="text-8xl font-bold select-none"
                >
                  A
                </span>

                {/* Hover + Icon */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-all duration-300 transform scale-50 group-hover:scale-100 cursor-pointer">
                      <span className="text-white text-3xl animate-pulse">+</span>
                </div>             
              </div>
            ))}
          </div>
        )}

        {/* ----- Animation Tab ----- */}
        {activeTab === "Animation" && (
          <div className="flex flex-col gap-2">
            {animations.map((anim) => (
              <button
                key={anim.id}
                onClick={() => applyAnimation(anim)}
                className="flex items-center gap-2 py-2 px-4 bg-white border rounded hover:bg-gray-100 shadow-sm transition"
              >
                <PlayCircle className="w-4 h-4 text-blue-500" />
                {anim.label}
              </button>
            ))}
          </div>
        )}

      {/* ----- Object Controls (Compact Toolbar) ----- */}
      <TooltipProvider>
        <div className="mt-2 flex items-center gap-4 p-4 
          bg-gradient-to-r from-indigo-50 via-white to-indigo-50 
          backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 
          w-fit mx-auto">
          
          {/* Bring Forward */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleBringForward}
                disabled={!selectedObject}
                className="p-4 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-400 
                  text-white shadow-lg hover:scale-110 hover:shadow-amber-400/50 
                  transition-all duration-300 ease-out disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowUp className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Bring Forward</p>
            </TooltipContent>
          </Tooltip>

          {/* Send Backward */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleSendBackward}
                disabled={!selectedObject}
                className="p-4 rounded-full bg-gradient-to-br from-pink-500 via-red-400 to-orange-400 
                  text-white shadow-lg hover:scale-110 hover:shadow-pink-400/50 
                  transition-all duration-300 ease-out disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowDown className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Send Backward</p>
            </TooltipContent>
          </Tooltip>

          {/* Delete */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleDelete}
                disabled={!selectedObject}
                className="p-4 rounded-full bg-gradient-to-br from-red-500 via-rose-500 to-pink-600 
                  text-white shadow-lg hover:scale-110 hover:shadow-red-400/50 
                  transition-all duration-300 ease-out disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      </div>
    </div>
  );
};

export default TextMenu;
