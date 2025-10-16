import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const uniqueCode = searchParams.get('uniqueCode');
    const userId = searchParams.get('userId');

    if (!uniqueCode || !userId) {
      return NextResponse.json({ error: 'Both uniqueCode and userId are required' }, { status: 400 });
    }

    const dbc = await prisma.digitalBusinessCard.findFirst({
      where: {
        uniqueCode,
        userId: parseInt(userId, 10),
      },
    });

    if (!dbc) {
      return NextResponse.json({ error: 'Digital business card not found' }, { status: 404 });
    }

    return NextResponse.json(dbc);
  } catch (error) {
    console.error('GET /digital-business-cards error:', error);
    return NextResponse.json({ error: 'Failed to fetch digital business card' }, { status: 500 });
  }
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.userId || !data.name) {
      return NextResponse.json({ error: 'userId and name are required' }, { status: 400 });
    }

    const dbc = await prisma.digitalBusinessCard.create({
      data: {
        userId: parseInt(data.userId, 10),
        name: data.name,
        title: data.title || '',
        company: data.company || '',
        phone: data.phone || '',
        email: data.email || '',
        address: data.address || '',
        website: data.website || '',
        about: data.about || '',
        pronoun: data.pronoun || '',
        accreditations: data.accreditations || '',
        theme: data.theme || null,
        template: data.template || 'classic',
        primaryColor: data.primaryColor || '#021B35',
        secondaryColor: data.secondaryColor || '#FCC736',
       // fieldIcons: data.fieldIcons || {},
        activeFields: data.activeFields || [],
        fieldData: data.fieldData || {},
        uniqueCode: data.uniqueCode || '',
        profileUrl: data.profileUrl || '',
      },
    });

    return NextResponse.json(dbc, { status: 201 });
  } catch (error) {
    console.error('POST /digital-business-cards error:', error);
    return NextResponse.json({ error: 'Failed to create digital business card' }, { status: 500 });
  }
};

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data.uniqueCode) {
      return NextResponse.json({ error: 'uniqueCode is required' }, { status: 400 });
    }

    const dbc = await prisma.digitalBusinessCard.update({
      where: { uniqueCode: data.uniqueCode },
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
        profileUrl: data.profileUrl,
        theme: data.theme || null,
        template: data.template || 'classic',
        primaryColor: data.primaryColor || '#021B35',
        secondaryColor: data.secondaryColor || '#FCC736',
       // fieldIcons: data.fieldIcons || {},
        activeFields: data.activeFields || [],
        fieldData: data.fieldData || {},
      },
    });

    return NextResponse.json(dbc);
  } catch (error) {
    console.error('PUT /digital-business-cards error:', error);
    return NextResponse.json({ error: 'Failed to update digital business card' }, { status: 500 });
  }
};

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    await prisma.digitalBusinessCard.delete({ where: { id: parseInt(id, 10) } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('DELETE /digital-business-cards error:', error);
    return NextResponse.json({ error: 'Failed to delete digital business card' }, { status: 500 });
  }
};

//published/Unpublished logic
export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { uniqueCode, published } = data;

    if (!uniqueCode || typeof published !== "boolean") {
      return NextResponse.json(
        { error: "uniqueCode and published (boolean) are required" },
        { status: 400 }
      );
    }

    const dbc = await prisma.digitalBusinessCard.update({
      where: { uniqueCode },
      data: { published },
    });

    return NextResponse.json(dbc);
  } catch (error) {
    console.error("PATCH /digital-business-cards error:", error);
    return NextResponse.json(
      { error: "Failed to update publish state" },
      { status: 500 }
    );
  }
}