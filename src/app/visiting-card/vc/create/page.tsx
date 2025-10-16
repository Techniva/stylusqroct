"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, Textbox, Rect, Circle, Path, FabricObject } from "fabric";
import fabric from "fabric";

import SidebarMenu from "../SidebarMenu";
import VisitingCardToolbar from "../ui/VisitingCardToolbar";
import FloatingToolbar from "../ui/FloatingToolbar";
import RightScrollbar from "../components/RightScrollbar";
import { Layer, Template, templateCategories } from "../data/templateCategories";
import ZoomControls from "../ui/ZoomControls";

// ---------------- Fabric Object Extension ----------------
export interface CanvasObject extends FabricObject {
  isBackground?: boolean;
}

// ---------------- Main Component ----------------
export default function CreateVisitingCardPage() {
  const canvasRef = useRef<Canvas | null>(null);
  const htmlCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const isRestoringRef = useRef(false);
  const lastSavedAtRef = useRef(0);
  const MAX_HISTORY = 50;

  const [selectedObject, setSelectedObject] = useState<CanvasObject | null>(null);
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(24);
  const [shapeColor, setShapeColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [isSaving, setIsSaving] = useState(false);

  const [pages, setPages] = useState<number[]>([1]);
  const [activePage, setActivePage] = useState<number>(1);
  const [thumbnails, setThumbnails] = useState<{ [key: number]: { front?: string; back?: string } }>({});
  // active side (front/back) must be declared before any refs that capture it
  const [activeSide, setActiveSide] = useState<"front" | "back">("front");
  // keep refs of active page/side so canvas event handlers (which are created once) can access latest values
  const activePageRef = useRef(activePage);
  const activeSideRef = useRef(activeSide);

  useEffect(() => { activePageRef.current = activePage; }, [activePage]);
  useEffect(() => { activeSideRef.current = activeSide; }, [activeSide]);
  const [zoom, setZoom] = useState(1);
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const [redoStack, setRedoStack] = useState<string[]>([]);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  // Sidebar external menu control for opening secondary menus (e.g. Colors)
  const [sidebarExternalMenu, setSidebarExternalMenu] = useState<string | null>(null);
  const [sidebarInitialColor, setSidebarInitialColor] = useState<string | null>(null);

  // Clear captured color target when external sidebar menu is closed
  useEffect(() => {
    if (!sidebarExternalMenu) {
      sidebarColorTargetRef.current = null;
    }
  }, [sidebarExternalMenu]);

  const [pageContents, setPageContents] = useState<{ [key: number]: { front?: string; back?: string } }>({});
  // in-memory preview shown immediately after selecting a design template
  const [appliedTemplateThumbnails, setAppliedTemplateThumbnails] = useState<{ front?: string; back?: string } | null>(null);
  const floatingToolbarRef = useRef<HTMLDivElement | null>(null);
  const [canvasToolbarVisible, setCanvasToolbarVisible] = useState(false);
  const [canvasToolbarStyle, setCanvasToolbarStyle] = useState({ top: 0, left: 0 });

  // Ref to capture the object (or null) that the ColorsMenu should target.
  // This avoids a race where a mousedown on the sidebar clears selection before
  // the ColorsMenu click handler runs, causing the app to think there is no
  // selection and apply the color to the background instead.
  const sidebarColorTargetRef = useRef<CanvasObject | null>(null);

  // ---------------- Save State ----------------
  const saveState = (options?: { replaceLast?: boolean }) => {
    const canvas = canvasRef.current;
    if (!canvas || isRestoringRef.current) return;

    const now = Date.now();
    if (now - lastSavedAtRef.current < 200 && !options?.replaceLast) return;
    lastSavedAtRef.current = now;

    try {
      const json = JSON.stringify(canvas.toJSON());
      setUndoStack(prev => {
        if (prev.length && prev[prev.length - 1] === json) return prev;
        const next = options?.replaceLast ? [...prev.slice(0, -1), json] : [...prev, json];
        if (next.length > MAX_HISTORY) next.splice(0, next.length - MAX_HISTORY);
        return next;
      });
      setRedoStack([]);
    } catch (err) {
      console.error("saveState error:", err);
    }
  };

  // safe export: try fabric.Canvas.toDataURL, fall back to SVG data URL when toDataURL is blocked
  const safeExportCanvasDataUrl = (canvas: any, options?: any) => {
    try {
      // fabric.Canvas.toDataURL exists and may throw DOMException on tainted canvas
      if (typeof canvas.toDataURL === 'function') {
        return canvas.toDataURL(options || { format: 'png', multiplier: 1 });
      }
    } catch (e) {
      console.warn('safeExportCanvasDataUrl: toDataURL failed, falling back to SVG', e);
    }

    try {
      // fallback to SVG serialized data URL
      const svg = canvas.toSVG?.() ?? '';
      if (!svg) return '';
      const base64 = typeof window !== 'undefined' ? window.btoa(unescape(encodeURIComponent(svg))) : Buffer.from(svg).toString('base64');
      return `data:image/svg+xml;base64,${base64}`;
    } catch (e) {
      console.error('safeExportCanvasDataUrl: fallback SVG export failed', e);
      return '';
    }
  };

  // ---------------- Initialize Canvas ----------------
  useEffect(() => {
    if (!htmlCanvasRef.current) return;

    const canvas = new Canvas(htmlCanvasRef.current, {
      width: 700,
      height: 408,
      selection: true,
    });

    // ------------------ Modern Selection Styling ------------------
    // @ts-ignore
    Canvas.prototype._createObjectControls = function (obj: any) {
      obj.cornerStyle = "circle";
      obj.cornerColor = "#007bff";
      obj.cornerStrokeColor = "#fff";
      obj.cornerSize = 10;
      obj.transparentCorners = false;
      obj.borderColor = "#007bff";
      obj.rotatingPointOffset = 30;
      obj.hasRotatingPoint = true;
    };

    // ------------------ Immutable background ------------------
    const bg: CanvasObject = new Rect({
      left: 0,
      top: 0,
      width: canvas.getWidth(),
      height: canvas.getHeight(),
      fill: backgroundColor,
      selectable: false,
      evented: false,
      isBackground: true,
    });
    canvas.add(bg);
    canvasRef.current = canvas;

    // ------------------ Save on changes ------------------
    // When canvas changes (object added/modified/removed) we save state AND
    // update the in-memory pageContents + thumbnail for the currently active page & side
    const saveHandler = () => {
      saveState();

      try {
        // Use refs to read the latest active page/side inside this handler
        const currentPage = activePageRef.current;
        const currentSide = activeSideRef.current;
        // capture JSON and a quick thumbnail (smaller multiplier for performance)
        const json = JSON.stringify(canvas.toJSON());
        const dataUrl = safeExportCanvasDataUrl(canvas, { format: 'png', multiplier: 0.5 });

        setPageContents(prev => ({
          ...prev,
          [currentPage]: {
            ...(typeof prev[currentPage] === "object" && prev[currentPage] !== null ? prev[currentPage] : {}),
            [currentSide]: json,
          }
        }));

        setThumbnails(prev => ({
          ...prev,
          [currentPage]: {
            ...(prev[currentPage] || {}),
            [currentSide]: dataUrl,
          }
        }));
      } catch (e) {
        console.warn('saveHandler thumbnail update failed', e);
      }
    };

    canvas.on("object:added", saveHandler);
    canvas.on("object:modified", saveHandler);
    canvas.on("object:removed", saveHandler);

    // ------------------ Selection handling ------------------
    const handleSelection = (e: any) => {
      const obj = e.selected?.[0] as CanvasObject | undefined;
      if (!obj || obj.isBackground) {
        canvas.discardActiveObject();
        setSelectedObject(null);
        canvas.renderAll();
        return;
      }

      // Keep the object selected so the normal Fabric controls (scale/rotate) are available
      setSelectedObject(obj);

      // NOTE: do NOT automatically enter editing mode on selection. Automatically entering
      // editing causes Fabric to hide object controls (so the textbox cannot be resized).
      // Editing will instead be triggered explicitly on double-click (handled below).
    };

    canvas.on("selection:created", handleSelection);
    canvas.on("selection:updated", handleSelection);
    canvas.on("selection:cleared", () => setSelectedObject(null));

    // Show a small canvas toolbar when the user clicks empty canvas area
    const handleMouseDown = (opt: any) => {
      try {
        // If user double-clicks a textbox, enter edit mode (don't auto-enter on single click)
        if (opt.target && opt.e && (opt.e as any).detail === 2 && (opt.target as any).type === 'textbox') {
          try {
            const tb = opt.target as Textbox;
            // make sure textbox is the active object before entering edit mode
            canvas.setActiveObject(tb);
            tb.enterEditing();
            tb.selectAll();
            // don't proceed to other handlers -- we're editing now
            return;
          } catch (err) {
            console.warn('failed to enter textbox edit mode on dblclick', err);
          }
        }

        if (!opt.target) {
          // clicked the empty canvas (background)
          setSelectedObject(null);
          setCanvasToolbarVisible(true);

          const rect = canvasContainerRef.current?.getBoundingClientRect();
          if (rect && opt?.e && typeof opt.e.clientX === 'number') {
            // Position relative to the canvas container
            const x = opt.e.clientX - rect.left;
            const y = opt.e.clientY - rect.top;
            setCanvasToolbarStyle({ top: y, left: x });
          } else {
            setCanvasToolbarStyle({ top: 10, left: 10 });
          }
        } else {
          // clicked an object
          setCanvasToolbarVisible(false);
        }
      } catch (e) {
        console.error('canvas mouse down handler error', e);
      }
    };

    canvas.on('mouse:down', handleMouseDown);

    // If a Textbox is scaled via controls, convert the scaling into explicit width/height
    // changes and reset scale to 1 so the text reflows instead of being visually scaled.
    const handleObjectScaling = (e: any) => {
      try {
        const t = e.target as any;
        if (!t) return;

        // Handle fabric.Textbox instances (type may be 'textbox' in some builds)
        const isTextbox = (t.type === 'textbox') || (typeof (t as Textbox).text === 'string' && typeof (t as any).width === 'number');
        if (!isTextbox) return;

        const tb = t as any;
        const currentWidth = tb.width || 0;
        const currentHeight = tb.height || 0;
        const scaleX = typeof tb.scaleX === 'number' ? tb.scaleX : 1;
        const scaleY = typeof tb.scaleY === 'number' ? tb.scaleY : 1;

        const newWidth = Math.max(20, Math.round(currentWidth * scaleX));
        const newHeight = Math.max(10, Math.round(currentHeight * scaleY));

        // Apply new dimensions and reset scale so the textbox reflows
        tb.set({ width: newWidth, height: newHeight, scaleX: 1, scaleY: 1 });
        // Ensure controls remain visible while resizing
        canvas.renderAll();
      } catch (err) {
        console.warn('object:scaling handler error', err);
      }
    };

    canvas.on('object:scaling', handleObjectScaling);

    saveState({ replaceLast: false });

    return () => {
      canvas.off("object:added", saveHandler);
      canvas.off("object:modified", saveHandler);
      canvas.off("object:removed", saveHandler);
      canvas.off("selection:created", handleSelection);
      canvas.off("selection:updated", handleSelection);
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('object:scaling', handleObjectScaling);
      // Prefer to call dispose if available, but guard against builds where it's not
      try {
        if (typeof canvas.dispose === 'function') {
          // dispose() may return a Promise
          const res = canvas.dispose();
          if (res && typeof res.then === 'function') res.catch(() => {});
        } else if (typeof (canvas as any).destroy === 'function') {
          try { (canvas as any).destroy(); } catch (e) {}
        }
      } catch (e) {
        console.warn('canvas cleanup failed', e);
      }
    };
  }, [backgroundColor]);

  // keep the immutable background in sync when backgroundColor changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const bg = canvas.getObjects().find(o => (o as CanvasObject).isBackground) as any;
      if (bg) {
        bg.set('fill', backgroundColor);
        canvas.renderAll();
        // record change but avoid spamming history -- replace last
        saveState({ replaceLast: true });
      }
    } catch (e) {
      console.error('failed to update bg fill', e);
    }
  }, [backgroundColor]);

  // hide the canvas toolbar when an object becomes selected
  useEffect(() => {
    if (selectedObject) setCanvasToolbarVisible(false);
  }, [selectedObject]);

  // ---------------- Load Template ----------------
  const loadTemplate = (templateJSON: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    isRestoringRef.current = true;
    canvas.loadFromJSON(templateJSON, () => {
      const bg = canvas.getObjects().find(o => (o as CanvasObject).isBackground);
      if (bg) safeSendToBack(canvas, bg);
      canvas.renderAll();
      isRestoringRef.current = false;
      saveState();
    });
  };

  // ---------------- Select Template ----------------
  const [frontTemplateId, setFrontTemplateId] = useState<string | null>(null);
  const [backTemplateId, setBackTemplateId] = useState<string | null>(null);
  
  const handleSelectTemplate = (templateId: string, pageIndex?: number) => {
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      if (!templateId) {
        console.warn("handleSelectTemplate: missing templateId");
        return;
      }

      if (!Array.isArray(templateCategories)) {
        console.error("handleSelectTemplate: templateCategories is not an array", templateCategories);
        return;
      }

      // Find the selected template
      let selectedTemplate: Template | undefined;
      for (const category of templateCategories) {
        if (!category || !Array.isArray((category as any).templates)) continue;
        selectedTemplate = category.templates.find((t) => t && t.id === templateId);
        if (selectedTemplate) break;
      }
      if (!selectedTemplate) {
        console.warn("handleSelectTemplate: template not found", templateId);
        return;
      }

      // Save template ID for active side
      if (activeSide === "front") setFrontTemplateId(templateId);
      else setBackTemplateId(templateId);

      // Determine page (front = 0, back = 1)
      let resolvedPageIndex: number;
      if (typeof pageIndex === "number") {
        resolvedPageIndex = pageIndex;
      } else {
        resolvedPageIndex = activeSide === "front" ? 0 : 1;
      }

      if (!Array.isArray(selectedTemplate.pages) || selectedTemplate.pages.length === 0) {
        console.warn("handleSelectTemplate: selectedTemplate.pages is empty or invalid", selectedTemplate.id);
        return;
      }

      // clamp resolvedPageIndex into valid range
      if (resolvedPageIndex < 0 || resolvedPageIndex >= selectedTemplate.pages.length) {
        console.warn("handleSelectTemplate: resolvedPageIndex out of range, falling back to 0", resolvedPageIndex);
        resolvedPageIndex = 0;
      }

      const page = selectedTemplate.pages[resolvedPageIndex];
      if (!page || !Array.isArray((page as any).layers)) {
        console.warn("handleSelectTemplate: page or page.layers missing", templateId, resolvedPageIndex);
        return;
      }

      // Ensure background exists
      let bg = canvas.getObjects().find((o) => (o as any).isBackground) as CanvasObject | undefined;
      if (!bg) {
        bg = new Rect({
          left: 0,
          top: 0,
          width: canvas.getWidth(),
          height: canvas.getHeight(),
          fill: backgroundColor,
          selectable: false,
          evented: false,
          isBackground: true,
        });
        canvas.add(bg);
        canvas.sendToBack(bg);
      }

      // Remove non-background objects
      canvas.getObjects().slice().forEach((obj) => {
        if (!(obj as any).isBackground) canvas.remove(obj);
      });

      // Add layers from the page. Wrap each layer in try/catch so one bad layer won't crash.
      page.layers.forEach((layer: Layer, idx: number) => {
        try {
          if (!layer || !layer.type) {
            console.warn("handleSelectTemplate: skipping invalid layer", layer, idx);
            return;
          }

          switch (layer.type) {
            case "background":
              if (bg) {
                const fillVal = layer.props?.fill || backgroundColor;
                if (typeof fillVal === 'string' && fillVal.includes('linear-gradient')) {
                  // parse angle + colors and build a fabric.Gradient that respects angle
                  const parsed = parseCssLinearGradient(fillVal);
                  if (parsed && parsed.colors.length) {
                    try {
                      // compute normalized coords from angle (deg). If no angle, default left->right
                      let coords = { x1: 0, y1: 0, x2: 1, y2: 0 };
                      if (typeof parsed.angle === 'number') {
                        const rad = (parsed.angle * Math.PI) / 180;
                        const dx = Math.cos(rad);
                        const dy = Math.sin(rad);
                        // map direction vector to normalized [0..1] coords centered at 0.5
                        coords = {
                          x1: 0.5 - dx / 2,
                          y1: 0.5 - dy / 2,
                          x2: 0.5 + dx / 2,
                          y2: 0.5 + dy / 2,
                        };
                      }

                      const grad = new fabric.Gradient({
                        type: 'linear',
                        coords,
                        colorStops: parsed.colors.map((c: string, i: number, arr: string[]) => ({
                          offset: i / (arr.length - 1 || 1),
                          color: c,
                        })),
                      });
                      bg.set({ fill: grad });
                    } catch (e) {
                      console.warn('failed to create fabric gradient from CSS string, falling back to first color', e);
                      bg.set({ fill: parsed.colors[0] || backgroundColor });
                    }
                  } else {
                    bg.set({ fill: fillVal });
                  }
                } else {
                  bg.set({ fill: fillVal });
                }
              }
              break;

            case "rect":
              canvas.add(new Rect({ ...(layer.props || {}), selectable: true, evented: true }));
              break;

            case "circle":
              canvas.add(new Circle({ ...(layer.props || {}), selectable: true, evented: true }));
              break;

            case "text":
              // Ensure textboxes have a sufficiently large width so short names don't wrap
              try {
                const canvasWidth = canvas.getWidth ? canvas.getWidth() : 600;
                const leftPos = (layer.props && typeof layer.props.left === 'number') ? layer.props.left : 20;
                // Make default width half of the previous calculation so textboxes are not overly wide
                const defaultWidth = Math.max(100, Math.round((canvasWidth - leftPos - 20) / 2));

                canvas.add(
                  new Textbox(layer.props?.text || "Edit me", {
                    ...(layer.props || {}),
                    // prefer explicit width from template, otherwise use calculated default
                    width: layer.props?.width ?? defaultWidth,
                    selectable: true,
                    editable: true,
                    objectCaching: false,
                    lockUniScaling: false,
                    lockScalingFlip: false,
                  })
                );
              } catch (e) {
                // fallback to original behavior on error
                canvas.add(
                  new Textbox(layer.props?.text || "Edit me", {
                    ...(layer.props || {}),
                    selectable: true,
                    editable: true,
                    objectCaching: false,
                    lockUniScaling: false,
                    lockScalingFlip: false,
                  })
                );
              }
              break;

            case "wave":
              if (!layer.props?.path) {
                console.warn("handleSelectTemplate: wave missing path", layer);
                break;
              }
              const fill =
                layer.props.gradient && Array.isArray(layer.props.gradient.colors)
                  ? new fabric.Gradient({
                      type: layer.props.gradient.type || "linear",
                      coords: {
                        x1: layer.props.gradient.x1 ?? 0,
                        y1: layer.props.gradient.y1 ?? 0,
                        x2: layer.props.gradient.x2 ?? 1,
                        y2: layer.props.gradient.y2 ?? 0,
                      },
                      colorStops: (layer.props.gradient?.colors || []).map((color: string, i: number, arr: string[]) => ({
                        offset: i / (arr.length - 1 || 1),
                        color,
                      })),
                    })
                  : layer.props?.fill || "#3B82F6";

              const wave = new Path(layer.props.path, {
                left: layer.props.left ?? 0,
                top: layer.props.top ?? 0,
                fill,
                opacity: layer.props.opacity ?? 1,
                scaleX: layer.props.scaleX ?? 0.42,
                scaleY: layer.props.scaleY ?? 0.35,
                selectable: true,
                evented: true,
              });
              canvas.add(wave);
              (canvas as any).sendToBack(wave);
              break;

            case "image":
              if (layer.props?.url) {
                const options: any = { crossOrigin: "anonymous" };
  
                try {
                  const fromURL = (fabric.Image as any)?.fromURL;
  
                  if (typeof fromURL === "function") {
                    (fabric.Image as any).fromURL(
                      layer.props.url,
                      (img: any) => {
                        try {
                          img.set({ ...(layer.props || {}) });
                          canvas.add(img);
                          canvas.renderAll();
                        } catch (e) {
                          console.error("handleSelectTemplate: image set error", e, layer);
                        }
                      },
                      options
                    );
                  } else {
                    // Fallback: create HTMLImageElement and construct a fabric.Image
                    const imgEl = new Image();
                    imgEl.crossOrigin = 'anonymous';
  
                    let handled = false;
                    const cleanup = () => {
                      imgEl.onload = null;
                      imgEl.onerror = null;
                    };
  
                    imgEl.onload = () => {
                      if (handled) return;
                      handled = true;
                      try {
                        const imgObj = new (fabric.Image as any)(imgEl, { ...(layer.props || {}) });
                        canvas.add(imgObj);
                        canvas.renderAll();
                      } catch (e) {
                        console.error('handleSelectTemplate: fabric.Image construction error', e, layer);
                      } finally {
                        cleanup();
                      }
                    };
  
                    imgEl.onerror = (err) => {
                      if (handled) return;
                      handled = true;
                      console.error('handleSelectTemplate: failed to load image URL', layer.props.url, err);
                      cleanup();
                    };
  
                    const loadTimeout = setTimeout(() => {
                      if (handled) return;
                      handled = true;
                      console.warn('handleSelectTemplate: image load timed out', layer.props.url);
                      cleanup();
                    }, 8000);
  
                    // Ensure timeout cleared when onload/onerror runs
                    const origOnload = imgEl.onload;
                    const origOnerror = imgEl.onerror;
                    imgEl.onload = (e) => {
                      clearTimeout(loadTimeout);
                      origOnload && (origOnload as any)(e);
                    };
                    imgEl.onerror = (e) => {
                      clearTimeout(loadTimeout);
                      origOnerror && (origOnerror as any)(e);
                    };
  
                    imgEl.src = layer.props.url;
                  }
                } catch (e) {
                  console.error('handleSelectTemplate: image load error', e, layer);
                }
              } else {
                console.warn("handleSelectTemplate: image layer missing url", layer);
              }
              break;

            default:
              console.warn("handleSelectTemplate: unknown layer type", layer.type);
          }
        } catch (layerErr) {
          console.error("handleSelectTemplate: error applying layer", layer, layerErr);
        }
      });

      if (bg) {
        safeSendToBack(canvas, bg);
      }
      canvas.renderAll();
      saveState();

      // Immediately capture a quick preview so the RightScrollbar can show the newly-applied template
      try {
        // small multiplier for faster thumbnail
        const quickDataUrl = safeExportCanvasDataUrl(canvas, { format: 'png', multiplier: 0.4 });
        // Render previews for both front and back from the selected template (if available)
        (async () => {
          try {
            const canvasW = canvas.getWidth();
            const canvasH = canvas.getHeight();

            const renderPageToOffscreen = (pageObj: any) => {
              return new Promise<string>((resolve) => {
                try {
                  const tmp = document.createElement('canvas');
                  tmp.width = canvasW;
                  tmp.height = canvasH;
                  const off = new Canvas(tmp, { width: canvasW, height: canvasH, selection: false });

                  // add background
                  const bgRect = new Rect({ left: 0, top: 0, width: canvasW, height: canvasH, fill: backgroundColor, selectable: false, evented: false, isBackground: true });
                  off.add(bgRect);

                  let pendingImages = 0;
                  const maybeCapture = () => {
                    if (pendingImages > 0) return;
                    try {
                      const url = safeExportCanvasDataUrl(off, { format: 'png', multiplier: 0.4 });
                      setTimeout(() => {
                        try { off.dispose(); } catch (e) {}
                        resolve(url);
                      }, 20);
                    } catch (e) {
                      try { off.dispose(); } catch (e) {}
                      resolve('');
                    }
                  };

                  if (!pageObj || !Array.isArray(pageObj.layers) || pageObj.layers.length === 0) {
                    maybeCapture();
                    return;
                  }

                  pageObj.layers.forEach((layer: any) => {
                    try {
                      switch (layer.type) {
                        case 'background':
                          // handled by bgRect
                          break;
                        case 'rect':
                          off.add(new Rect({ ...(layer.props || {}), selectable: false, evented: false }));
                          break;
                        case 'circle':
                          off.add(new Circle({ ...(layer.props || {}), selectable: false, evented: false }));
                          break;
                        case 'text':
                          off.add(new Textbox(layer.props?.text || 'Edit me', { ...(layer.props || {}), selectable: false, evented: false }));
                          break;
                        case 'wave':
                          off.add(new Path(layer.props?.path || '', { ...(layer.props || {}), selectable: false, evented: false }));
                          break;
                        case 'image':
                          if (layer.props?.url) {
                            pendingImages++;
                            const opts: any = { crossOrigin: 'anonymous' };
                            try {
                              (fabric.Image as any).fromURL(layer.props.url, (img: any) => {
                                try {
                                  img.set({ ...(layer.props || {}), selectable: false, evented: false });
                                  off.add(img);
                                } catch (err) {
                                  console.warn('offscreen image set failed', err);
                                } finally {
                                  pendingImages--; maybeCapture();
                                }
                              }, opts);
                            } catch (e) {
                              // fallback to HTMLImageElement
                              const imgEl = new Image();
                              imgEl.crossOrigin = 'anonymous';
                              imgEl.onload = () => {
                                try {
                                  const imgObj = new (fabric.Image as any)(imgEl, { ...(layer.props || {}), selectable: false, evented: false });
                                  off.add(imgObj);
                                } catch (err) {
                                  console.warn('offscreen image construct failed', err);
                                } finally {
                                  pendingImages--; maybeCapture();
                                }
                              };
                              imgEl.onerror = () => { pendingImages--; maybeCapture(); };
                              imgEl.src = layer.props.url;
                            }
                          }
                          break;
                        default:
                          break;
                      }
                    } catch (err) {
                      console.warn('offscreen render layer error', err, layer);
                    }
                  });

                  // allow a short grace period for any async adds
                  setTimeout(maybeCapture, 300);
                } catch (e) {
                  resolve('');
                }
              });
            };

            const frontPage = selectedTemplate.pages[0];
            const backPage = selectedTemplate.pages[1] ?? null;

            const frontThumbPromise = renderPageToOffscreen(frontPage);
            const backThumbPromise = backPage ? renderPageToOffscreen(backPage) : Promise.resolve('');

            const [frontThumb, backThumb] = await Promise.all([frontThumbPromise, backThumbPromise]);

            setAppliedTemplateThumbnails({ front: frontThumb || quickDataUrl, back: backThumb || '' });
          } catch (e) {
            // fallback: show what we captured from the main canvas for the active side
            setAppliedTemplateThumbnails(prev => ({ ...(prev || {}), ...(activeSide === 'front' ? { front: quickDataUrl } : { back: quickDataUrl }) }));
          }
        })();
       } catch (e) {
         console.warn('quick thumbnail capture failed', e);
       }

      // Removed immediate canvas.toDataURL capture — we already set a safe SVG
      // preview earlier and will capture a canonical thumbnail in the delayed
      // capture step (with fallback to the SVG if toDataURL fails).

      // -------------------------------------------------------------------
      // Update pageContents and thumbnails so the RightScrollbar shows the
      // newly-applied template for the current page/side.
      // Use a short timeout to let any async image layers finish loading.
      // -------------------------------------------------------------------
      try {
        const capture = () => {
          try {
            const json = JSON.stringify(canvas.toJSON());
            const dataUrl = safeExportCanvasDataUrl(canvas, { format: "png", multiplier: 1 });

            setPageContents(prev => ({
              ...prev,
              [activePage]: {
                ...(typeof prev[activePage] === "object" && prev[activePage] !== null ? prev[activePage] : {}),
                [activeSide]: json,
              }
            }));

            setThumbnails(prev => ({
              ...prev,
              [activePage]: {
                ...(prev[activePage] || {}),
                [activeSide]: dataUrl,
              }
            }));    
            // Once the canonical thumbnail is available, clear the transient applied preview
            setTimeout(() => {
              setAppliedTemplateThumbnails(null);
            }, 50);
          } catch (e) {
            console.error("handleSelectTemplate: capture thumbnail error", e);
          }
        };

        // delay slightly to allow images to load/render
        setTimeout(capture, 300);
      } catch (e) {
        console.error("handleSelectTemplate: failed to update thumbnails/pageContents", e);
      }
    } catch (err) {
      console.error("handleSelectTemplate: unexpected error", err);
    }
  };

  const switchSide = (side: "front" | "back") => {
    setActiveSide(side);
    // clear any transient applied preview when switching side
    setAppliedTemplateThumbnails(null);

    const templateId = side === "front" ? frontTemplateId : backTemplateId;
    if (templateId) {
      handleSelectTemplate(templateId);
    } else {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.getObjects().forEach(obj => {
        if (!(obj as CanvasObject).isBackground) canvas.remove(obj);
      });
      canvas.renderAll();
    }
  };
  

  // ---------------- Undo / Redo ----------------
  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || undoStack.length < 2) return;

    const newUndo = [...undoStack];
    const current = newUndo.pop()!;
    const previous = newUndo[newUndo.length - 1];

    setRedoStack(prev => [current, ...prev]);
    setUndoStack(newUndo);

    isRestoringRef.current = true;
    canvas.loadFromJSON(previous, () => {
      const bg = canvas.getObjects().find(o => (o as CanvasObject).isBackground);
      if (bg) safeSendToBack(canvas, bg);
      canvas.renderAll();
      isRestoringRef.current = false;
    });
  };

  const handleRedo = () => {
    const canvas = canvasRef.current;
    if (!canvas || redoStack.length === 0) return;

    const [next, ...rest] = redoStack;
    setRedoStack(rest);
    setUndoStack(prev => [...prev, next]);

    isRestoringRef.current = true;
    canvas.loadFromJSON(next, () => {
      const bg = canvas.getObjects().find(o => (o as CanvasObject).isBackground);
      if (bg) safeSendToBack(canvas, bg);
      canvas.renderAll();
      isRestoringRef.current = false;
    });
  };

  // ---------------- Object Manipulation ----------------
  const handleAddText = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const text = new Textbox("New Text", {
      left: 30,
      top: 30,
      fontSize,
      fill: textColor,
      editable: true,
      selectable: true,
      objectCaching: false,
      editingBorderColor: "blue",
      lockUniScaling: false,
      lockScalingFlip: false,
      // reduce default width to half of previous value to avoid overly wide textboxes
      width: Math.max(100, Math.round(((canvas.getWidth ? canvas.getWidth() : 600) - 60) / 2)),
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    // enter editing only on double-click; show controls so user can resize first
    text.enterEditing();
    text.selectAll();
    canvas.renderAll();
    saveState();
  };

  const handleAddRect = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = new Rect({
      left: 40,
      top: 40,
      width: 100,
      height: 50,
      fill: shapeColor,
      selectable: true,
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
    saveState();
  };

  const handleAddWave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const wavePath = "M0,160L80,186.7C160,213,320,267,480,266.7C640,267,800,213,960,192C1120,171,1280,181,1360,186.7L1440,192L1440,320L0,320Z";
  
    const gradient = new fabric.Gradient({
      type: "linear",
      coords: { x1: 0, y1: 0, x2: 1, y2: 0 },
      colorStops: [
        { offset: 0, color: "#3B82F6" },
        { offset: 1, color: "#06B6D4" },
      ],
    });
  
    const wave = new Path(wavePath, {
      left: 0,
      top: 200,
      scaleX: 0.42,
      scaleY: 0.35,
      fill: gradient, // Type-safe
      selectable: true,
    });
  
    canvas.add(wave);
    canvas.setActiveObject(wave);
    canvas.renderAll();
    saveState();
  };
  
  // Handler exposed to sidebar ElementsMenu so it can request adding an item to the active canvas
  const handleAddElementFromMenu = (item: any, left = 50, top = 50) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('handleAddElementFromMenu: canvas not ready');
      return;
    }

    try {
      // Minimal subset of ElementsMenu creation logic (shapes + images)
      const name = (item.name || '').toLowerCase();
      let obj: any = null;

      switch (name) {
        case 'rectangle':
        case 'rect': {
          obj = new Rect({ left, top, width: item.width ?? 100, height: item.height ?? 60, fill: item.color || '#F87171', selectable: true });
          break;
        }
        case 'circle': {
          obj = new Circle({ left, top, radius: item.radius ?? 40, fill: item.color || '#34D399', selectable: true });
          break;
        }
        case 'triangle': {
          try {
            obj = new (fabric as any).Triangle({ left, top, width: item.width ?? 80, height: item.height ?? 80, fill: item.color || '#3B82F6', selectable: true });
          } catch (e) {
            const w = item.width ?? 80;
            const h = item.height ?? 80;
            obj = new fabric.Polygon([{ x: 0, y: 0 }, { x: w, y: 0 }, { x: w / 2, y: h }], { left, top, fill: item.color || '#3B82F6', selectable: true, originX: 'left', originY: 'top' });
          }
          break;
        }
        default: {
          if (item.sourceUrl) {
            const fromURL = (fabric.Image as any)?.fromURL;
            if (typeof fromURL === 'function') {
              try {
                const maybePromise = fromURL.call(fabric.Image, item.sourceUrl);
                if (maybePromise && typeof maybePromise.then === 'function') {
                  maybePromise.then((img: any) => {
                    img.set({ left, top, scaleX: 0.5, scaleY: 0.5 });
                    canvas.add(img);
                    canvas.setActiveObject(img);
                    canvas.requestRenderAll();
                  }).catch((e: any) => console.error('image load (promise) failed', e));
                  return;
                }
              } catch (e) {}

              try {
                fromURL.call(fabric.Image, item.sourceUrl, (img: any) => {
                  try {
                    img.set({ left, top, scaleX: 0.5, scaleY: 0.5 });
                    canvas.add(img);
                    canvas.setActiveObject(img);
                    canvas.requestRenderAll();
                  } catch (err) {
                    console.error('image set error', err);
                  }
                }, { crossOrigin: 'anonymous' });
                return;
              } catch (e) {
                // fallthrough to HTMLImage fallback
              }
            }

            const imgEl = new Image();
            imgEl.crossOrigin = 'anonymous';
            imgEl.onload = () => {
              try {
                const imgObj = new (fabric.Image as any)(imgEl, { left, top, scaleX: 0.5, scaleY: 0.5 });
                canvas.add(imgObj);
                canvas.setActiveObject(imgObj);
                canvas.requestRenderAll();
              } catch (err) {
                console.error('HTMLImage -> fabric.Image error', err);
              }
            };
            imgEl.onerror = (err) => console.error('image fallback failed', err);
            imgEl.src = item.sourceUrl;
            return;
          }
        }
      }

      if (obj) {
        canvas.add(obj);
        try {
          const bgObj = canvas.getObjects().find(o => (o as any).isBackground);
          if (bgObj) (canvas as any).sendToBack(bgObj);
        } catch (e) {}
        canvas.setActiveObject(obj);
        canvas.requestRenderAll();
      }
    } catch (err) {
      console.error('handleAddElementFromMenu error', err);
    }
  };

  // Open the sidebar Colors menu from FloatingToolbar or other UI
  const openColorsMenu = (color?: string) => {
    // Capture the current selected object at the moment the menu opens
    // so color clicks inside the sidebar apply to this object even if
    // a global outside-click handler clears the active selection later.
    sidebarColorTargetRef.current = selectedObject;
    setSidebarInitialColor(color ?? null);
    setSidebarExternalMenu('colors');
  };

  // Handler when a color is selected in Sidebar ColorsMenu
  const handleSidebarColorSelect = (color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      // Prefer the object captured when the Colors menu was opened. If none,
      // fall back to current selection.

      // Helper: if the chosen color is a CSS linear-gradient(...) string,
      // convert it into a fabric.Gradient that Fabric understands.
      const createFabricGradient = (css: string) => {
        try {
          const parsed = parseCssLinearGradient(css);
          if (!parsed || !parsed.colors || !parsed.colors.length) return null;

          // compute normalized coords from angle (deg). Default left->right
          let coords = { x1: 0, y1: 0, x2: 1, y2: 0 };
          if (typeof parsed.angle === 'number') {
            const rad = (parsed.angle * Math.PI) / 180;
            const dx = Math.cos(rad);
            const dy = Math.sin(rad);
            coords = {
              x1: 0.5 - dx / 2,
              y1: 0.5 - dy / 2,
              x2: 0.5 + dx / 2,
              y2: 0.5 + dy / 2,
            };
          }

          const colorStops = parsed.colors.map((c: string, i: number, arr: string[]) => ({
            offset: i / (arr.length - 1 || 1),
            color: c,
          }));

          return new fabric.Gradient({ type: 'linear', coords, colorStops });
        } catch (e) {
          console.warn('createFabricGradient failed', e);
          return null;
        }
      };

      // Fallback for object types that don't render fabric.Gradient (eg. some Text/Textbox builds):
      // draw the CSS gradient to an offscreen canvas and return a fabric.Pattern.
      const createPatternFromCssGradient = (css: string, w = 200, h = 200) => {
        try {
          const parsed = parseCssLinearGradient(css);
          console.debug('[Colors] createPatternFromCssGradient parsed=', parsed, 'requestedSize=', {w,h});
          if (!parsed || !parsed.colors || !parsed.colors.length) return null;

          const tmp = document.createElement('canvas');
          tmp.width = w;
          tmp.height = h;
          const ctx = tmp.getContext('2d');
          if (!ctx) { console.debug('[Colors] createPatternFromCssGradient no 2D context'); return null; }
          if (!ctx) return null;

          // compute gradient coordinates based on angle
          const angle = typeof parsed.angle === 'number' ? parsed.angle : 90; // default to 90deg (left->right)
          const rad = (angle * Math.PI) / 180;
          const cx = Math.cos(rad);
          const cy = Math.sin(rad);

          // gradient line endpoints across canvas
          const x0 = tmp.width * 0.5 - cx * tmp.width * 0.5;
          const y0 = tmp.height * 0.5 - cy * tmp.height * 0.5;
          const x1 = tmp.width * 0.5 + cx * tmp.width * 0.5;
          const y1 = tmp.height * 0.5 + cy * tmp.height * 0.5;

          const grad = ctx.createLinearGradient(x0, y0, x1, y1);
          const stops = parsed.colors;
          for (let i = 0; i < stops.length; i++) {
            const offset = i / (stops.length - 1 || 1);
            grad.addColorStop(offset, stops[i]);
          }

          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, tmp.width, tmp.height);

          // debug: serialize a tiny dataURL to ensure canvas is drawn
          try { console.debug('[Colors] pattern dataURL sample=', tmp.toDataURL('image/png').slice(0,80)); } catch (e) { console.debug('[Colors] toDataURL failed', e); }

          return new fabric.Pattern({ source: tmp, repeat: 'no-repeat' });
        } catch (e) {
          console.warn('createPatternFromCssGradient failed', e);
          return null;
        }
      };

      const target = sidebarColorTargetRef.current || selectedObject;

      if (target && !target.isBackground) {
        console.debug('[Colors] applying color=', color, 'target=', target && target.type);
        // Apply fill to the captured target object. If color is a CSS gradient
        // string, convert it to a fabric.Gradient first so Fabric can render it.
        if (typeof color === 'string' && color.toLowerCase().includes('linear-gradient')) {
          // Prefer a raster Pattern fallback created from the CSS gradient. This
          // works consistently for shapes and text across Fabric builds.
          const bbox = (() => {
            try {
              const b = target.getBoundingRect();
              // avoid zero-sized canvases
              return { w: Math.max(4, Math.round(b.width)), h: Math.max(4, Math.round(b.height)) };
            } catch (e) { return { w: 200, h: 200 }; }
          })();

          // Try to create a pattern sized to the object's bounding box.
          const pattern = createPatternFromCssGradient(color, bbox.w, bbox.h);
          if (pattern) {
            console.debug('[Colors] pattern created ok, bbox=', bbox);
            try {
              // Ensure the source is an actual Canvas/HTMLImage element for Fabric
              (pattern as any).source = (pattern as any).source || (pattern as any).image || (pattern as any).source;
              pattern.repeat = 'no-repeat';
            } catch (e) {}
            // If the pattern.source is an Image that isn't loaded yet, defer applying it
            const src = (pattern as any).source;
            if (src && typeof (src as HTMLImageElement).complete === 'boolean' && !(src as HTMLImageElement).complete) {
              console.debug('[Colors] pattern image not complete, waiting for onload');
              (src as HTMLImageElement).onload = () => {
                try {
                  target.set({ fill: pattern });
                  try { (target as any).setCoords(); } catch (e) {}
                  try { (target as any).set && (target as any).set('objectCaching', false); } catch (e) {}
                  try { (target as any)._clearCache && (target as any)._clearCache(); } catch (e) {}
                  try { (target as any).cacheKey = null; } catch (e) {}
                  try { (target as any).dirty = true; } catch (e) {}
                  try { canvas.requestRenderAll(); } catch (e) { try { canvas.renderAll(); } catch(_) {} }
                  saveState();
                } catch (err) {
                  console.warn('pattern onload apply failed', err);
                }
              };
              (src as HTMLImageElement).onerror = (err) => {
                console.warn('pattern image failed to load, falling back to gradient or color', err);
                const grad = createFabricGradient(color);
                if (grad) target.set({ fill: grad });
                else target.set({ fill: color });
                try { canvas.requestRenderAll(); } catch (e) { try { canvas.renderAll(); } catch (_) {} }
                saveState();
              };
            } else {
              // Image already ready or source is canvas — apply synchronously
              target.set({ fill: pattern });
            }
          } else {
            console.debug('[Colors] pattern creation failed, trying fabric.Gradient fallback');
            // Fallback: try creating a native fabric.Gradient, else fall back to the raw CSS string
            const grad = createFabricGradient(color);
            if (grad) target.set({ fill: grad });
            else target.set({ fill: color });
          }
        } else {
          target.set({ fill: color });
        }
        console.debug('[Colors] after set fill, objectCaching=', (target as any).objectCaching, 'dirty=', (target as any).dirty);
        canvas.setActiveObject(target);
        // ensure caches update
        try { (target as any).setCoords(); } catch (e) {}
        // Some Fabric builds cache object rendering; disable caching and mark object dirty.
        try {
          // disable high-level caching
          (target as any).set && (target as any).set('objectCaching', false);
          // clear any internal cached image if available
          if (typeof (target as any)._clearCache === 'function') try { (target as any)._clearCache(); } catch (e) {}
          // nullify cacheKey used by some builds
          try { (target as any).cacheKey = null; } catch (e) {}
          // mark dirty so Fabric rebuilds its cache
          try { (target as any).dirty = true; } catch (e) {}
          // some builds expose a _calcBounds used during render
          if (typeof (target as any)._calcBounds === 'function') try { (target as any)._calcBounds(); } catch (e) {}
        } catch (e) {}
        // clear top context (if present) and re-render the canvas
        try { if ((canvas as any).clearContext && canvas.contextTop) (canvas as any).clearContext(canvas.contextTop); } catch (e) {}
        try { canvas.requestRenderAll(); } catch (e) { try { canvas.renderAll(); } catch(_) {} }
        saveState();
      } else {
        // No valid target -> treat as background color change
        const bg = canvas.getObjects().find((o: any) => !!o.isBackground) as any;
        if (bg) {
          if (typeof color === 'string' && color.toLowerCase().includes('linear-gradient')) {
            const grad = createFabricGradient(color);
            if (grad) bg.set({ fill: grad });
            else bg.set({ fill: color });
          } else {
            bg.set({ fill: color });
          }
          canvas.requestRenderAll();
          saveState({ replaceLast: true });
        }
      }
    } catch (e) {
      console.error('handleSidebarColorSelect error', e);
    } finally {
      // Intentionally do NOT close the Colors sidebar here. The sidebar should stay open
      // until the user explicitly closes it via the toggle/Close button. The captured
      // color target and initial color are preserved so the user can apply multiple
      // colors without reopening the menu. Cleanup of the captured ref occurs when
      // the sidebar actually closes (see effect watching sidebarExternalMenu).
    }
  };

  const handleDelete = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedObject || selectedObject.isBackground) return;
    canvas.remove(selectedObject);
    canvas.discardActiveObject();
    setSelectedObject(null);
    canvas.renderAll();
    saveState();
  };

  const handleBringForward = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedObject || selectedObject.isBackground) return;
    safeBringForward(canvas, selectedObject);
    canvas.renderAll();
    saveState();
  };

  const handleSendBackward = () => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedObject || selectedObject.isBackground) return;
    safeSendBackwards(canvas, selectedObject);
    const bg = canvas.getObjects().find(o => (o as CanvasObject).isBackground);
    if (bg) safeSendToBack(canvas, bg);
    canvas.renderAll();
    saveState();
  };

  // ---------------- Safe stacking helpers ----------------
  // Some Fabric builds omit high-level stacking helpers; provide robust fallbacks.
  const safeBringForward = (canvas: any, obj: any) => {
    if (!canvas || !obj) return;
    // prefer native API if present
    if (typeof canvas.bringForward === 'function') {
      try { canvas.bringForward(obj); return; } catch (e) { /* fallthrough */ }
    }

    try {
      const objs = canvas.getObjects();
      const idx = objs.indexOf(obj);
      if (idx < 0) return;
      // compute target index (one step up), but never move past the top
      let target = Math.min(objs.length - 1, idx + 1);
      // if background exists at index 0, ensure we don't swap with it
      const bg = objs.find((o: any) => !!o.isBackground);
      const minIndex = bg ? 1 : 0;
      if (target < minIndex) target = minIndex;
      // if target equals current index nothing to do
      if (target === idx) return;
      canvas.moveTo(obj, target);
    } catch (e) {
      console.warn('safeBringForward failed', e);
    }
  };

  const safeSendBackwards = (canvas: any, obj: any) => {
    if (!canvas || !obj) return;
    if (typeof canvas.sendBackwards === 'function') {
      try { canvas.sendBackwards(obj); return; } catch (e) { /* fallthrough */ }
    }

    try {
      const objs = canvas.getObjects();
      const idx = objs.indexOf(obj);
      if (idx < 0) return;
      // compute target index (one step down), but do not go behind background
      const bg = objs.find((o: any) => !!o.isBackground);
      const minIndex = bg ? 1 : 0;
      let target = Math.max(minIndex, idx - 1);
      if (target === idx) return;
      canvas.moveTo(obj, target);
    } catch (e) {
      console.warn('safeSendBackwards failed', e);
    }
  };

  // Safe send-to-back helper: prefer canvas.sendToBack if available else moveTo index 0
  const safeSendToBack = (canvas: any, obj: any) => {
    if (!canvas || !obj) return;
    if (typeof canvas.sendToBack === 'function') {
      try { canvas.sendToBack(obj); return; } catch (e) { /* fallthrough */ }
    }

    try {
      // move object to index 0, but ensure background remains at 0 if present
      const objs = canvas.getObjects();
      const bg = objs.find((o: any) => !!o.isBackground);
      const targetIndex = bg ? 1 : 0;
      // if we're moving the background itself, keep it at 0
      if (obj === bg) {
        canvas.moveTo(obj, 0);
        return;
      }
      canvas.moveTo(obj, targetIndex);
    } catch (e) {
      console.warn('safeSendToBack failed', e);
    }
  };

  // ---------------- Floating Toolbar Position ----------------
  const [toolbarStyle, setToolbarStyle] = useState({ top: 0, left: 0 });
  useEffect(() => {
    if (!selectedObject || !canvasRef.current || !canvasContainerRef.current) return;

    const updateToolbar = () => {
      const bounds = (selectedObject as any).getBoundingRect();
      const rect = canvasContainerRef.current!.getBoundingClientRect();

      setToolbarStyle({
        top: bounds.top + rect.top - 50,
        left: bounds.left + rect.left + bounds.width / 2,
      });
    };

    updateToolbar();
    canvasRef.current.on("object:moving", updateToolbar);
    canvasRef.current.on("object:scaling", updateToolbar);
    canvasRef.current.on("object:rotating", updateToolbar);

    return () => {
      canvasRef.current?.off("object:moving", updateToolbar);
      canvasRef.current?.off("object:scaling", updateToolbar);
      canvasRef.current?.off("object:rotating", updateToolbar);
    };
  }, [selectedObject]);

  // Hide FloatingToolbar when clicking/touching outside the toolbar or canvas
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = (e as any).target as Node | null;
      const toolbarEl = floatingToolbarRef.current;
      const canvasEl = canvasContainerRef.current;

      // If click/touch is inside toolbar or inside canvas container, do nothing
      if (toolbarEl && target && toolbarEl.contains(target)) return;
      if (canvasEl && target && canvasEl.contains(target)) return;

      // Otherwise clear selection to hide the FloatingToolbar
      setSelectedObject(null);
      try {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      } catch (err) {
        console.error('hide floating toolbar error', err);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, []);

  // ---------------- Multi-Page & Save Current Page ----------------
  const saveCurrentPage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    try {
      const json = JSON.stringify(canvas.toJSON());
      setPageContents(prev => ({
        ...prev,
        [activePage]: {
          ...(typeof prev[activePage] === "object" && prev[activePage] !== null ? prev[activePage] : {}), // ✅ default to {}
          [activeSide]: json,
        }
      }));
      
      setThumbnails(prev => ({
        ...prev,
        [activePage]: {
          ...(prev[activePage] || {}),
          [activeSide]: safeExportCanvasDataUrl(canvas, { format: "png", multiplier: 1 }),
        }
      }));    
    } catch (err) {
      console.error("Failed to save page content:", err);
    }
  };
  

  // ---------------- Switch Page ----------------
  const handleSwitchPage = (pageId: number, side: "front" | "back" = "front") => {
    saveCurrentPage();
    setActivePage(pageId);
    setActiveSide(side);
  
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.clear();
  
    const bg: CanvasObject = new Rect({
      left: 0,
      top: 0,
      width: canvas.getWidth(),
      height: canvas.getHeight(),
      fill: backgroundColor,
      selectable: false,
      evented: false,
      isBackground: true,
    });
    canvas.add(bg);
    // ensure background is at the back in case the canvas implementation lacks sendToBack
    safeSendToBack(canvas, bg);
  
    const content = pageContents[pageId]?.[side];
    if (content && content !== "{}") {
      try {
        isRestoringRef.current = true;
        canvas.loadFromJSON(content, () => {
          const bgObj = canvas.getObjects().find(o => (o as CanvasObject).isBackground);
          if (bgObj) safeSendToBack(canvas, bgObj);
          canvas.renderAll();
          isRestoringRef.current = false;
        });
      } catch {
        canvas.renderAll();
      }
    } else canvas.renderAll();
  };
  

  // ---------------- Add / Delete / Duplicate Pages ----------------
  const handleAddPage = () => {
    saveCurrentPage();
    const newPage = pages.length ? Math.max(...pages) + 1 : 1;
    setPages(prev => [...prev, newPage]);
    setActivePage(newPage);

    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.clear();
    const bg: CanvasObject = new Rect({
      left: 0,
      top: 0,
      width: canvas.getWidth(),
      height: canvas.getHeight(),
      fill: backgroundColor,
      selectable: false,
      evented: false,
      isBackground: true,
    });
    canvas.add(bg);
    safeSendToBack(canvas, bg);
    canvas.renderAll();
  };

  const handleDeletePage = (pageId: number) => {
    if (pages.length === 1) return;
    setPages(prev => prev.filter(p => p !== pageId));
    setPageContents(prev => {
      const copy = { ...prev };
      delete copy[pageId];
      return copy;
    });
    setThumbnails(prev => {
      const copy = { ...prev };
      delete copy[pageId];
      return copy;
    });

    if (activePage === pageId) {
      const nextPage = pages.find(p => p !== pageId) || 1;
      setTimeout(() => handleSwitchPage(nextPage), 50);
    }
  };

  const handleDuplicatePage = (pageId: number) => {
    const newPage = Math.max(...pages) + 1;
    setPages(prev => [...prev, newPage]);
    setPageContents(prev => ({ ...prev, [newPage]: pageContents[pageId] || "{}" }));
    setThumbnails(prev => ({ ...prev, [newPage]: thumbnails[pageId] || "" }));
    setTimeout(() => handleSwitchPage(newPage), 50);
  };

  const handleReorderPages = (newPages: number[]) => {
    setPages(newPages);
  };

  // ---------------- Download (PNG / JPG / PDF) ----------------
  // Utility: convert a dataURL to a Blob via fetch (works for SVG or raster dataURLs)
  const dataUrlToBlob = async (dataUrl: string) => {
    const res = await fetch(dataUrl);
    return await res.blob();
  };

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleDownloadPNG = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = safeExportCanvasDataUrl(canvas, { format: 'png', multiplier: 2 });
      if (!dataUrl) return;
      const blob = await dataUrlToBlob(dataUrl);
      downloadBlob(blob, `visiting-card-${activePage}-${activeSide}.png`);
    } catch (e) {
      console.error('handleDownloadPNG error', e);
    }
  };

  const handleDownloadJPG = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      // export as PNG first then convert to JPEG blob to preserve fallback behavior
      const dataUrl = safeExportCanvasDataUrl(canvas, { format: 'png', multiplier: 2 });
      if (!dataUrl) return;
      const blob = await dataUrlToBlob(dataUrl);
      // convert blob to image and redraw to canvas to get JPEG encoding when needed
      const img = document.createElement('img');
      img.src = URL.createObjectURL(blob);
      await new Promise<void>((resolve, reject) => {
        img.onload = () => { resolve(); };
        img.onerror = (err) => { reject(err); };
      });

      const tmp = document.createElement('canvas');
      tmp.width = img.naturalWidth || (canvas as any).getWidth();
      tmp.height = img.naturalHeight || (canvas as any).getHeight();
      const ctx = tmp.getContext('2d');
      if (!ctx) {
        // fallback: download original PNG
        downloadBlob(blob, `visiting-card-${activePage}-${activeSide}.png`);
        return;
      }
      ctx.drawImage(img, 0, 0, tmp.width, tmp.height);
      tmp.toBlob((jpegBlob) => {
        if (jpegBlob) {
          downloadBlob(jpegBlob, `visiting-card-${activePage}-${activeSide}.jpg`);
        } else {
          // fallback to PNG
          downloadBlob(blob, `visiting-card-${activePage}-${activeSide}.png`);
        }
        URL.revokeObjectURL(img.src);
      }, 'image/jpeg', 0.92);
    } catch (e) {
      console.error('handleDownloadJPG error', e);
    }
  };

  const handleDownloadPDF = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const w = canvas.getWidth();
      const h = canvas.getHeight();
      const dataUrl = safeExportCanvasDataUrl(canvas, { format: 'png', multiplier: 2 });
      if (!dataUrl) return;
      // dynamic import to avoid server-side bundling issues
      const { jsPDF } = await import('jspdf');
      const pdf = new jsPDF({ unit: 'px', format: [w, h], orientation: w > h ? 'landscape' : 'portrait' });
      // addImage accepts dataURL and will embed the PNG
      pdf.addImage(dataUrl, 'PNG', 0, 0, w, h);
      pdf.save(`visiting-card-${activePage}-${activeSide}.pdf`);
    } catch (e) {
      console.error('handleDownloadPDF error', e);
    }
  };

  // ---------------- Render ----------------
  return (
    <div className="flex w-full bg-gray-100">
      {/* Left Sidebar */}
      <div className="w-1/3 border-r bg-white">
        <SidebarMenu
          canvas={canvasRef.current!}
          selectedObject={selectedObject}
          isSaving={isSaving}
          textColor={textColor}
          fontSize={fontSize}
          shapeColor={shapeColor}
          handleAddText={handleAddText}
          handleAddRect={handleAddRect}
          handleAddWave={() => handleAddWave()}
          handleDelete={handleDelete}
          handleBringForward={handleBringForward}
          handleSendBackward={handleSendBackward}
          setTextColor={setTextColor}
          setFontSize={setFontSize}
          handleSaveCard={() => {}}
          loadTemplate={loadTemplate}
          handleSelectTemplate={handleSelectTemplate}
          handleAddElement={handleAddElementFromMenu}
          externalActiveMenu={sidebarExternalMenu}
          onRequestCloseMenu={() => setSidebarExternalMenu(null)}
          onColorSelect={handleSidebarColorSelect}
          initialColor={sidebarInitialColor}
        />
      </div>

      {/* Main Canvas */}
      <main className="flex-1 w-2/3 flex flex-col bg-gray-200 overflow-hidden relative">

        <VisitingCardToolbar
          undoStackLength={undoStack.length}
          redoStackLength={redoStack.length}
          isSaving={isSaving}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onSave={() => {}}
          onDownloadPNG={() => { handleDownloadPNG(); }}
          onDownloadJPG={() => { handleDownloadJPG(); }}
          onDownloadPDF={() => { handleDownloadPDF(); }}
        />

        {selectedObject && !selectedObject.isBackground && (
          <div ref={floatingToolbarRef}>
            <FloatingToolbar
              canvasRef={canvasContainerRef as React.RefObject<HTMLDivElement>}
              selectedObject={selectedObject}
              objectType={selectedObject.type || "textbox"}
              onDelete={handleDelete}
              onBringForward={handleBringForward}
              onSendBackward={handleSendBackward}
              onStyleChange={(style) => {
                if (!selectedObject || !canvasRef.current) return;
                selectedObject.set(style);
                canvasRef.current.renderAll();
                saveState();
              }}
              onOpenColorsMenu={openColorsMenu}
            />
          </div>
        )}

        <div className="flex-1 flex items-center justify-center">
          <div ref={canvasContainerRef} className="bg-white shadow-lg relative">
            <canvas ref={htmlCanvasRef} className="border" />

            {/* Canvas background color picker shown when user clicks empty canvas area */}
            {!selectedObject && canvasToolbarVisible && (
            <div
              style={{
                position: "absolute",
                top: canvasToolbarStyle.top,
                left: canvasToolbarStyle.left,
                transform: "translate(-50%, -110%)",
              }}
              className="z-50"
            >
              <div
                className="relative flex items-center gap-3 rounded-xl bg-white/95 backdrop-blur-md 
                  px-4 py-2 shadow-xl border border-gray-200"
              >
                {/* ---- Close Button ---- */}
                <button
                  onClick={() => setCanvasToolbarVisible(false)}
                  className="absolute -top-2.5 -right-2.5 flex items-center justify-center h-7 w-7 
                    rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white 
                    shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-300 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
            
                {/* ---- Background Color Picker ---- */}
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-1 text-sm font-semibold text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Background
                  </span>
                  <input
                    aria-label="Background color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => {
                      const value = e.target.value;
                      setBackgroundColor(value);
            
                      try {
                        const canvas = canvasRef.current;
                        const background = canvas
                          ?.getObjects()
                          .find((obj) => (obj as CanvasObject).isBackground) as
                          | fabric.Object
                          | undefined;
            
                        if (background) {
                          background.set("fill", value);
                          canvas?.renderAll();
                          saveState({ replaceLast: true });
                        }
                      } catch (error) {
                        console.error("Failed to change background color:", error);
                      }
                    }}
                    className="h-8 w-9 cursor-pointer rounded-lg border border-gray-300 shadow 
                      hover:scale-105 active:scale-95 transition-transform duration-200"
                  />
                </div>
              </div>
            </div>
          
            )}
          </div>
        </div>

        <ZoomControls canvas={canvasRef.current} zoom={zoom} setZoom={setZoom} />
      </main>

      <RightScrollbar
        pages={pages}
        activePage={activePage}
        activeSide={activeSide} // ✅ add this
        thumbnails={thumbnails}
        appliedTemplateThumbnails={activePage ? appliedTemplateThumbnails || undefined : undefined}
        isOpen={isRightSidebarOpen}
        onToggle={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
        onSwitchPage={handleSwitchPage}
        onAddPage={handleAddPage}
        onDeletePage={handleDeletePage}
        onDuplicatePage={handleDuplicatePage}
        onReorderPages={handleReorderPages}
      />
    </div>
  );
}

// helper: extract colors and angle from a CSS linear-gradient string (supports hex and rgb/rgba and angle in deg)
const parseCssLinearGradient = (input?: string): { angle?: number; colors: string[] } => {
  if (!input || typeof input !== 'string') return { colors: [] };

  // try to extract the inside of linear-gradient(...)
  const m = input.match(/linear-gradient\((.*)\)/i);
  if (!m) return { colors: [] };
  const inside = m[1];

  // split by commas but keep parentheses content intact (for rgb())
  const parts: string[] = [];
  let cur = '';
  let depth = 0;
  for (let i = 0; i < inside.length; i++) {
    const ch = inside[i];
    if (ch === '(') depth++;
    if (ch === ')') depth--; 
    if (ch === ',' && depth === 0) {
      parts.push(cur.trim());
      cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());

  let angle: number | undefined;
  const colors: string[] = [];

  // first part might be an angle (e.g. '135deg') or a direction like 'to right'
  if (parts.length && (/deg$/.test(parts[0].trim()) || parts[0].trim().toLowerCase().startsWith('to '))) {
    const first = parts.shift()!.trim();
    if (/deg$/.test(first)) {
      const deg = parseFloat(first.replace('deg', '').trim());
      if (!isNaN(deg)) angle = deg;
    } else {
      // basic handling for 'to top', 'to right bottom', map to angle
      const dir = first.toLowerCase();
      switch (dir) {
        case 'to top': angle = 0; break;
        case 'to top right': angle = 45; break;
        case 'to right': angle = 90; break;
        case 'to bottom right': angle = 135; break;
        case 'to bottom': angle = 180; break;
        case 'to bottom left': angle = 225; break;
        case 'to left': angle = 270; break;
        case 'to top left': angle = 315; break;
        default: break;
      }
    }
  }

  // match hex and rgb/rgba tokens in remaining parts
  const hexRegex = /#(?:[0-9a-fA-F]{3}){1,2}\b/;
  const rgbRegex = /rgba?\([^\)]+\)/;
  for (const p of parts) {
    const t = p.trim();
    const hex = t.match(hexRegex);
    const rgb = t.match(rgbRegex);
    if (hex) colors.push(hex[0]);
    else if (rgb) colors.push(rgb[0]);
    else if (/^[a-zA-Z]+$/.test(t)) colors.push(t); // named color fallback
    else {
      // try to extract color-like tokens (e.g. '#fff 0%')
      const token = t.split(' ').find(part => hexRegex.test(part) || rgbRegex.test(part));
      if (token) colors.push(token);
    }
  }

  return { angle, colors };
};
