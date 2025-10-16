// src/app/visiting-card/data/templateCategories.ts

// ----------------- TYPES -----------------
export type LayerType =
  | "background"
  | "rect"
  | "circle"
  | "triangle"
  | "polygon"
  | "wave"
  | "text"
  | "icon"
  | "image";

export type BaseProps = {
  left?: number;
  top?: number;
  fill?: string;
  width?: number;
  height?: number;
  radius?: number;
  scaleX?: number;
  scaleY?: number;
  opacity?: number;
};

export type TextProps = BaseProps & {
  text?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
};

export type WaveProps = BaseProps & {
  path: string;
  gradient?: { type?: "linear" | "radial"; colors: string[]; x1?: number; y1?: number; x2?: number; y2?: number };
};

export type PolygonProps = BaseProps & {
  points: { x: number; y: number }[];
};

export type IconProps = BaseProps & {
  path: string;
  size?: number;
};

export type Layer = {
  id: string;
  type: LayerType;
  props: BaseProps | TextProps | WaveProps | PolygonProps | IconProps | any;
};

export type TemplatePage = {
  id: string;
  layers: Layer[];
};

export type Template = {
  id: string;
  name: string;
  pages: TemplatePage[];
};

export type TemplateCategory = {
  type: string;
  templates: Template[];
};

// ----------------- ICON PLACEHOLDERS -----------------
export const ICONS = {
  email: "M2 2 L14 14 M14 2 L2 14",
  phone: "M2 2 L14 14",
  globe: "M2 2 L14 14",
};

// ----------------- UTILITIES -----------------
export const generateId = (prefix = "id") => `${prefix}-${crypto.randomUUID()}`;

// ----------------- TEMPLATE CATEGORIES -----------------
export const templateCategories: TemplateCategory[] = [
  // ---------------- PROFESSIONAL ----------------
  {
    type: "Professional",
    templates: [
      
      {
        id: "p1",
        name: "Professional Minimal Blue",
        pages: [
          {
            id: "p1-front",
            layers: [
              { id: "bg", type: "background", props: { fill: "#F9FAFB" } },
              { id: "accent", type: "rect", props: { left: 400, top: 0, width: 350, height: 408, fill: "linear-gradient(to right, #2563EB, #3B82F6)" } },
              { id: "name", type: "text", props: { text: "Michael Johnson", fontSize: 34, fontWeight: "bold", fill: "#111827", left: 50, top: 60 } },
              { id: "title", type: "text", props: { text: "Software Engineer", fontSize: 18, fill: "#6B7280", left: 50, top: 100 } },
              { id: "email-icon", type: "icon", props: { path: ICONS.email, size: 18, fill: "#374151", left: 50, top: 140 } },
              { id: "email", type: "text", props: { text: "michael.johnson@example.com", fontSize: 18, fill: "#374151", left: 60, top: 140 } },
              { id: "phone-icon", type: "icon", props: { path: ICONS.phone, size: 18, fill: "#374151", left: 50, top: 180 } },
              { id: "phone", type: "text", props: { text: "+1 (123) 456-7890", fontSize: 18, fill: "#374151", left: 60, top: 180 } },
            ],
          },
          {
            id: "p1-back",
            layers: [
              { id: "bg", type: "background", props: { fill: "#111827" } },
              { id: "bottom-bar", type: "rect", props: { left: 0, top: 180, width: 350, height: 70, fill: "linear-gradient(to right, #2563EB, #3B82F6)" } },
              { id: "website-icon", type: "icon", props: { path: ICONS.globe, size: 16, fill: "#FFFFFF", left: 90, top: 210 } },
              { id: "website", type: "text", props: { text: "www.techcorpsolutions.com", fontSize: 16, fill: "#FFFFFF", left: 115, top: 208, fontWeight: "bold" } },
              { id: "logo", type: "circle", props: { radius: 25, fill: "#FFFFFF", left: 175, top: 250, originX: "center", originY: "center" } },
            ],
          },
        ],
      },
      
      {
        id: "modern-wave",
        name: "Modern Waves",
        pages: [
          {
            id: generateId("front"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#E0F2FE" } },
              { id: generateId("wave"), type: "wave", props: { path: "M0,160 C360,200 1080,120 1440,160 L1440,320 L0,320 Z", gradient: { colors: ["#3B82F6", "#60A5FA"] }, left: 0, top: 0, width: 350, height: 100 } },
              { id: generateId("circle"), type: "circle", props: { radius: 40, fill: "#2563EB", left: 50, top: 50 } },
              { id: generateId("name"), type: "text", props: { text: "Olivia Brown", fontSize: 28, fontWeight: "bold", fill: "#111827", left: 100, top: 60 } },
              { id: generateId("title"), type: "text", props: { text: "Product Manager", fontSize: 16, fill: "#374151", left: 100, top: 100 } },
            ],
          },
          {
            id: generateId("back"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#1E40AF" } },
              { id: generateId("triangle"), type: "triangle", props: { width: 120, height: 80, fill: "#3B82F6", left: 100, top: 60 } },
              { id: generateId("email-icon"), type: "icon", props: { path: ICONS.email, size: 16, fill: "#fff", left: 50, top: 180 } },
              { id: generateId("email"), type: "text", props: { text: "olivia.brown@company.com", fontSize: 14, fill: "#fff", left: 70, top: 180 } },
            ],
          },
        ],
      },
      {
        id: "polygon-accent",
        name: "Polygon Accent",
        pages: [
          {
            id: generateId("front"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#FEE2E2" } },
              { id: generateId("polygon"), type: "polygon", props: { points: [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 80, y: 50 }, { x: 50, y: 80 }, { x: 0, y: 50 }], fill: "#EF4444", left: 220, top: 50 } },
              { id: generateId("name"), type: "text", props: { text: "Liam Smith", fontSize: 28, fontWeight: "bold", fill: "#B91C1C", left: 40, top: 60 } },
              { id: generateId("title"), type: "text", props: { text: "Financial Analyst", fontSize: 16, fill: "#991B1B", left: 40, top: 100 } },
            ],
          },
          {
            id: generateId("back"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#991B1B" } },
              { id: generateId("rect"), type: "rect", props: { width: 350, height: 70, fill: "#EF4444", left: 0, top: 180 } },
              { id: generateId("website-icon"), type: "icon", props: { path: ICONS.globe, size: 16, fill: "#fff", left: 90, top: 210 } },
              { id: generateId("website"), type: "text", props: { text: "www.financepro.com", fontSize: 16, fill: "#fff", left: 115, top: 208, fontWeight: "bold" } },
            ],
          },
        ],
      },
      {
        id: "abstract-triangle",
        name: "Abstract Triangles",
        pages: [
          {
            id: generateId("front"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#ECFDF5" } },
              { id: generateId("triangle1"), type: "triangle", props: { width: 100, height: 100, fill: "#10B981", left: 30, top: 40 } },
              { id: generateId("triangle2"), type: "triangle", props: { width: 80, height: 80, fill: "#059669", left: 180, top: 100 } },
              { id: generateId("name"), type: "text", props: { text: "Sophia Turner", fontSize: 28, fontWeight: "bold", fill: "#065F46", left: 50, top: 60 } },
              { id: generateId("title"), type: "text", props: { text: "UI/UX Designer", fontSize: 16, fill: "#064E3B", left: 50, top: 100 } },
            ],
          },
          {
            id: generateId("back"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#047857" } },
              { id: generateId("wave"), type: "wave", props: { path: "M0,160 C360,200 1080,120 1440,160 L1440,320 L0,320 Z", fill: "#10B981", left: 0, top: 0, width: 350, height: 70 } },
              { id: generateId("phone-icon"), type: "icon", props: { path: ICONS.phone, size: 16, fill: "#fff", left: 50, top: 210 } },
              { id: generateId("phone"), type: "text", props: { text: "+1 (123) 456-7890", fontSize: 14, fill: "#fff", left: 70, top: 210 } },
            ],
          },
        ],
      },
      {
        id: "diagonal-lines",
        name: "Diagonal Lines",
        pages: [
          {
            id: generateId("front"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#F3F4F6" } },
              { id: generateId("rect1"), type: "rect", props: { width: 350, height: 10, fill: "#1F2937", left: 0, top: 50, angle: 45 } },
              { id: generateId("rect2"), type: "rect", props: { width: 350, height: 10, fill: "#374151", left: -50, top: 100, angle: 45 } },
              { id: generateId("name"), type: "text", props: { text: "Noah Williams", fontSize: 28, fontWeight: "bold", fill: "#111827", left: 40, top: 150 } },
              { id: generateId("title"), type: "text", props: { text: "Operations Manager", fontSize: 16, fill: "#374151", left: 40, top: 190 } },
            ],
          },
          {
            id: generateId("back"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#1F2937" } },
              { id: generateId("rect"), type: "rect", props: { width: 350, height: 70, fill: "#4B5563", left: 0, top: 180 } },
              { id: generateId("email-icon"), type: "icon", props: { path: ICONS.email, size: 16, fill: "#fff", left: 50, top: 210 } },
              { id: generateId("email"), type: "text", props: { text: "noah.w@company.com", fontSize: 14, fill: "#fff", left: 70, top: 210 } },
            ],
          },
        ],
      },
      {
        id: "gradient-splash",
        name: "Gradient Splash",
        pages: [
          {
            id: generateId("front"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#F0F9FF" } },
              { id: generateId("wave"), type: "wave", props: { path: "M0,200 C300,100 1100,300 1440,200 L1440,320 L0,320 Z", gradient: { colors: ["#3B82F6", "#9333EA"] }, left: 0, top: 0, width: 350, height: 120 } },
              { id: generateId("circle"), type: "circle", props: { radius: 50, fill: "#8B5CF6", left: 100, top: 50 } },
              { id: generateId("name"), type: "text", props: { text: "Emma Davis", fontSize: 28, fontWeight: "bold", fill: "#111827", left: 100, top: 160 } },
              { id: generateId("title"), type: "text", props: { text: "Marketing Lead", fontSize: 16, fill: "#374151", left: 100, top: 200 } },
            ],
          },
          {
            id: generateId("back"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#4F46E5" } },
              { id: generateId("rect"), type: "rect", props: { width: 350, height: 70, fill: "#8B5CF6", left: 0, top: 180 } },
              { id: generateId("phone-icon"), type: "icon", props: { path: ICONS.phone, size: 16, fill: "#fff", left: 50, top: 210 } },
              { id: generateId("phone"), type: "text", props: { text: "+1 (555) 123-4567", fontSize: 14, fill: "#fff", left: 70, top: 210 } },
            ],
          },
        ],
      },
    ],
  },

  // ---------------- CREATIVE ----------------
  {
    type: "Creative",
    templates: [
      {
        id: "blob-style",
        name: "Blob Style",
        pages: [
          {
            id: generateId("front"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#FFF7ED" } },
              { id: generateId("blob"), type: "polygon", props: { points: [{ x: 0, y: 0 }, { x: 100, y: 30 }, { x: 80, y: 80 }, { x: 20, y: 100 }, { x: -20, y: 50 }], fill: "#F97316", left: 50, top: 50 } },
              { id: generateId("name"), type: "text", props: { text: "Ethan Carter", fontSize: 28, fontWeight: "bold", fill: "#C2410C", left: 120, top: 60 } },
              { id: generateId("title"), type: "text", props: { text: "Creative Director", fontSize: 16, fill: "#9A3412", left: 120, top: 100 } },
            ],
          },
          {
            id: generateId("back"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#C2410C" } },
              { id: generateId("rect"), type: "rect", props: { width: 350, height: 70, fill: "#F97316", left: 0, top: 180 } },
              { id: generateId("email-icon"), type: "icon", props: { path: ICONS.email, size: 16, fill: "#fff", left: 50, top: 210 } },
              { id: generateId("email"), type: "text", props: { text: "ethan.carter@studio.com", fontSize: 14, fill: "#fff", left: 70, top: 210 } },
            ],
          },
        ],
      },
      {
        id: "starburst",
        name: "Starburst",
        pages: [
          {
            id: generateId("front"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#EFF6FF" } },
              { id: generateId("star"), type: "polygon", props: { points: [{ x: 50, y: 0 }, { x: 60, y: 35 }, { x: 100, y: 35 }, { x: 65, y: 55 }, { x: 80, y: 100 }, { x: 50, y: 70 }, { x: 20, y: 100 }, { x: 35, y: 55 }, { x: 0, y: 35 }, { x: 40, y: 35 }], fill: "#2563EB", left: 150, top: 50 } },
              { id: generateId("name"), type: "text", props: { text: "Ava Johnson", fontSize: 28, fontWeight: "bold", fill: "#1E3A8A", left: 80, top: 150 } },
              { id: generateId("title"), type: "text", props: { text: "Graphic Artist", fontSize: 16, fill: "#1E40AF", left: 80, top: 190 } },
            ],
          },
          {
            id: generateId("back"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#1E3A8A" } },
              { id: generateId("wave"), type: "wave", props: { path: "M0,160 C360,200 1080,120 1440,160 L1440,320 L0,320 Z", gradient: { colors: ["#3B82F6", "#60A5FA"] }, left: 0, top: 0, width: 350, height: 100 } },
              { id: generateId("phone-icon"), type: "icon", props: { path: ICONS.phone, size: 16, fill: "#fff", left: 50, top: 210 } },
              { id: generateId("phone"), type: "text", props: { text: "+1 (987) 654-3210", fontSize: 14, fill: "#fff", left: 70, top: 210 } },
            ],
          },
        ],
      },
      {
        id: "paint-splash",
        name: "Paint Splash",
        pages: [
          {
            id: generateId("front"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#FEF3C7" } },
              { id: generateId("splash"), type: "polygon", props: { points: [{ x: 0, y: 0 }, { x: 120, y: 40 }, { x: 80, y: 120 }, { x: 20, y: 100 }], fill: "#FBBF24", left: 60, top: 50 } },
              { id: generateId("name"), type: "text", props: { text: "Mason Lee", fontSize: 28, fontWeight: "bold", fill: "#B45309", left: 120, top: 140 } },
              { id: generateId("title"), type: "text", props: { text: "Visual Artist", fontSize: 16, fill: "#78350F", left: 120, top: 180 } },
            ],
          },
          {
            id: generateId("back"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#B45309" } },
              { id: generateId("rect"), type: "rect", props: { width: 350, height: 70, fill: "#FBBF24", left: 0, top: 180 } },
              { id: generateId("email-icon"), type: "icon", props: { path: ICONS.email, size: 16, fill: "#fff", left: 50, top: 210 } },
              { id: generateId("email"), type: "text", props: { text: "mason.lee@studio.com", fontSize: 14, fill: "#fff", left: 70, top: 210 } },
            ],
          },
        ],
      },
      {
        id: "gradient-curve",
        name: "Gradient Curve",
        pages: [
          {
            id: generateId("front"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#ECFDF5" } },
              { id: generateId("curve"), type: "wave", props: { path: "M0,160 C360,50 1080,270 1440,160 L1440,320 L0,320 Z", gradient: { colors: ["#10B981", "#06B6D4"] }, left: 0, top: 0, width: 350, height: 120 } },
              { id: generateId("name"), type: "text", props: { text: "Isabella Moore", fontSize: 28, fontWeight: "bold", fill: "#065F46", left: 100, top: 150 } },
              { id: generateId("title"), type: "text", props: { text: "Creative Lead", fontSize: 16, fill: "#064E3B", left: 100, top: 190 } },
            ],
          },
          {
            id: generateId("back"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#047857" } },
              { id: generateId("phone-icon"), type: "icon", props: { path: ICONS.phone, size: 16, fill: "#fff", left: 50, top: 210 } },
              { id: generateId("phone"), type: "text", props: { text: "+1 (321) 654-9870", fontSize: 14, fill: "#fff", left: 70, top: 210 } },
            ],
          },
        ],
      },
      {
        id: "color-blobs",
        name: "Color Blobs",
        pages: [
          {
            id: generateId("front"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#FEF2F2" } },
              { id: generateId("blob1"), type: "polygon", props: { points: [{ x: 0, y: 0 }, { x: 60, y: 20 }, { x: 50, y: 60 }, { x: 20, y: 50 }], fill: "#EF4444", left: 30, top: 40 } },
              { id: generateId("blob2"), type: "polygon", props: { points: [{ x: 0, y: 0 }, { x: 80, y: 30 }, { x: 60, y: 70 }, { x: 20, y: 50 }], fill: "#F59E0B", left: 150, top: 80 } },
              { id: generateId("name"), type: "text", props: { text: "Lucas Brown", fontSize: 28, fontWeight: "bold", fill: "#B91C1C", left: 40, top: 150 } },
              { id: generateId("title"), type: "text", props: { text: "Visual Designer", fontSize: 16, fill: "#991B1B", left: 40, top: 190 } },
            ],
          },
          {
            id: generateId("back"),
            layers: [
              { id: generateId("bg"), type: "background", props: { fill: "#B91C1C" } },
              { id: generateId("rect"), type: "rect", props: { width: 350, height: 70, fill: "#EF4444", left: 0, top: 180 } },
              { id: generateId("email-icon"), type: "icon", props: { path: ICONS.email, size: 16, fill: "#fff", left: 50, top: 210 } },
              { id: generateId("email"), type: "text", props: { text: "lucas.b@studio.com", fontSize: 14, fill: "#fff", left: 70, top: 210 } },
            ],
          },
        ],
      },
    ],
  },
];
