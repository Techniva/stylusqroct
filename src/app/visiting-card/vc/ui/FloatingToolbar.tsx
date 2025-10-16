"use client";

import { useState, useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Trash2,
  ArrowUpCircle,
  ArrowDownCircle,
  Copy,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Convert Fabric gradient to CSS
const convertFabricGradientToCss = (g: any) => {
  try {
    if (!g || typeof g !== "object" || g.type !== "linear") return null;
    const coords = g.coords || { x1: 0, y1: 0, x2: 1, y2: 0 };
    const stops = Array.isArray(g.colorStops) ? g.colorStops : [];
    if (!stops.length) return null;

    const dx = (coords.x2 ?? 1) - (coords.x1 ?? 0);
    const dy = (coords.y2 ?? 0) - (coords.y1 ?? 0);
    const rad = Math.atan2(dy, dx);
    const deg = (rad * 180) / Math.PI;
    const cssDeg = 90 - deg;

    const colorList = stops
      .map(
        (s: any) =>
          (s.color || "") +
          (typeof s.offset === "number"
            ? ` ${Math.round(s.offset * 100)}%`
            : "")
      )
      .join(", ");
    return `linear-gradient(${cssDeg}deg, ${colorList})`;
  } catch {
    return null;
  }
};

interface FloatingToolbarProps {
  canvasRef: React.RefObject<HTMLDivElement | null>;
  selectedObject: any;
  objectType: "textbox" | string;
  onDelete: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onStyleChange: (style: Record<string, any>) => void;
  onCopyStyle?: () => void;
  onOpenColorsMenu?: (currentColor?: string) => void;
  anchorPosition?: { top: number; left: number };
}

const FONT_FAMILIES = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier New",
  "Verdana",
  "Georgia",
];

export default function FloatingToolbar({
  canvasRef,
  selectedObject,
  objectType,
  onDelete,
  onBringForward,
  onSendBackward,
  onStyleChange,
  onCopyStyle,
  onOpenColorsMenu,
  anchorPosition,
}: FloatingToolbarProps) {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const [fontSize, setFontSize] = useState(selectedObject?.fontSize || 24);
  const [textColor, setTextColor] = useState(
    selectedObject?.fill || "#000000"
  );
  const [fontFamily, setFontFamily] = useState(
    selectedObject?.fontFamily || "Arial"
  );

  // Sync state with selected object
  useEffect(() => {
    if (!selectedObject) return;
    setFontSize(selectedObject.fontSize ?? 24);

    const fill = selectedObject.fill;
    if (typeof fill === "string") {
      setTextColor(fill ?? "#000000");
    } else {
      const css = convertFabricGradientToCss(fill);
      setTextColor(css ?? "#000000");
    }

    setFontFamily(selectedObject.fontFamily ?? "Arial");
  }, [selectedObject]);

  // Position toolbar
  useEffect(() => {
    if (!selectedObject || !canvasRef.current) return;

    if (anchorPosition) {
      setPosition({ top: anchorPosition.top, left: anchorPosition.left });
      return;
    }

    const canvasRect = canvasRef.current.getBoundingClientRect();
    setPosition({
      top: Math.min(
        Math.max(selectedObject.top - 50, 0),
        canvasRect.height - 40
      ),
      left: Math.min(
        Math.max(selectedObject.left, 0),
        canvasRect.width - 300
      ),
    });
  }, [selectedObject, canvasRef, anchorPosition]);

  const updateStyle = (style: Record<string, any>) => {
    if (selectedObject.isBackground) {
      if (style.fill) selectedObject.set({ fill: style.fill });
    } else {
      onStyleChange(style);
    }
  };

  if (!selectedObject) return null;

  return (
    <TooltipProvider>
      <div
        ref={toolbarRef}
        className="absolute z-50 bg-white/95 backdrop-blur-sm border border-gray-200 shadow-lg 
          rounded-full px-5 py-2 flex flex-wrap items-center justify-center gap-2 text-sm"
        style={{ top: 108, transform: "translate(0%, -110%)", minWidth: 280 }}
      >
        {/* ---- Textbox Controls ---- */}
        {objectType === "textbox" && (
          <>
            {/* Bold */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() =>
                    updateStyle({
                      fontWeight:
                        selectedObject.fontWeight === "bold"
                          ? "normal"
                          : "bold",
                    })
                  }
                  className="p-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md hover:from-pink-500 hover:to-pink-600"
                >
                  <Bold size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Bold</TooltipContent>
            </Tooltip>

            {/* Italic */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() =>
                    updateStyle({
                      fontStyle:
                        selectedObject.fontStyle === "italic"
                          ? "normal"
                          : "italic",
                    })
                  }
                  className="p-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-md hover:from-purple-500 hover:to-purple-600"
                >
                  <Italic size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Italic</TooltipContent>
            </Tooltip>

            {/* Underline */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() =>
                    updateStyle({
                      textDecoration:
                        selectedObject.textDecoration === "underline"
                          ? "none"
                          : "underline",
                    })
                  }
                  className="p-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white shadow-md hover:from-green-500 hover:to-green-600"
                >
                  <Underline size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Underline</TooltipContent>
            </Tooltip>

            {/* Align Left */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => updateStyle({ textAlign: "left" })}
                  className="p-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md hover:from-blue-500 hover:to-blue-600"
                >
                  <AlignLeft size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Align Left</TooltipContent>
            </Tooltip>

            {/* Align Center */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => updateStyle({ textAlign: "center" })}
                  className="p-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md hover:from-yellow-500 hover:to-yellow-600"
                >
                  <AlignCenter size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Align Center</TooltipContent>
            </Tooltip>

            {/* Align Right */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => updateStyle({ textAlign: "right" })}
                  className="p-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md hover:from-orange-500 hover:to-orange-600"
                >
                  <AlignRight size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Align Right</TooltipContent>
            </Tooltip>

            {/* Font Family */}
            <select
              value={fontFamily}
              onChange={(e) => {
                setFontFamily(e.target.value);
                updateStyle({ fontFamily: e.target.value });
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              {FONT_FAMILIES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            {/* Font Size */}
            <input
              type="number"
              min={6}
              max={200}
              value={fontSize}
              onChange={(e) => {
                setFontSize(+e.target.value);
                updateStyle({ fontSize: +e.target.value });
              }}
              className="w-14 text-center border rounded px-2 py-1 text-sm"
            />

            {/* Text Color */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="w-8 h-8 rounded-full shadow-sm"
                  style={{
                    backgroundImage:
                      typeof textColor === "string" &&
                      textColor.toLowerCase().includes("linear-gradient")
                        ? textColor
                        : undefined,
                    backgroundColor:
                      typeof textColor === "string" &&
                      !textColor.toLowerCase().includes("linear-gradient")
                        ? textColor
                        : undefined,
                  }}
                  onClick={() => {
                    if (!onOpenColorsMenu) return;
                    const fill = selectedObject?.fill;
                    const css =
                      typeof fill === "string"
                        ? fill
                        : convertFabricGradientToCss(fill) || undefined;
                    onOpenColorsMenu(css);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>Text Color</TooltipContent>
            </Tooltip>

            {/* Copy Style */}
            {onCopyStyle && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onCopyStyle}
                    className="p-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-md hover:from-teal-500 hover:to-teal-600"
                  >
                    <Copy size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Copy Style</TooltipContent>
              </Tooltip>
            )}

            {/* ---- Bring Forward / Send Backward / Delete ---- */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onBringForward}
                  className="p-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md hover:from-blue-500 hover:to-blue-600"
                >
                  <ArrowUpCircle size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Bring Forward</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onSendBackward}
                  className="p-2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 text-white shadow-md hover:from-indigo-500 hover:to-indigo-600"
                >
                  <ArrowDownCircle size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Send Backward</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onDelete}
                  className="p-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-red-600 text-white">
                Delete
              </TooltipContent>
            </Tooltip>
          </>
        )}

        {/* ---- Background Object ---- */}
        {selectedObject.isBackground && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onBringForward}
                  className="p-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md hover:from-blue-500 hover:to-blue-600"
                >
                  <ArrowUpCircle size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Bring Forward</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onSendBackward}
                  className="p-2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 text-white shadow-md hover:from-indigo-500 hover:to-indigo-600"
                >
                  <ArrowDownCircle size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Send Backward</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onDelete}
                  className="p-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-red-600 text-white">
                Delete
              </TooltipContent>
            </Tooltip>
          </>
        )}

        {/* ---- Shapes / Images ---- */}
        {!selectedObject.isBackground && objectType !== "textbox" && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="w-8 h-8 rounded-full shadow-sm"
                  style={{
                    backgroundImage:
                      typeof textColor === "string" &&
                      textColor.toLowerCase().includes("linear-gradient")
                        ? textColor
                        : undefined,
                    backgroundColor:
                      typeof textColor === "string" &&
                      !textColor.toLowerCase().includes("linear-gradient")
                        ? textColor
                        : undefined,
                  }}
                  onClick={() => {
                    if (!onOpenColorsMenu) return;
                    const fill = selectedObject?.fill;
                    const css =
                      typeof fill === "string"
                        ? fill
                        : convertFabricGradientToCss(fill) || undefined;
                    onOpenColorsMenu(css);
                  }}
                />
              </TooltipTrigger>
              <TooltipContent>Fill Color</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onBringForward}
                  className="p-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md hover:from-blue-500 hover:to-blue-600"
                >
                  <ArrowUpCircle size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Bring Forward</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onSendBackward}
                  className="p-2 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-500 text-white shadow-md hover:from-indigo-500 hover:to-indigo-600"
                >
                  <ArrowDownCircle size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent>Send Backward</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onDelete}
                  className="p-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:from-red-600 hover:to-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="bg-red-600 text-white">
                Delete
              </TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
    </TooltipProvider>
  );
}
