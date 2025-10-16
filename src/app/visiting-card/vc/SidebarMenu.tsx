"use client";

import React, { FC, useEffect, useState, ChangeEvent } from "react";
import { Layout, Layers, Type, UploadCloud, Settings, ChevronLeft } from "lucide-react";
import fabric from "fabric";

import DesignMenu from "./secondaryMenu/DesignMenu";
import SaveMenu from "./secondaryMenu/SaveMenu";
import TextMenu from "./secondaryMenu/TextMenu";
import ElementsMenu from "./secondaryMenu/ElementsMenu";
import UploadsMenu from "./secondaryMenu/UploadsMenu";
import ColorsMenu from "./secondaryMenu/ColorsMenu";

import { templateCategories, Template, Layer } from "./data/templateCategories";
import { useRouter, useSearchParams } from "next/navigation";
import VisitingCardPreview from "./components/VisitingCardPreview";

// ----------------- TYPES -----------------
export type FabricObject = fabric.Object & { isBackground?: boolean };

type DigitalBusinessCard = {
  id: number;
  uniqueCode: string;
  name: string;
  title: string | null;
  company: string | null;
  profileUrl?: string | null;
  published: boolean;
};

interface UploadedFile {
  id: string;
  name: string;
  url: string;
}

interface SidebarMenuProps {
  canvas: fabric.Canvas;
  selectedObject: FabricObject | null;
  isSaving: boolean;
  textColor: string;
  fontSize: number;
  shapeColor: string;
  handleAddText: () => void;
  handleAddRect: () => void;
  handleDelete: () => void;
  handleBringForward: () => void;
  handleSendBackward: () => void;
  setTextColor: (color: string) => void;
  setFontSize: (size: number) => void;
  handleSaveCard: () => void;
  handleAddWave: () => void;
  loadTemplate?: (templateJSON: string) => void;
  handleSelectTemplate: (templateId: string, pageIndex?: number) => void;
  handleAddElement?: (item: any, left?: number, top?: number) => void;
  // External control to open a secondary menu (e.g. from FloatingToolbar)
  externalActiveMenu?: string | null;
  onRequestCloseMenu?: () => void;
  onColorSelect?: (color: string) => void;
  initialColor?: string | null;
}

// ----------------- COMPONENT -----------------
const SidebarMenu: FC<SidebarMenuProps> = ({
  canvas,
  selectedObject,
  isSaving,
  textColor,
  fontSize,
  shapeColor,
  handleAddText,
  handleAddRect,
  handleAddWave,
  handleDelete,
  handleBringForward,
  handleSendBackward,
  setTextColor,
  setFontSize,
  handleSaveCard,
  handleSelectTemplate, // <-- add this prop here so page handler is available
  handleAddElement,
  externalActiveMenu,
  onRequestCloseMenu,
  onColorSelect,
  initialColor,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [activeTemplateId, setActiveTemplateId] = useState<string | null>(null);
  const [activeTemplatePage, setActiveTemplatePage] = useState<number>(0);
  const [selectedDbc, setSelectedDbc] = useState<DigitalBusinessCard | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const menuItems = [
    { key: "design", icon: <Layout size={24} />, label: "Design" },
    { key: "elements", icon: <Layers size={24} />, label: "Elements" },
    { key: "text", icon: <Type size={24} />, label: "Text" },
    { key: "uploads", icon: <UploadCloud size={24} />, label: "Uploads" },
    { key: "tools", icon: <Settings size={24} />, label: "Tools" },
  ];

  // ----------------- FETCH DIGITAL BUSINESS CARD -----------------
  useEffect(() => {
    const uniqueCode = searchParams?.get("uniqueCode");
    if (!uniqueCode) return setSelectedDbc(null);

    const fetchCard = async () => {
      try {
        const res = await fetch(`/api/visiting-card/get-dbccard?uniqueCode=${uniqueCode}`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data: DigitalBusinessCard = await res.json();
          setSelectedDbc(data);
        } else if (res.status === 404) {
          setSelectedDbc(null);
        } else if (res.status === 401) {
          router.replace("/login");
        } else {
          console.error("Failed to fetch card, status:", res.status);
        }
      } catch (err) {
        console.error("Error fetching card:", err);
        setSelectedDbc(null);
      }
    };

    fetchCard();
  }, [searchParams, router]);

  // ----------------- FILE HANDLING -----------------
  const handleSelectFile = (fileId: string) => setSelectedFileId(fileId);

  const handleDeleteFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
    if (selectedFileId === fileId) setSelectedFileId(null);
  };

  const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) return;

    const newFile: UploadedFile = {
      id: crypto.randomUUID(),
      name: files[0].name,
      url: URL.createObjectURL(files[0]),
    };
    setUploadedFiles((prev) => [newFile, ...prev]);
  };

  // ----------------- TEMPLATE HANDLING -----------------
  const applyTemplateToCanvas = (templateId: string, pageIndex = 0) => {
    if (!canvas) return;

    // Clear canvas
    canvas.getObjects().forEach((o) => canvas.remove(o));

    let selectedTemplate: Template | undefined;
    for (const cat of templateCategories) {
      selectedTemplate = cat.templates.find((t) => t.id === templateId);
      if (selectedTemplate) break;
    }
    if (!selectedTemplate) return;

    const page = selectedTemplate.pages[pageIndex] ?? selectedTemplate.pages[0];
    if (!page) return;

    // Add background
    const backgroundLayer = page.layers.find((l) => l.type === "background");
    if (backgroundLayer) {
      const bg = new fabric.Rect({
        left: 0,
        top: 0,
        width: canvas.getWidth(),
        height: canvas.getHeight(),
        fill: backgroundLayer.props.fill || "#fff",
        selectable: false,
        evented: false,
      }) as FabricObject;

      bg.isBackground = true;
      canvas.add(bg);
      (canvas as any).sendToBack(bg);
    }

    // Add other layers
    page.layers
      .filter((l) => l.type !== "background")
      .forEach((layer: Layer) => {
        let fabricObject: fabric.Object | null = null;

        switch (layer.type) {
          case "rect":
            fabricObject = new fabric.Rect({ ...(layer.props || {}), selectable: true, evented: true });
            break;
          case "circle":
            fabricObject = new fabric.Circle({ ...(layer.props || {}), selectable: true, evented: true });
            break;
          case "triangle":
            try {
              // Prefer the built-in Triangle constructor when available
              fabricObject = new (fabric as any).Triangle({ ...(layer.props || {}), selectable: true, evented: true });
            } catch (e) {
              // Fallback: create a polygon that represents a triangle
              const props = layer.props || {};
              const width = props.width ?? 100;
              const height = props.height ?? 100;
              const left = props.left ?? 0;
              const top = props.top ?? 0;
              // Points relative to the top-left origin so the polygon draws a proper triangle
              const points = [
                { x: 0, y: 0 },
                { x: width, y: 0 },
                { x: width / 2, y: height },
              ];

              fabricObject = new fabric.Polygon(points, {
                left,
                top,
                fill: props.fill ?? '#3B82F6',
                selectable: true,
                evented: true,
                originX: 'left',
                originY: 'top',
                objectCaching: false,
              });
            }
            break;
          case "text":
            // Use a Textbox so text is editable and behaves like other places in the app
            try {
              const TextboxCtor = (fabric as any).Textbox || (fabric as any).IText || (fabric as any).Text;
              fabricObject = new TextboxCtor(layer.props?.text || "Edit me", {
                ...(layer.props || {}),
                selectable: true,
                editable: true,
                objectCaching: false,
                editingBorderColor: "blue",
              });
            } catch (e) {
              // Fallback to fabric.Text if Textbox isn't available in this build
              fabricObject = new (fabric as any).Text(layer.props?.text || "Edit me", { ...(layer.props || {}), selectable: true });
            }
            break;
          case "image":
            if (layer.props.url) {
              fabric.Image.fromURL(layer.props.url, { crossOrigin: "anonymous" })
                .then((img) => {
                  img.set({ ...layer.props });
                  canvas.add(img);
                  canvas.renderAll();
                })
                .catch((err) => console.error("Error loading image:", err));
            }
            break;
          case "wave":
            if (!layer.props.path) return;
            const fill =
              layer.props.gradient instanceof Object
                ? new fabric.Gradient({
                    type: layer.props.gradient.type ?? "linear",
                    coords: {
                      x1: layer.props.gradient.x1 ?? 0,
                      y1: layer.props.gradient.y1 ?? 0,
                      x2: layer.props.gradient.x2 ?? 1,
                      y2: layer.props.gradient.y2 ?? 0,
                    },
                    colorStops: (layer.props.gradient.colors || []).map(
                      (color: string, i: number, arr: string[]) => ({
                        offset: i / (arr.length - 1),
                        color,
                      })
                    ),
                  })
                : layer.props.fill ?? "#3B82F6";

            fabricObject = new fabric.Path(layer.props.path, {
              left: layer.props.left ?? 0,
              top: layer.props.top ?? 0,
              fill,
              opacity: layer.props.opacity ?? 1,
              scaleX: layer.props.scaleX ?? 0.42,
              scaleY: layer.props.scaleY ?? 0.35,
            });
            break;
          default:
            console.warn(`Unknown layer type: ${layer.type}`);
        }

        if (fabricObject) canvas.add(fabricObject);
      });

    canvas.renderAll();

    setActiveTemplateId(templateId);
    setActiveTemplatePage(pageIndex);
  };

  const loadTemplatePage = (templateId: string, pageIndex: number) => {
    // Prefer the page-level handler passed in from CreateVisitingCardPage.
    // If it's not provided for some reason, fall back to the local applyTemplateToCanvas.
    if (handleSelectTemplate) {
      handleSelectTemplate(templateId, pageIndex);
    } else {
      applyTemplateToCanvas(templateId, pageIndex);
    }
  };

  // ----------------- BACKGROUND COLOR HELPER -----------------
  const setBackgroundColor = (color: string) => {
    if (!canvas) return;
    const bg = canvas.getObjects().find((obj) => (obj as FabricObject).isBackground);
    if (bg) {
      bg.set({ fill: color });
      canvas.requestRenderAll();
    }
  };

  // Mirror externalActiveMenu into internal activeMenu state so other UI (FloatingToolbar) can open the sidebar menu
  useEffect(() => {
    if (externalActiveMenu) setActiveMenu(externalActiveMenu);
    else setActiveMenu((prev) => prev ? null : null);
  }, [externalActiveMenu]);

  // ----------------- RENDER SECONDARY MENU -----------------
  const renderMenuContent = () => {
    switch (activeMenu) {
      case "design":
        return (
          <DesignMenu
            handleSelectTemplate={handleSelectTemplate ?? applyTemplateToCanvas}
          />
        );
      case "elements":
        return (
          <ElementsMenu
            canvas={canvas}
            textColor={textColor}
            fontSize={fontSize}
            setTextColor={setTextColor}
            setFontSize={setFontSize}
            handleAddText={handleAddText}
            handleAddElement={handleAddElement}
          />
        );
      case "text":
        return (
          <TextMenu
            selectedObject={selectedObject}
            handleBringForward={handleBringForward}
            handleSendBackward={handleSendBackward}
            handleDelete={handleDelete}
            handleAddText={handleAddText}
            textColor={textColor}
            fontSize={fontSize}
            setTextColor={setTextColor}
            setFontSize={setFontSize}
            canvas={canvas}
          />
        );
      case "uploads":
        return (
          <UploadsMenu
            uploadedFiles={uploadedFiles}
            handleAddImage={handleAddImage}
            handleSelectFile={handleSelectFile}
            handleDeleteFile={handleDeleteFile} 
            handleAddFilter={function (fileUrl: string): void {
              throw new Error("Function not implemented.");
            } }          
            />
        );
      case "tools":
        return <SaveMenu isSaving={isSaving} handleSaveCard={handleSaveCard} />;
      case "colors":
        return (
          <ColorsMenu
            initialColor={initialColor ?? undefined}
            // Selecting a color should apply it but NOT close the sidebar; the Close
            // button (onClose) controls when the secondary sidebar closes.
            onSelect={(c) => {
              onColorSelect && onColorSelect(c);
            }}
            onClose={() => {
              setActiveMenu(null);
              onRequestCloseMenu && onRequestCloseMenu();
            }}
          />
        );
      default:
        return (
          <div className="p-4 text-gray-500">
            Select a menu option to get started.
          </div>
        );
    }
  };

  const activeLabel = menuItems.find((item) => item.key === activeMenu)?.label ?? (activeMenu === "colors" ? "Colors" : "");

  // ----------------- JSX -----------------
  return (
    <div className="flex h-full relative">
      {/* Primary Sidebar */}
      <div className="bg-white shadow-lg w-20 flex flex-col items-center py-4 space-y-4 z-10">
        {menuItems.map(({ key, icon, label }) => (
          <div key={key} className="flex flex-col items-center">
            <button
              className={`p-1 rounded-lg ${
                activeMenu === key ? "bg-[#2a0062] text-white" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveMenu((prev) => (prev === key ? null : key))}
            >
              {icon}
            </button>
            <span className="text-xs mt-1 text-gray-600">{label}</span>
          </div>
        ))}
      </div>

      {/* Canvas Preview / DBC */}
      {selectedDbc ? (
        <VisitingCardPreview card={selectedDbc} />
      ) : (
        !activeMenu && (
          <div
            className="absolute top-6 left-1/2 -translate-x-1/2 max-w-xs bg-gradient-to-r from-blue-50 to-purple-50
            shadow-md border border-gray-100 rounded-xl px-6 py-4 text-sm text-gray-600 text-center animate-fadeIn"
          >
            👋 <span className="font-semibold text-gray-800">Start customizing your visiting card!</span>
            <br />
            Use the <span className="font-semibold text-blue-500">left menu</span> to add{" "}
            <span className="font-medium">Text</span>, <span className="font-medium">Shapes</span>,{" "}
            <span className="font-medium">Images</span>, and more.
          </div>
        )
      )}

      {/* Secondary Sidebar */}
      <div
        className={`absolute top-0 left-[74px] h-full pb-16 w-96 bg-white z-0 transition-transform duration-300 ${
          activeMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="font-semibold text-lg text-gray-800">{activeLabel}</h2>
          <button className="hover:bg-gray-200 rounded" onClick={() => { setActiveMenu(null); onRequestCloseMenu && onRequestCloseMenu(); }}>
            <ChevronLeft size={24} />
          </button>
        </div>
        <div className="h-full ml-1">{renderMenuContent()}</div>
      </div>
    </div>
  );
};

// Listen to externalActiveMenu prop changes and mirror them into internal state
// This is placed after the component definition so React hooks are not violated in the main component.
export default SidebarMenu;
