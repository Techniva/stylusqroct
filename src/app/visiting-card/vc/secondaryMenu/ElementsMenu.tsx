"use client";

import React, { FC, useEffect, useState } from "react";
import fabric from "fabric";
import {
  elementCategories as staticCategories,
  ElementItem,
  ElementCategory,
} from "../data/elementCategories";

interface ElementsMenuProps {
  canvas: fabric.Canvas;
  handleAddElement?: (item: ElementItem, left?: number, top?: number) => void;
  textColor?: string;
  fontSize?: number;
  setTextColor?: (color: string) => void;
  setFontSize?: (size: number) => void;
  handleAddText: () => void;
}

const ElementsMenu: FC<ElementsMenuProps> = ({ canvas, handleAddElement }) => {
  const [categories, setCategories] = useState<ElementCategory[]>(staticCategories);
  const [selectedCategory, setSelectedCategory] = useState("Shapes");
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------------- Fetch Stickers ---------------- */
  useEffect(() => {
    fetch("/api/visiting-card/stickers")
      .then((res) => res.json())
      .then((stickers: ElementItem[]) => {
        setCategories((prev) => {
          const without = prev.filter((cat) => cat.type !== "Stickers");
          return [...without, { type: "Stickers", items: stickers }];
        });
      })
      .catch(console.error);
  }, []);

  /* ---------------- Ensure valid selected category ---------------- */
  useEffect(() => {
    if (!categories.length) return;
    if (!categories.some((c) => c.type === selectedCategory))
      setSelectedCategory(categories[0].type);
  }, [categories, selectedCategory]);

  const currentItems: ElementItem[] =
    categories.find((c) => c.type === selectedCategory)?.items || [];

  const filteredItems = currentItems.filter((item) =>
    (item.name || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* ---------------- Add element to canvas ---------------- */
  const addElementToCanvas = (item: ElementItem, left?: number, top?: number) => {
    if (!canvas) return;
    if (handleAddElement) {
      handleAddElement(item, left, top);
      return;
    }
    if (!item.toLayer) return;

    const layer = item.toLayer();
    if (!layer) return;

    if (layer.type === "image") {
      const imgEl = new Image();
      imgEl.crossOrigin = "anonymous";
      imgEl.onload = () => {
        const imgObj = new (fabric.Image as any)(imgEl, layer.props);
        canvas.add(imgObj);
        canvas.setActiveObject(imgObj);
        canvas.requestRenderAll();
      };
      imgEl.src = layer.props.src;
      return;
    }

    let obj: fabric.Object | null = null;
    const props = { ...layer.props };
    if (typeof left === "number") props.left = left;
    if (typeof top === "number") props.top = top;

    switch (layer.type) {
      case "rect":
        obj = new fabric.Rect(props);
        break;
      case "circle":
        obj = new fabric.Circle(props);
        break;
      case "triangle":
        try {
          obj = new (fabric as any).Triangle(props);
        } catch {
          obj = new fabric.Polygon(
            [
              { x: 0, y: 0 },
              { x: props.width || 80, y: 0 },
              { x: (props.width || 80) / 2, y: props.height || 80 },
            ],
            { ...props, objectCaching: false }
          );
        }
        break;
      case "ellipse":
        obj = new fabric.Ellipse(props);
        break;
      case "line":
        obj = new fabric.Line([props.x1, props.y1, props.x2, props.y2], props);
        break;
      case "polygon":
        obj = new fabric.Polygon(props.points, props);
        break;
    }

    if (obj) {
      canvas.add(obj);
      canvas.setActiveObject(obj);
      canvas.requestRenderAll();
    }
  };

  /* ---------------- Drag & Drop ---------------- */
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: ElementItem) => {
    e.dataTransfer.setData("element-id", item.id);
    e.dataTransfer.effectAllowed = "copy";
  };

  useEffect(() => {
    if (!canvas) return;

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const rect = (canvas as any).upperCanvasEl.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const itemId = e.dataTransfer?.getData("element-id");
      if (!itemId) return;

      let droppedItem: ElementItem | undefined;
      for (const cat of categories) {
        droppedItem = cat.items.find((i) => i.id === itemId);
        if (droppedItem) break;
      }

      if (droppedItem) addElementToCanvas(droppedItem, x, y);
    };

    const handleDragOver = (e: DragEvent) => e.preventDefault();

    const canvasEl = (canvas as any).upperCanvasEl;
    canvasEl.addEventListener("drop", handleDrop);
    canvasEl.addEventListener("dragover", handleDragOver);

    return () => {
      canvasEl.removeEventListener("drop", handleDrop);
      canvasEl.removeEventListener("dragover", handleDragOver);
    };
  }, [canvas, categories]);

  /* ---------------- Render ---------------- */
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {categories.map((cat) => (
          <button
            key={cat.type}
            onClick={() => {
              setSelectedCategory(cat.type);
              setSearchQuery("");
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat.type
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.type}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={`Search ${selectedCategory.toLowerCase()}...`}
        className="w-full pl-3 pr-10 py-2 rounded-lg border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
      />

      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-3 h-[400px] overflow-y-auto scrollbar-hide p-1">
        {filteredItems.map((item) => {
          const imageUrl = item.previewUrl || item.sourceUrl || (item as any).url || (item as any).imageUrl;

          return (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onClick={() => addElementToCanvas(item)}
              className="relative group cursor-pointer border rounded-lg shadow-sm hover:shadow-lg hover:scale-[1.05] transition-transform flex items-center justify-center bg-white h-24"
            >
              {/* Preview */}
              <div className="flex items-center justify-center w-full h-full p-2">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.name || "item"}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : item.toLayer ? (
                  (() => {
                    const layer = item.toLayer();
                    if (!layer) return null;

                    const commonProps = "max-h-full max-w-full";

                    if (layer.type === "polygon" && Array.isArray((layer.props as any).points)) {
                      const pts = (layer.props as any).points.map((p: any) => `${p.x},${p.y}`).join(" ");
                      return <svg className={`${commonProps} w-full h-full`} viewBox="0 0 120 120"><polygon points={pts} fill={(layer.props as any).fill || "#EC4899"} /></svg>;
                    }

                    switch (layer.type) {
                      case "rect":
                        return <svg className={commonProps} viewBox="0 0 64 40"><rect width="64" height="40" fill={layer.props.fill || "#F87171"} /></svg>;
                      case "circle":
                        return <svg className={commonProps} viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill={layer.props.fill || "#34D399"} /></svg>;
                      case "triangle":
                        return <svg className={commonProps} viewBox="0 0 64 64"><polygon points="32,0 64,64 0,64" fill={layer.props.fill || "#3B82F6"} /></svg>;
                      case "ellipse":
                        return <svg className={commonProps} viewBox="0 0 64 40"><ellipse cx="32" cy="20" rx="32" ry="20" fill={layer.props.fill || "#8B5CF6"} /></svg>;
                      case "line":
                        return <svg className={commonProps} viewBox="0 0 64 8"><line x1="0" y1="4" x2="64" y2="4" stroke={layer.props.stroke || "#10B981"} strokeWidth="4"/></svg>;
                      default:
                        return <span className="text-sm">{item.name}</span>;
                    }
                  })()
                ) : (
                  <span className="text-sm">{item.name}</span>
                )}
              </div>

              {/* Hover + icon */}
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-all duration-300 transform scale-75 group-hover:scale-100 cursor-pointer">
                <span className="text-white text-3xl animate-pulse">+</span>
              </div>

              {/* Label */}
              <span className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 text-[11px] font-semibold text-gray-700 px-2 py-0.5 rounded-md pointer-events-none capitalize">
                {item.name}
              </span>
            </div>
          );
        })}

        {filteredItems.length === 0 && (
          <div className="col-span-2 flex flex-col items-center justify-center text-gray-500 text-sm mt-8">
            No {selectedCategory.toLowerCase()} found
          </div>
        )}
      </div>
    </div>
  );
};

export default ElementsMenu;
