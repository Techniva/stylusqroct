import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    // Get authenticated user
    const { user } = await getAuth(req);
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Get uniqueCode from query
    const url = new URL(req.url);
    const uniqueCode = url.searchParams.get("uniqueCode");
    if (!uniqueCode) {
      return NextResponse.json({ error: "uniqueCode is required" }, { status: 400 });
    }

    // Fetch card for this user
    const card = await prisma.digitalBusinessCard.findFirst({
      where: {
        uniqueCode,
        userId: user.id,
      },
      select: {
        id: true,
        uniqueCode: true,
        name: true,
        title: true,
        accreditations: true,
        address: true,
        company: true,
        phone: true,
        email: true,
        website: true,
        qrCodePath: true,
        profileUrl: true,
        published: true,
      },
    });

    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    return NextResponse.json(card);
  } catch (err) {
    console.error("GET /digital-business-cards/get-card error:", err);
    return NextResponse.json({ error: "Failed to fetch card" }, { status: 500 });
  }
}
