declare module "openmoji/data/openmoji.json" {
  export interface OpenMojiItem {
    annotation: string;   // e.g. "grinning face"
    group: string;        // e.g. "Smileys & Emotion"
    hexcode: string;      // e.g. "1F600"
    tags: string[];       // e.g. ["smile", "happy"]
    subgroup: string;     // e.g. "face-smiling"
    version: string;      // e.g. "12.0"
    unicode: string;      // e.g. "😀"
  }

  const data: OpenMojiItem[];
  export default data;
}
