// filepath: src/app/api/digital-business-cards/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const uniqueCode = searchParams.get('uniqueCode');

  if (uniqueCode) {
    const qr = await prisma.qRCode.findUnique({ where: { uniqueCode } });
    if (!qr) return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    if (qr.userId === null) {
      return NextResponse.json({ error: 'QR code userId not found' }, { status: 404 });
    }
    const dbc = await prisma.digitalBusinessCard.findFirst({
      where: { userId: qr.userId },
      orderBy: { createdAt: 'desc' },
    });
    if (!dbc) return NextResponse.json({ error: 'Digital business card not found' }, { status: 404 });
    return NextResponse.json({ dbc, qr });
  }
  if (!userId) {
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  }
  try {
    const dbcs = await prisma.digitalBusinessCard.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(dbcs);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch digital business cards' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  if (!data.userId || !data.name) {
    return NextResponse.json({ error: 'userId and name are required' }, { status: 400 });
  }
  try {
    const dbc = await prisma.digitalBusinessCard.create({
      data: {
        userId: parseInt(data.userId),
        name: data.name,
        title: data.title,
        company: data.company,
        phone: data.phone,
        email: data.email,
        address: data.address,
        website: data.website,
        about: data.about,
        pronoun: data.pronoun,
        accreditations: data.accreditations,
        theme: data.theme,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        fieldIcons: data.fieldIcons,
        activeFields: data.activeFields,
        fieldData: data.fieldData,
      },
    });
    return NextResponse.json(dbc, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create digital business card' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  if (!data.id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }
  try {
    const dbc = await prisma.digitalBusinessCard.update({
      where: { id: parseInt(data.id) },
      data: {
        name: data.name,
        title: data.title,
        company: data.company,
        phone: data.phone,
        email: data.email,
        address: data.address,
        website: data.website,
        about: data.about,
        pronoun: data.pronoun,
        accreditations: data.accreditations,
        theme: data.theme,
        primaryColor: data.primaryColor,
        secondaryColor: data.secondaryColor,
        fieldIcons: data.fieldIcons,
        activeFields: data.activeFields,
        fieldData: data.fieldData,
      },
    });
    return NextResponse.json(dbc);
  } catch {
    return NextResponse.json({ error: 'Failed to update digital business card' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }
  try {
    await prisma.digitalBusinessCard.delete({ where: { id: parseInt(id) } });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: 'Failed to delete digital business card' }, { status: 500 });
  }
}