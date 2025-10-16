// src/app/api/digital-business-cards/my-cards/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    // Get the authenticated user
    const { user } = await getAuth(req);
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Fetch all cards for this user
    const cards = await prisma.digitalBusinessCard.findMany({
      where: { userId: user.id },
      orderBy: { id: 'desc' },
      select: {
        id: true,
        uniqueCode: true,
        name: true,
        title: true,
        company: true,
        profileUrl: true,
        published: true,
      },
    });

    return NextResponse.json(cards);
  } catch (err) {
    console.error('GET /digital-business-cards/my-cards error:', err);
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 });
  }
}
