import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/adminAuth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Resolve the params promise
    const { id } = await params;
    
    // Verify admin session
    const adminUser = await verifyAdminSession(request);
    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user has permission to delete admin users
    if (adminUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Only super admins can delete admin users' }, { status: 403 });
    }

    const userId = parseInt(id);
    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Prevent deleting self
    if (userId === adminUser.id) {
      return NextResponse.json({ error: 'Cannot delete your own account' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.adminUser.findUnique({
      where: { id: userId }
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'Admin user not found' }, { status: 404 });
    }

    // Delete the admin user
    await prisma.adminUser.delete({
      where: { id: userId }
    });

    return NextResponse.json({ 
      message: 'Admin user deleted successfully' 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 