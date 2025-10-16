"use client";

import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { templateCategories, Template, Layer } from "../data/templateCategories";

interface DesignMenuProps {
  handleSelectTemplate: (templateId: string, pageIndex?: number) => void;
}

const DesignMenu: FC<DesignMenuProps> = ({ handleSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    templateCategories[0].type
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoveredTemplateId, setHoveredTemplateId] = useState<string | null>(null);
  const [carouselPages, setCarouselPages] = useState<Record<string, number>>({});

  const currentTemplates: Template[] =
    templateCategories.find((cat) => cat.type === selectedCategory)?.templates || [];

  const filteredTemplates = currentTemplates.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Carousel flip per hovered template
  useEffect(() => {
    if (!hoveredTemplateId) return;

    const hoveredTemplate = currentTemplates.find((t) => t.id === hoveredTemplateId);
    if (!hoveredTemplate || hoveredTemplate.pages.length < 2) return;

    // Use functional state update to avoid depending on carouselPages in the effect
    const interval = setInterval(() => {
      setCarouselPages((prev) => {
        const current = prev[hoveredTemplateId] ?? 0;
        const nextPage = (current + 1) % hoveredTemplate.pages.length;
        return { ...prev, [hoveredTemplateId]: nextPage };
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [hoveredTemplateId, currentTemplates]);

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-2">
        {templateCategories.map((cat) => (
          <button
            key={cat.type}
            onClick={() => {
              setSelectedCategory(cat.type);
              setSearchQuery("");
            }}
            className={`px-4 py-1 rounded-full whitespace-nowrap text-xs font-medium ${
              selectedCategory === cat.type
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {cat.type}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search templates..."
        className="w-full pl-3 pr-10 py-2 rounded-lg border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent transition mb-2"
      />

      {/* Templates Grid */}
      <div className="grid grid-cols-2 gap-2 h-[400px] p-1 overflow-y-auto scrollbar-hide">
        {filteredTemplates.map((template) => {
          const pages = template.pages;
          const activePage = carouselPages[template.id] ?? 0;

          return (
            <div
              key={template.id}
              onMouseEnter={() => setHoveredTemplateId(template.id)}
              onMouseLeave={() => {
                setHoveredTemplateId(null);
                setCarouselPages((prev) => ({ ...prev, [template.id]: 0 }));
              }}
              onClick={() => {
                try {
                  if (!template || !template.id) {
                    console.warn('DesignMenu: invalid template on click', template);
                    return;
                  }

                  const pages = Array.isArray(template.pages) ? template.pages : [];
                  if (pages.length === 0) {
                    console.warn('DesignMenu: template has no pages, skipping', template.id);
                    return;
                  }

                  let pageIndex = carouselPages[template.id] ?? 0;
                  if (typeof pageIndex !== 'number' || pageIndex < 0 || pageIndex >= pages.length) pageIndex = 0;

                  console.debug('DesignMenu: selecting template', template.id, 'pageIndex', pageIndex);
                  handleSelectTemplate(template.id, pageIndex);
                } catch (e) {
                  console.error('DesignMenu: error when invoking handleSelectTemplate', e, template);
                }
              }}
              className="cursor-pointer border rounded-lg shadow hover:scale-105 transition-transform flex flex-col relative"
              style={{ height: "124px" }}
            >
              <div className="relative w-full h-24 bg-gray-100 rounded-t-lg overflow-hidden flex flex-col justify-end">
                {pages.map((page, idx) => (
                  <div
                    key={page.id}
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ opacity: idx === activePage ? 1 : 0 }}
                  >
                    {page.layers.map((layer: Layer) => {
                      const scale = 0.33; // scale down for thumbnail
                      switch (layer.type) {
                        case "background":
                          return (
                            <div
                              key={layer.id}
                              className="absolute top-0 left-0 w-full h-full"
                              style={
                                typeof layer.props.fill === "string" && layer.props.fill.includes("gradient")
                                  ? { background: layer.props.fill }
                                  : { backgroundColor: layer.props.fill || "#fff" }
                              }
                            />
                          );

                        case "rect":
                          return (
                            <div
                              key={layer.id}
                              className=""
                              style={{
                                position: "absolute",
                                left: (layer.props.left || 0) * scale,
                                top: (layer.props.top || 0) * scale,
                                width: (layer.props.width || 50) * scale,
                                height: (layer.props.height || 50) * scale,
                                backgroundColor: layer.props.fill || "#000",
                              }}
                            />
                          );

                        case "circle":
                          return (
                            <div
                              key={layer.id}
                              className="rounded-full"
                              style={{
                                position: "absolute",
                                left: ((layer.props.left || 0) - (layer.props.radius || 25)) * scale,
                                top: ((layer.props.top || 0) - (layer.props.radius || 25)) * scale,
                                width: (layer.props.radius || 25) * 2 * scale,
                                height: (layer.props.radius || 25) * 2 * scale,
                                backgroundColor: layer.props.fill || "#000",
                              }}
                            />
                          );

                        case "triangle":
                          return (
                            <svg
                              key={layer.id}
                              className="absolute"
                              style={{
                                left: (layer.props.left || 0) * scale,
                                top: (layer.props.top || 0) * scale,
                                width: (layer.props.width || 100) * scale,
                                height: (layer.props.height || 100) * scale,
                              }}
                            >
                              <polygon
                                points={`0,${(layer.props.height || 100) * scale} ${(layer.props.width || 100) * scale},${(layer.props.height || 100) * scale} ${(layer.props.width || 100) * scale / 2},0`}
                                fill={layer.props.fill || "#3B82F6"}
                              />
                            </svg>
                          );

                        case "polygon":
                          if (!layer.props.points) return null;
                          const pointsStr = layer.props.points
                            .map((p: { x: number; y: number }) => `${p.x * scale},${p.y * scale}`)
                            .join(" ");
                          return (
                            <svg
                              key={layer.id}
                              className="absolute"
                              style={{
                                left: (layer.props.left || 0) * scale,
                                top: (layer.props.top || 0) * scale,
                                width: (layer.props.width || 100) * scale,
                                height: (layer.props.height || 100) * scale,
                              }}
                            >
                              <polygon points={pointsStr} fill={layer.props.fill || "#3B82F6"} />
                            </svg>
                          );

                        case "wave":
                          if (!layer.props.path) return null;
                          const gradientId = `grad-${template.id}-${layer.id}`;
                          const gradientColors: string[] = layer.props.gradient?.colors || ["#3B82F6", "#06b6d4"];
                          return (
                            <svg
                              key={layer.id}
                              className="absolute"
                              style={{
                                left: (layer.props.left || 0) * scale,
                                top: (layer.props.top || 0) * scale,
                                width: (layer.props.width || 350) * scale,
                                height: (layer.props.height || 70) * scale,
                              }}
                              viewBox="0 0 1440 320"
                              preserveAspectRatio="none"
                            >
                              <defs>
                                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                                  {gradientColors.map((c, i) => (
                                    <stop key={i} offset={`${(i / (gradientColors.length - 1)) * 100}%`} stopColor={c} />
                                  ))}
                                </linearGradient>
                              </defs>
                              <path d={layer.props.path} fill={`url(#${gradientId})`} transform="scale(0.33,0.33)" />
                            </svg>
                          );

                        case "text":
                          return (
                            <div
                              key={layer.id}
                              className="absolute text-xs truncate"
                              style={{
                                left: (layer.props.left || 0) * scale,
                                top: (layer.props.top || 0) * scale,
                                color: layer.props.fill || "#111827",
                                fontSize: Math.max(8, (layer.props.fontSize || 12) * scale),
                                fontWeight: layer.props.fontWeight || "normal",
                                maxWidth: "80%",
                              }}
                            >
                              {layer.props.text || "Text"}
                            </div>
                          );

                        default:
                          return null;
                      }
                    })}

                  </div>
                ))}

                {/* Carousel dots inside preview */}
                {pages.length > 1 && (
                  <div className="flex justify-center items-center gap-1 mb-1">
                    {pages.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-1 h-1 rounded-full transition-colors ${
                          idx === activePage ? "bg-blue-500" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="p-1 h-6 text-center text-xs truncate">{template.name}</div>
            </div>
          );
        })}
        {filteredTemplates.length === 0 && (
          <div className="col-span-2 text-center text-gray-500 text-xs mt-4">
            No templates found
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignMenu;
