import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    console.log('Registration API called');
    const body = await request.json();
    console.log('Request body:', body);
    const { fullName, email, password } = body;

    // Validation
    if (!fullName || !email || !password) {
      console.log('Validation failed - missing fields:', { fullName: !!fullName, email: !!email, password: !!password });
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      console.log('Password too short:', password.length);
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    console.log('Checking if user exists...');
    
    // Add timeout to database query
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Database query timeout')), 10000); // 10 second timeout
    });

    // Check if user already exists with timeout
    const existingUserPromise = prisma.user.findUnique({
      where: { email },
    });

    const existingUser = await Promise.race([existingUserPromise, timeoutPromise]) as any;

    if (existingUser) {
      console.log('User already exists:', email);
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    console.log('Getting Free subscription...');
    // Get the Free subscription
    let freeSubscription = await prisma.subscription.findFirst({
      where: { name: 'Free', isActive: true }
    });

    if (!freeSubscription) {
      console.log('Free subscription not found, creating default subscription...');
      // Create default Free subscription if it doesn't exist
      freeSubscription = await prisma.subscription.create({
        data: {
          name: 'Free',
          description: 'Perfect for getting started',
          priceMonthly: 0,
          priceYearly: 0,
          qrCodesLimit: 5,
          features: JSON.stringify(['5 QR codes', 'Basic analytics', 'Standard templates', 'Email support']),
          isActive: true
        }
      });
      console.log('Created Free subscription:', freeSubscription.id);
    } else {
      console.log('Found existing Free subscription:', freeSubscription.id);
    }

    console.log('Hashing password...');
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log('Creating user with Free subscription...');
    // Set up subscription dates for free users (30 days validity)
    const registrationDate = new Date();
    const subscriptionEndDate = new Date(registrationDate);
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 30); // 30 days validity
    
    // Create user with Free subscription by default
    const userPromise = prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        subscriptionId: freeSubscription.id, // Assign Free subscription
        qrCodesLimit: freeSubscription.qrCodesLimit,
        isActive: true,
        qrCodesUsed: 0,
        subscriptionStart: registrationDate,
        subscriptionEnd: subscriptionEndDate
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        createdAt: true,
        subscription: {
          select: { name: true }
        }
      },
    });

    const user = await Promise.race([userPromise, timeoutPromise]) as any;

    console.log('User created successfully with Free subscription:', user);
    return NextResponse.json(
      { 
        message: 'User registered successfully with Free subscription',
        user: {
          ...user,
          plan: 'Free',
          qrCodesLimit: freeSubscription.qrCodesLimit
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    
    if (error instanceof Error && error.message === 'Database query timeout') {
      return NextResponse.json(
        { error: 'Database connection timeout. Please try again.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to register user' },
      { status: 500 }
    );
  }
} 