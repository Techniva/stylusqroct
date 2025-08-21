import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { verifyAdminSession } from '@/lib/adminAuth';

export async function GET(request: NextRequest) {
  try {
    // Verify admin session
    const adminUser = await verifyAdminSession(request);
    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has permission to view admin users
    if (adminUser.role !== 'super_admin' && adminUser.role !== 'admin') {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Get all admin users
    const adminUsers = await prisma.adminUser.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ users: adminUsers });
  } catch (error) {
    //console.error('Error fetching admin users:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify admin session
    const adminUser = await verifyAdminSession(request);
    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has permission to create admin users
    if (adminUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Only super admins can create admin users' }, { status: 403 });
    }

    const { fullName, email, password, role } = await request.json();

    // Validation
    if (!fullName || !email || !password || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Generate username from email (before @ symbol)
    const username = email.split('@')[0];

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters long' }, { status: 400 });
    }

    if (!['super_admin', 'admin', 'moderator'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Check if email or username already exists
    const existingUser = await prisma.adminUser.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email or username already exists' }, { status: 400 });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin user
    const newAdminUser = await prisma.adminUser.create({
      data: {
        fullName,
        email,
        username,
        password: hashedPassword,
        role,
        isActive: true
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        username: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    return NextResponse.json({ 
      message: 'Admin user created successfully',
      user: newAdminUser 
    }, { status: 201 });
  } catch (error) {
   // console.error('Error creating admin user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 