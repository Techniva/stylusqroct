// src/components/VisitingCardToolbar.tsx
"use client";

import { Undo, Redo, Save, Download } from "lucide-react";
import { MouseEventHandler } from "react";

interface VisitingCardToolbarProps {
  undoStackLength: number;
  redoStackLength: number;
  isSaving: boolean;
  onUndo: MouseEventHandler<HTMLButtonElement>;
  onRedo: MouseEventHandler<HTMLButtonElement>;
  onSave: MouseEventHandler<HTMLButtonElement>;
  onDownloadPNG: MouseEventHandler<HTMLButtonElement>;
  onDownloadJPG: MouseEventHandler<HTMLButtonElement>;
  onDownloadPDF: MouseEventHandler<HTMLButtonElement>;
}

export default function VisitingCardToolbar({
  undoStackLength,
  redoStackLength,
  isSaving,
  onUndo,
  onRedo,
  onSave,
  onDownloadPNG,
  onDownloadJPG,
  onDownloadPDF,
}: VisitingCardToolbarProps) {
  return (
    <div className="w-full bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Left Section - Undo/Redo + Save */}
        <div className="flex items-center gap-3">
          {/* Undo */}
          <button
            onClick={onUndo}
            disabled={undoStackLength < 2}
            className="p-2 rounded-full bg-gray-100 text-gray-600 shadow-sm hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40 transition-all duration-200"
            title="Undo"
          >
            <Undo size={16} />
          </button>

          {/* Redo */}
          <button
            onClick={onRedo}
            disabled={redoStackLength === 0}
            className="p-2 rounded-full bg-gray-100 text-gray-600 shadow-sm hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40 transition-all duration-200"
            title="Redo"
          >
            <Redo size={16} />
          </button>

          {/* Save */}
          <button
            onClick={onSave}
            disabled={isSaving}
            className="p-2 rounded-full bg-gray-100 text-gray-600 shadow-sm hover:bg-gray-200 hover:text-gray-700 disabled:opacity-40 transition-all duration-200"
            title="Save"
          >
            {isSaving ? (
              <svg
                className="w-4 h-4 animate-spin text-gray-600"
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
                ></path>
              </svg>
            ) : (
              <Save size={16} />
            )}
          </button>
        </div>

        {/* Right Section - Download */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Download:</span>
          <button
            onClick={onDownloadPNG}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition text-sm"
            title="Download PNG"
          >
            <Download size={14} /> PNG
          </button>
          <button
            onClick={onDownloadJPG}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition text-sm"
            title="Download JPG"
          >
            <Download size={14} /> JPG
          </button>
          <button
            onClick={onDownloadPDF}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition text-sm"
            title="Download PDF"
          >
            <Download size={14} /> PDF
          </button>
        </div>
      </div>
    </div>
  );
}
