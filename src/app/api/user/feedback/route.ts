import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  const { user } = await getAuth();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const { rating, feedbackType, message } = await request.json();

    if (!rating || !feedbackType || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        feed_rating: rating,
        feed_type: feedbackType,
        feed_msg: message,
      },
    });

    return NextResponse.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { user } = await getAuth();
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: { feed_rating: true, feed_type: true, feed_msg: true },
    });
    const hasFeedback = Boolean(userData?.feed_rating && userData?.feed_type && userData?.feed_msg);
    return NextResponse.json({ hasFeedback });
  } catch (error) {
    console.error('Error checking feedback status:', error);
    return NextResponse.json({ error: 'Failed to check feedback status' }, { status: 500 });
  }
} 