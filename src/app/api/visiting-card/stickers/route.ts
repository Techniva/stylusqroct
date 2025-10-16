import { getStickers } from "@/lib/emoji";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stickers = getStickers(100); // or any limit you want
    return NextResponse.json(stickers);
  } catch (error) {
    console.error("Sticker API error:", error);
    return NextResponse.json({ error: "Failed to fetch stickers" }, { status: 500 });
  }
}
