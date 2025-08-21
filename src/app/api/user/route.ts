import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';

// GET user data
export async function GET(request: NextRequest) {
  try {
    const { user } = await getAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        fullName: true,
        email: true,
        location: true,
        company: true,
        comp_position: true,
        usr_phone: true,
        emailNotificationsEnabled: true,
        smsNotificationsEnabled: true,
        pushNotificationsEnabled: true,
      },
    });

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Failed to fetch user data', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}

// PATCH to update user data
export async function PATCH(request: NextRequest) {
  try {
    const { user } = await getAuth(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { fullName, location, company, comp_position, usr_phone, emailNotificationsEnabled, smsNotificationsEnabled, pushNotificationsEnabled } = body;

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        fullName,
        location,
        company,
        comp_position,
        usr_phone,
        emailNotificationsEnabled,
        smsNotificationsEnabled,
        pushNotificationsEnabled,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        location: true,
        company: true,
        comp_position: true,
        usr_phone: true,
        emailNotificationsEnabled: true,
        smsNotificationsEnabled: true,
        pushNotificationsEnabled: true,
      },
    });
    // Log profile update
    await prisma.profileUpdateLog.create({
      data: { user_id: user.id }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ error: 'Failed to update user data', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
} 