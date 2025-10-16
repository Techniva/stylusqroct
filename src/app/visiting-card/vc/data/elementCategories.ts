import { Layer } from "./templateCategories";

export interface ElementItem {
  id: string;
  name: string;
  color?: string;
  previewUrl?: string;
  sourceUrl?: string;
  toLayer?: () => Layer;
}

export interface ElementCategory {
  type: string;
  items: ElementItem[];
}

/* ---------------- Shape → Layer ---------------- */
const shapeToLayer = (id: string, name: string, color: string): Layer => {
  switch (name.toLowerCase()) {
    case "circle":
      return { id, type: "circle", props: { left: 100, top: 100, radius: 50, fill: color } };
    case "square":
      return { id, type: "rect", props: { left: 100, top: 100, width: 100, height: 100, fill: color } };
    case "triangle":
      return { id, type: "triangle", props: { left: 100, top: 100, width: 100, height: 100, fill: color } };
    case "ellipse":
      return { id, type: "ellipse", props: { left: 100, top: 100, rx: 80, ry: 50, fill: color } };
    case "line":
      return { id, type: "line", props: { left: 100, top: 100, x1: 0, y1: 0, x2: 120, y2: 0, stroke: color, strokeWidth: 4 } };
    case "polygon":
      return { id, type: "polygon", props: { left: 100, top: 100, points: [{x:50,y:0},{x:100,y:40},{x:75,y:80},{x:25,y:80},{x:0,y:40}], fill: color } };
    case "diamond":
      return { id, type: "polygon", props: { left: 100, top: 100, points: [{x:60,y:0},{x:120,y:45},{x:60,y:90},{x:0,y:45}], fill: color } };
    case "star":
      return { id, type: "polygon", props: { left: 100, top: 100, points: [{x:50,y:0},{x:61,y:35},{x:98,y:35},{x:68,y:57},{x:79,y:91},{x:50,y:70},{x:21,y:91},{x:32,y:57},{x:2,y:35},{x:39,y:35}], fill: color } };
    case "arrow":
      return { id, type: "polygon", props: { left: 100, top: 100, points: [{x:0,y:30},{x:80,y:30},{x:80,y:10},{x:120,y:50},{x:80,y:90},{x:80,y:70},{x:0,y:70}], fill: color } };
    case "rectangle":
    default:
      return { id, type: "rect", props: { left: 100, top: 100, width: 120, height: 80, fill: color } };
  }
};

/* ---------------- Image → Layer ---------------- */
const imageToLayer = (id: string, name: string, src: string): Layer => ({
  id,
  type: "image",
  props: { left: 100, top: 100, scaleX: 0.5, scaleY: 0.5, src },
});

/* ---------------- Categories ---------------- */
export const elementCategories: ElementCategory[] = [
  {
    type: "Shapes",
    items: [
      { id: "s1", name: "Rectangle", color: "#EF4444", toLayer: () => shapeToLayer("s1", "Rectangle", "#EF4444") }, // bright red
      { id: "s2", name: "Square", color: "#F59E0B", toLayer: () => shapeToLayer("s2", "Square", "#F59E0B") }, // vivid orange
      { id: "s3", name: "Circle", color: "#10B981", toLayer: () => shapeToLayer("s3", "Circle", "#10B981") }, // bright green
      { id: "s4", name: "Triangle", color: "#3B82F6", toLayer: () => shapeToLayer("s4", "Triangle", "#3B82F6") }, // vivid blue
      { id: "s5", name: "Ellipse", color: "#8B5CF6", toLayer: () => shapeToLayer("s5", "Ellipse", "#8B5CF6") }, // purple
      { id: "s6", name: "Line", color: "#14B8A6", toLayer: () => shapeToLayer("s6", "Line", "#14B8A6") }, // teal
      { id: "s7", name: "Polygon", color: "#EC4899", toLayer: () => shapeToLayer("s7", "Polygon", "#EC4899") }, // pink
      { id: "s8", name: "Diamond", color: "#6366F1", toLayer: () => shapeToLayer("s8", "Diamond", "#6366F1") }, // indigo
      { id: "s9", name: "Star", color: "#FACC15", toLayer: () => shapeToLayer("s9", "Star", "#FACC15") }, // bright yellow
      { id: "s10", name: "Arrow", color: "#F43F5E", toLayer: () => shapeToLayer("s10", "Arrow", "#F43F5E") }, // vibrant pink/red
    ],
  },
  {
    type: "Graphics",
    items: [
      { id: "g1", name: "Badge", previewUrl: "/vc/graphics/1.png", sourceUrl: "/vc/graphics/1.png", toLayer: () => imageToLayer("g1", "Badge", "/vc/graphics/1.png") },
      { id: "g2", name: "Ribbon", previewUrl: "/vc/graphics/2.png", sourceUrl: "/vc/graphics/2.png", toLayer: () => imageToLayer("g2", "Ribbon", "/vc/graphics/2.png") },
    ],
  },
  {
    type: "Photos",
    items: [
      { id: "p1", name: "Nature", previewUrl: "/photos/nature.jpg", sourceUrl: "/photos/nature.jpg", toLayer: () => imageToLayer("p1", "Nature", "/photos/nature.jpg") },
      { id: "p2", name: "City", previewUrl: "/photos/city.jpg", sourceUrl: "/photos/city.jpg", toLayer: () => imageToLayer("p2", "City", "/photos/city.jpg") },
      { id: "p3", name: "People", previewUrl: "/photos/people.jpg", sourceUrl: "/photos/people.jpg", toLayer: () => imageToLayer("p3", "People", "/photos/people.jpg") },
    ],
  },
];
