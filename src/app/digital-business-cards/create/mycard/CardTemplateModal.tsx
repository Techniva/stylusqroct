"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CardTemplateClassic from "./CardTemplateClassic";
import CardTemplateModern from "./CardTemplateModern";
import CardTemplateMinimal from "./CardTemplateMinimal";
import CardTemplateElegant from "./CardTemplateElegant"

type CardTemplateModalProps = {
  onClose: () => void;
  onSelectTemplate?: (template: string) => void;
};

export default function CardTemplateModal({
  onClose,
  onSelectTemplate,
}: CardTemplateModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("classic");
  const scrollRef = useRef<HTMLDivElement>(null);

  const templates = [
    { id: "classic", name: "Classic", component: <CardTemplateClassic /> },
    { id: "modern", name: "Modern", component: <CardTemplateModern /> },
    { id: "minimal", name: "Minimal", component: <CardTemplateMinimal /> },
    { id: "elegant", name: "Elegant", component: <CardTemplateElegant /> },
  ];

  const handleSave = () => {
    if (onSelectTemplate) {
      onSelectTemplate(selectedTemplate); // ✅ passes chosen template id
      console.log(selectedTemplate)
    }
    onClose();
  }; 

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>, id: string) => {
    if (e.key === "Enter") {
      setSelectedTemplate(id);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300, // adjust scroll step
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-6xl relative flex flex-col">
        {/* Close & Save buttons */}
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-sky-500 text-white font-medium rounded-full shadow hover:bg-sky-600 transition text-sm"
          >
            Save Template
          </button>

          <button
            onClick={onClose}
            className="px-3 py-1 bg-sky-500 text-white font-medium rounded-full shadow hover:bg-sky-600 transition text-sm"
          >
            Close
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-4">Choose a Card Template</h2>

        {/* Scroll container with external buttons */}
        <div className="flex items-center gap-3">
          {/* Left button */}
          <button
            onClick={() => scroll("left")}
            className="bg-white shadow-md p-3 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Horizontal scroll of templates */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide scroll-smooth flex-1"
          >
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                tabIndex={0}
                onClick={() => setSelectedTemplate(tpl.id)}
                onKeyDown={(e) => handleKeyDown(e, tpl.id)}
                className={`relative flex-shrink-0 cursor-pointer rounded-xl m-1  hover:shadow-lg transition ${
                  selectedTemplate === tpl.id ? "ring-2 ring-sky-500" : ""
                }`}
              >
                {tpl.component}
              </div>
            ))}
          </div>

          {/* Right button */}
          <button
            onClick={() => scroll("right")}
            className="bg-white shadow-md p-3 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
}
