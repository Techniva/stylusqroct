// src/app/visiting-card/data/textFeatures.ts

export interface TextFeature {
  id: string;
  label: string;
  fontClass?: string;            // Tailwind / next/font classname
  fontWeight?: string | number;
  italic?: boolean;
  uppercase?: boolean;
  previewSize?: string | number; // e.g., "18px" or 18
  style?: React.CSSProperties;   // For effects like shadow, stroke, opacity, color, etc.
}

// -------------------- QUICK STYLE PRESETS --------------------
export const quickPresets: TextFeature[] = [
  { id: "heading", label: "Add a heading", fontClass: "font-poppins", fontWeight: 700, previewSize: "32px" },
  { id: "subheading", label: "Add a subheading", fontClass: "font-roboto", fontWeight: 500, previewSize: "24px" },
  { id: "body", label: "Add a little bit of body text", fontClass: "font-inter", fontWeight: 400, previewSize: "16px" },
];

// -------------------- EXTRA STYLE FEATURES --------------------
export const textFeatures: TextFeature[] = [
  { id: "modern", label: "Modern", fontClass: "font-montserrat", fontWeight: 600, previewSize: "22px" },
  { id: "elegant", label: "Elegant", fontClass: "font-playfair", italic: true, previewSize: "20px" },
  { id: "minimal", label: "Minimal", fontClass: "font-roboto", uppercase: true, previewSize: "18px" },
  { id: "classic", label: "Classic", fontClass: "font-inter", fontWeight: 400, previewSize: "18px" },
  { id: "fancy", label: "Fancy", fontClass: "font-dancing-script", fontWeight: 500, previewSize: "24px" },
  { id: "tech", label: "Tech", fontClass: "font-roboto-mono", fontWeight: 700, previewSize: "22px" },
  { id: "handwriting", label: "Handwriting", fontClass: "font-pacifico", previewSize: "26px" },
];

// -------------------- EFFECT FEATURES (PROFESSIONAL) --------------------
export const textEffects: TextFeature[] = [
  { id: "shadow", label: "Shadow", style: { textShadow: "2px 2px 5px rgba(0,0,0,0.5)" } },
  { id: "outline", label: "Outline", style: { WebkitTextStroke: "1px black" } },
  { id: "opacity50", label: "50% Opacity", style: { opacity: 0.5 } },
  { id: "glow", label: "Glow", style: { textShadow: "0 0 8px rgba(0,0,0,0.5)" } },
  { id: "blur", label: "Blur", style: { filter: "blur(1px)" } },
  { id: "skewed", label: "Skewed", style: { transform: "skewX(-15deg)" } },
  { id: "rotated", label: "Rotated", style: { transform: "rotate(-10deg)" } },
  { id: "scaleUp", label: "Scale Up", style: { transform: "scale(1.2)" } },
  { id: "neon", label: "Neon", style: { textShadow: "0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 20px #39ff14" } },
  { id: "doubleShadow", label: "Double Shadow", style: { textShadow: "2px 2px 2px rgba(0,0,0,0.3), 4px 4px 4px rgba(0,0,0,0.2)" } },
  { id: "softGlow", label: "Soft Glow", style: { textShadow: "0 0 4px rgba(0,0,0,0.3)" } },
];
