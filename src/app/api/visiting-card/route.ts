import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/lib/auth"; // Your provided auth helper
import { prisma } from "@/lib/prisma"; // Prisma client

export async function POST(req: NextRequest) {
  const { user } = await getAuth(req);

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { image } = await req.json();

  if (!image) {
    return NextResponse.json({ message: "Missing visiting card image" }, { status: 400 });
  }

  try {
    const visitingCard = await prisma.visitingCard.create({
      data: {
        userId: user.id,
        image,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ visitingCard }, { status: 201 });
  } catch (error) {
    console.error("Error creating visiting card:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
