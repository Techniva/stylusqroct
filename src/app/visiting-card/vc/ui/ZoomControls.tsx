"use client";

import { Canvas, Point } from "fabric";
import { RefreshCw } from "lucide-react";

interface ZoomControlsProps {
  canvas: Canvas | null;
  zoom: number;
  setZoom: (zoom: number) => void;
}

export default function ZoomControls({ canvas, zoom, setZoom }: ZoomControlsProps) {
  const handleZoomIn = () => {
    if (!canvas) return;
    const newZoom = Math.min(zoom + 0.1, 2);
    const center = canvas.getCenter();
    canvas.zoomToPoint(new Point(center.left, center.top), newZoom);
    setZoom(newZoom);
  };

  const handleZoomOut = () => {
    if (!canvas) return;
    const newZoom = Math.max(zoom - 0.1, 0.5);
    const center = canvas.getCenter();
    canvas.zoomToPoint(new Point(center.left, center.top), newZoom);
    setZoom(newZoom);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas) return;
    const newZoom = parseInt(e.target.value) / 100;
    const center = canvas.getCenter();
    canvas.zoomToPoint(new Point(center.left, center.top), newZoom);
    setZoom(newZoom);
  };

  const handleResetZoom = () => {
    if (!canvas) return;
    const center = canvas.getCenter();
    canvas.zoomToPoint(new Point(center.left, center.top), 1);
    setZoom(1);
    (canvas.wrapperEl as HTMLElement).scrollTop = (canvas.wrapperEl as HTMLElement).scrollLeft = 0;
  };

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white shadow-md rounded-full px-3 py-1.5 z-20">
      
      {/* Zoom Out */}
      <button
        onClick={handleZoomOut}
        className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition shadow"
        title="Zoom Out"
      >
        <span className="text-base font-bold">-</span>
      </button>

      {/* Slider */}
      <input
        type="range"
        min={50}
        max={200}
        value={zoom * 100}
        onChange={handleSliderChange}
        className="w-36 accent-indigo-500"
      />

      {/* Zoom Percentage */}
      <span className="text-xs text-gray-600">{Math.round(zoom * 100)}%</span>

      {/* Reset */}
      <button
        onClick={handleResetZoom}
        className="p-1 rounded-full hover:bg-gray-200 transition"
        title="Reset Zoom"
      >
        <RefreshCw size={14} className="text-indigo-600" />
      </button>

      {/* Zoom In */}
      <button
        onClick={handleZoomIn}
        className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition shadow"
        title="Zoom In"
      >
        <span className="text-base font-bold">+</span>
      </button>
    </div>
  );
}
