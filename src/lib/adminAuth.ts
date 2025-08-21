import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { NextRequest } from 'next/server';

const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'admin_secret_key';
const ADMIN_COOKIE_NAME = 'stylusqr_admin_session';

interface AdminUser {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
}

export async function getAdminAuth(): Promise<{ admin: AdminUser | null }> {
  try {
    const { cookies } = await import('next/headers');
    const cookieStore = await cookies();
    const cookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
    
    if (!cookie) {
      return { admin: null };
    }
    
    const decoded = jwt.verify(cookie, ADMIN_JWT_SECRET) as AdminUser;
    
    // Verify admin still exists and is active
    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.id, isActive: true }
    });
    
    if (!admin) {
      return { admin: null };
    }
    
    return { admin: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      fullName: admin.fullName,
      role: admin.role
    }};
  } catch (error) {
    return { admin: null };
  }
}

export async function createAdminSession(adminId: number): Promise<string> {
  const admin = await prisma.adminUser.findUnique({
    where: { id: adminId }
  });
  
  if (!admin) {
    throw new Error('Admin not found');
  }
  
  const token = jwt.sign({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    fullName: admin.fullName,
    role: admin.role
  }, ADMIN_JWT_SECRET, { expiresIn: '24h' });
  
  // Update last login
  await prisma.adminUser.update({
    where: { id: adminId },
    data: { lastLogin: new Date() }
  });
  
  return token;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createAdminUser(data: {
  username: string;
  email: string;
  password: string;
  fullName: string;
  role?: string;
}): Promise<AdminUser> {
  const hashedPassword = await hashPassword(data.password);
  
  const admin = await prisma.adminUser.create({
    data: {
      username: data.username,
      email: data.email,
      password: hashedPassword,
      fullName: data.fullName,
      role: data.role || 'admin'
    }
  });
  
  return {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    fullName: admin.fullName,
    role: admin.role
  };
}

export async function verifyAdminSession(request: NextRequest): Promise<AdminUser | null> {
  try {
    const cookie = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    
    if (!cookie) {
      return null;
    }
    
    const decoded = jwt.verify(cookie, ADMIN_JWT_SECRET) as AdminUser;
    
    // Verify admin still exists and is active
    const admin = await prisma.adminUser.findUnique({
      where: { id: decoded.id, isActive: true }
    });
    
    if (!admin) {
      return null;
    }
    
    return {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      fullName: admin.fullName,
      role: admin.role
    };
  } catch (error) {
    return null;
  }
} 