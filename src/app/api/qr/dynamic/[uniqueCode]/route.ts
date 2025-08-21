import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { formatQRDataToURL } from '../../../../lib/qrDataUtils';
const UAParser = require('ua-parser-js');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ uniqueCode: string }> }
) {
  try {
    const { uniqueCode } = await params;
    
    console.log('Dynamic QR access for uniqueCode:', uniqueCode);
    
    // Find the QR code by uniqueCode
    const qrCode = await prisma.qRCode.findUnique({
      where: { uniqueCode },
      select: {
        id: true,
        qrData: true,
        lastLink: true,
        uniqueCode: true,
        updateCount: true,
        createdAt: true,
        updatedAt: true,
        qrStatus: true,
      },
    });

    if (!qrCode) {
      console.log('QR code not found for uniqueCode:', uniqueCode);
      return NextResponse.json(
        { error: 'QR code not found' },
        { status: 404 }
      );
    }

    if (!qrCode.qrStatus) {
      return new NextResponse('<html><body style="font-family:sans-serif;text-align:center;padding:2rem;"><h2 style="color:#063970;">This QR code is deactivated.</h2><p>Please contact the owner for more information.</p></body></html>', {
        status: 403,
        headers: { 'Content-Type': 'text/html' }
      });
    }

    // Get IP address from request headers (works for Vercel/Next.js API routes)
    let ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    if (ip.includes(',')) ip = ip.split(',')[0].trim();
    if (!ip) ip = 'unknown';

    // Fetch geolocation info from ip-api.com
    let country = null, region = null, city = null, isp = null;
    try {
      if (ip && ip !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1') {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,isp`);
        const geoData = await geoRes.json();
        if (geoData.status === 'success') {
          country = geoData.country || null;
          region = geoData.regionName || null;
          city = geoData.city || null;
          isp = geoData.isp || null;
        }
      }
    } catch (e) {
      // Ignore geolocation errors
    }

    // Parse User-Agent for device/browser info
    const ua = request.headers.get('user-agent') || '';
    const parser = new UAParser(ua);
    const deviceType = parser.getDevice().type || 'desktop';
    const osName = parser.getOS().name || null;
    const browserName = parser.getBrowser().name || null;

    // Log scan in ScanLog table
    await prisma.scanLog.create({
      data: {
        qr_code_id: qrCode.id,
        ip_address: ip,
        country,
        region,
        city,
        isp,
        device_type: deviceType,
        os_name: osName,
        browser_name: browserName,
      }
    });

    // Extract URL from qrData
    const redirectUrl = formatQRDataToURL(qrCode.qrData as any);
    console.log('QR code found, redirecting to:', redirectUrl);

    // (Removed scanCount increment)

    console.log('Redirecting to:', redirectUrl);
    
    // Return a redirect response
    return NextResponse.redirect(redirectUrl);
    
  } catch (error) {
    console.error('Error in dynamic QR redirect:', error);
    return NextResponse.json(
      { error: 'Failed to process dynamic QR code' },
      { status: 500 }
    );
  }
} 