"use client";

import { Plus, Trash2, Copy, ChevronLeft, ChevronRight, Layers, Move } from "lucide-react";
import { useState } from "react";

interface RightScrollbarProps {
  pages: number[];
  activePage: number;
  activeSide: "front" | "back";
  thumbnails: { [key: number]: { front?: string; back?: string } };
  isOpen: boolean;
  onToggle: () => void;
  onSwitchPage: (pageId: number, side?: "front" | "back") => void;
  onAddPage: () => void;
  onDeletePage: (pageId: number) => void;
  onDuplicatePage: (pageId: number) => void;
  onReorderPages: (newPages: number[]) => void;
  appliedTemplateThumbnails?: { front?: string; back?: string };
}

export default function RightScrollbar({
  pages,
  activePage,
  activeSide,
  thumbnails,
  isOpen,
  onToggle,
  onSwitchPage,
  onAddPage,
  onDeletePage,
  onDuplicatePage,
  onReorderPages,
  appliedTemplateThumbnails,
}: RightScrollbarProps) {
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  return (
    <aside
      className={`relative bg-white border-l transition-all duration-300 flex flex-col z-20 ${
        isOpen ? "w-52" : "w-14"
      }`}
    >
      {isOpen ? (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
            <h3 className="text-sm font-bold text-gray-700 tracking-wide">Pages</h3>
            <button
              onClick={onToggle}
              className="w-9 h-9 rounded-full bg-white border shadow hover:bg-gray-100 flex items-center justify-center transition"
              title="Collapse"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Scrollable Pages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {pages.map((page, index) => {
              const frontThumb =
                page === activePage && appliedTemplateThumbnails?.front
                  ? appliedTemplateThumbnails.front
                  : thumbnails[page]?.front;
              const backThumb =
                page === activePage && appliedTemplateThumbnails?.back
                  ? appliedTemplateThumbnails.back
                  : thumbnails[page]?.back;

              return (
                <div
                  key={page}
                  className={`relative group border rounded-2xl shadow transition-all transform ${
                    draggingIndex === index ? "scale-105 opacity-80 shadow-2xl" : "hover:scale-105 hover:shadow-xl"
                  }`}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("drag-index", index.toString());
                    setDraggingIndex(index);
                  }}
                  onDragEnd={() => setDraggingIndex(null)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    const fromIndex = parseInt(e.dataTransfer.getData("drag-index"));
                    if (fromIndex === index) return;
                    const newPages = [...pages];
                    const moved = newPages.splice(fromIndex, 1)[0];
                    newPages.splice(index, 0, moved);
                    onReorderPages(newPages);
                    setDraggingIndex(null);
                  }}
                  style={{ perspective: 800 }}
                >
                  {/* Page Number Badge */}
                  <div className="absolute top-2 left-2 bg-indigo-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow">
                    #{page}
                  </div>

                  {/* Drag Handle */}
                  <div className="absolute top-2 right-2 cursor-move p-1 rounded-full bg-gray-100 opacity-50 group-hover:opacity-100 transition">
                    <Move size={14} className="text-gray-500" />
                  </div>

                  {/* Thumbnails */}
                  <div className="flex flex-col gap-2 p-2">
                    {/* Front */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 mb-1">Front</span>
                      <div
                        className={`h-20 w-full rounded-xl border overflow-hidden transition-transform duration-500 ${
                          activePage === page && activeSide === "front" ? "rotate-y-0" : "rotate-y-180"
                        }`}
                        onClick={() => onSwitchPage(page, "front")}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {frontThumb ? (
                          <img
                            src={frontThumb}
                            alt={`Page ${page} Front`}
                            className="w-full h-full object-cover pointer-events-none backface-hidden"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400 text-xs font-medium backface-hidden">
                            Front
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Back */}
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 mb-1">Back</span>
                      <div
                        className={`h-20 w-full rounded-xl border overflow-hidden transition-transform duration-500 ${
                          activePage === page && activeSide === "back" ? "rotate-y-0" : "rotate-y-180"
                        }`}
                        onClick={() => onSwitchPage(page, "back")}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {backThumb ? (
                          <img
                            src={backThumb}
                            alt={`Page ${page} Back`}
                            className="w-full h-full object-cover pointer-events-none backface-hidden"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-400 text-xs font-medium backface-hidden">
                            Back
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute bottom-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button
                      onClick={() => onDuplicatePage(page)}
                      className="p-1.5 bg-indigo-500 text-white rounded-full shadow hover:bg-indigo-600 transition"
                      title="Duplicate"
                    >
                      <Copy size={14} />
                    </button>
                    <button
                      onClick={() => onDeletePage(page)}
                      className="p-1.5 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Page */}
          <div className="mt-3 px-4 pb-4">
            <button
              onClick={onAddPage}
              className="w-full py-2 rounded-xl bg-gradient-to-r from-green-400 to-green-500 text-white font-bold flex items-center justify-center gap-2 shadow hover:shadow-lg hover:scale-[1.03] transition"
            >
              <Plus size={16} /> Add Page
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 py-3">
          <button
            onClick={onToggle}
            className="w-9 h-9 rounded-full bg-white border shadow flex items-center justify-center hover:bg-gray-100 transition"
            title="Expand"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            className="relative group p-3 rounded-xl hover:bg-indigo-50 transition"
            title="Pages"
          >
            <Layers size={22} className="text-gray-600 group-hover:text-indigo-600" />
          </button>

          <button
            onClick={onAddPage}
            className="relative group p-3 rounded-xl hover:bg-green-50 transition"
            title="Add Page"
          >
            <Plus size={22} className="text-green-600 group-hover:scale-110 transition" />
          </button>
        </div>
      )}
    </aside>
  );
}
