"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type ContactItemProps = {
  icon: React.ReactNode;
  label: string;       // e.g. "Email"
  value?: string;      // actual field value
  sublabel?: string;   // helper text
  bgColor?: string;
  onEdit?: (newValue: { value: string; sublabel: string }) => void;
  onDelete?: () => void;
  animate?: boolean;
};

export default function ContactItem({
  icon,
  label,
  value = "",
  sublabel = "",
  bgColor = "bg-blue-950",
  onEdit,
  onDelete,
  animate = false,
}: ContactItemProps) {
  const [mounted, setMounted] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // local state for editing
  const [editValue, setEditValue] = useState(value);
  const [editSublabel, setEditSublabel] = useState(sublabel);

  useEffect(() => {
    if (animate) {
      setMounted(false);
      const timer = setTimeout(() => setMounted(true), 20);
      return () => clearTimeout(timer);
    }
  }, [animate]);

  const handleSaveEdit = () => {
    onEdit?.({ value: editValue, sublabel: editSublabel });
    setShowEditPopup(false);
  };

  const handleConfirmDelete = () => {
    onDelete?.();
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div
        className={`group flex items-start justify-between py-4 rounded transition-all duration-500 
          ${mounted ? "opacity-100 border-b translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        {/* Left Section */}
        <div className="flex items-start space-x-3">
          <div
            className={`w-10 h-10 text-white flex items-center justify-center rounded-full ${bgColor}`}
          >
            {icon}
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 text-sm font-medium">
              {label}{value ? `: ${value}` : ""}
            </span>
            {sublabel && (
              <span className="text-gray-500 text-xs">{sublabel}</span>
            )}
          </div>
        </div>

        {/* Right Action Buttons (show on hover) */}
        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={() => setShowEditPopup(true)}
              className="p-1 rounded-full hover:bg-gray-100 transition"
            >
              <Pencil className="w-4 h-4 text-gray-500" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="p-1 rounded-full hover:bg-gray-100 transition"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          )}
        </div>
      </div>

      {/* 🔹 Edit Popup */}
      {showEditPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit {label}</h2>
              <button
                onClick={() => setShowEditPopup(false)}
                className="text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Enter value"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="text"
                placeholder="Enter sublabel (optional)"
                value={editSublabel}
                onChange={(e) => setEditSublabel(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button
                onClick={handleSaveEdit}
                className="bg-sky-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80">
            <h2 className="text-lg font-semibold mb-4">
              Delete {label}?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
