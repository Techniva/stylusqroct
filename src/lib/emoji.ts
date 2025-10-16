import openmojiData from "openmoji/data/openmoji.json";
import { ElementItem } from "@/app/visiting-card/vc/data/elementCategories";

export function getStickers(limit = 100): ElementItem[] {
  // Serve sticker SVGs from the app's public/stickers directory. This avoids external CDN
  // requests and works offline in development. Ensure corresponding files exist under public/stickers.
  return openmojiData.slice(0, limit).map((emoji) => {
    const hex = (emoji.hexcode || '').toLowerCase();
    const localUrl = `/stickers/${hex}.svg`;
    return {
      id: hex,
      name: emoji.annotation,
      emoji: emoji.unicode,
      previewUrl: localUrl,
      sourceUrl: localUrl,
    };
  });
}
