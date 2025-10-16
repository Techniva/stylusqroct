import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import sharp from "sharp";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// ✅ Ensure JWT secret exists
const JWT_SECRET = process.env.JWT_SECRET!;
if (!JWT_SECRET) throw new Error("JWT_SECRET not set");

type JwtPayload = {
  id: string;
  email: string;
};

export async function POST(req: Request) {
  try {
    // ✅ Read cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("stylusqr_session")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ✅ Verify JWT safely
    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as unknown as JwtPayload;
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decoded.id;

    // ✅ Read uniqueCode and file from formData
    const formData = await req.formData();
    const uniqueCode = formData.get("uniqueCode") as string | null;
    const file = formData.get("file") as File | null;

    if (!file) return NextResponse.json({ error: "File is required" }, { status: 400 });
    if (!uniqueCode) return NextResponse.json({ error: "Unique code required" }, { status: 400 });

    // ✅ Validate file type and size
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return NextResponse.json({ error: "Only JPEG, PNG, or WebP allowed" }, { status: 400 });
    }
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "File too large (max 2MB)" }, { status: 400 });
    }

    // ✅ Check card ownership
    const card = await prisma.digitalBusinessCard.findUnique({
      where: { uniqueCode },
    });

    if (!card || card.userId !== Number(userId)) {
      return NextResponse.json({ error: "Unauthorized to upload for this card" }, { status: 403 });
    }

    // ✅ Prepare directory inside public/dbc/profile
    const safeUserId = String(userId).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uploadDir = path.join(process.cwd(), "public", "dbc", "profile", safeUserId, uniqueCode);
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    // ✅ Delete old profile pics
    const existingFiles = fs.readdirSync(uploadDir);
    for (const file of existingFiles) {
      fs.unlinkSync(path.join(uploadDir, file));
    }

    // ✅ Create unique file name with .jpg
    const fileName = `dbc_${Date.now()}_${randomUUID()}.jpg`;
    const filePath = path.join(uploadDir, fileName);

    // ✅ Convert file safely → fix black image issue
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));

    await sharp(buffer)
      .resize(512, 512, { fit: "cover", position: "center" }) // crop center
      .toColorspace("srgb") // normalize colors
      .jpeg({ quality: 85 })
      .toFile(filePath);

    // ✅ Public URL (served by Next.js automatically)
    const fileUrl = `/dbc/profile/${safeUserId}/${uniqueCode}/${fileName}`;

    return NextResponse.json({ url: fileUrl, fileName });

  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
