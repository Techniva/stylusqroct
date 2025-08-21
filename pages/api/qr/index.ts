import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { createQRData, parseUserInput, QRType } from '../../../src/app/lib/qrDataUtils';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { userId } = req.query;
      
      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const qrCodes = await prisma.qRCode.findMany({
        where: { userId: parseInt(userId as string) },
        select: {
          id: true,
          qrData: true,
          lastLink: true,
          uniqueCode: true,
          cornerShape: true,
          eyeShape: true,
          qrShape: true,
          foregroundColor: true,
          backgroundColor: true,
          dotColor: true,
          cornerColor: true,
          eyeColor: true,
          frameStyle: true,
          frameText: true,
          frameTextSize: true,
          frameColor: true,
          frameTextColor: true,
          updateCount: true,
          createdAt: true,
          updatedAt: true,
          userId: true,
          qrCodeImagePath: true,
          qrStatus: true,
          user: {
            select: {
              id: true,
              fullName: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return res.status(200).json(qrCodes);
    } catch (error) {
      console.error('Error fetching QR codes:', error);
      return res.status(500).json({ error: 'Failed to fetch QR codes' });
    }
  } else if (req.method === 'POST') {
    // Support JSON POST for initial QR creation
    if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
      try {
        let body = req.body;
        if (!body || typeof body !== 'object') {
          // Manually parse the body if not already parsed
          const buffers = [];
          for await (const chunk of req) {
            buffers.push(chunk);
          }
          const data = Buffer.concat(buffers).toString();
          body = JSON.parse(data);
        }
        const {
          qrType,
          qrData,
          metadata,
          cornerShape,
          eyeShape,
          qrShape,
          foregroundColor,
          backgroundColor,
          dotColor,
          cornerColor,
          eyeColor,
          // Frame settings
          frameStyle,
          frameText,
          frameTextSize,
          frameColor,
          frameTextColor,
          userId,
        } = body;

        // Create structured QR data
        const structuredQRData = createQRData(qrType as QRType, qrData, metadata);

        const qrCode = await prisma.qRCode.create({
          data: {
            qrData: structuredQRData as any,
            cornerShape,
            eyeShape,
            qrShape,
            foregroundColor,
            backgroundColor,
            dotColor,
            cornerColor,
            eyeColor,
            // Frame settings
            frameStyle,
            frameText,
            frameTextSize,
            frameColor,
            frameTextColor,
            updateCount: 0,
            userId: userId ? parseInt(userId) : null,
          },
          select: {
            id: true,
            qrData: true,
            lastLink: true,
            uniqueCode: true,
            cornerShape: true,
            eyeShape: true,
            qrShape: true,
            foregroundColor: true,
            backgroundColor: true,
            dotColor: true,
            cornerColor: true,
            eyeColor: true,
            // Frame settings
            frameStyle: true,
            frameText: true,
            frameTextSize: true,
            frameColor: true,
            frameTextColor: true,
            updateCount: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        });
        const origin = req.headers.origin || '';
        const serverLink = `${origin}/api/qr/dynamic/${qrCode.uniqueCode}`;
        const qrCodeWithServerLink = {
          ...qrCode,
          serverLink,
        };
        return res.status(200).json(qrCodeWithServerLink);
      } catch (error) {
        console.error('Error creating QR code (JSON):', error);
        let errorMessage = 'Failed to create QR code';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        return res.status(500).json({ error: errorMessage });
      }
    }
    const form = formidable({ multiples: false });
    form.parse(req, async (err: any, fields: formidable.Fields, files: formidable.Files) => {
      if (err) {
        console.error('Formidable error:', err);
        return res.status(500).json({ error: 'Failed to parse form data' });
      }

      try {
        // Helper to get a string from a field (handles string | string[] | undefined)
        const getString = (val: any) => Array.isArray(val) ? val[0] : (val ?? '');
        const qrType = getString(fields.qrType) as QRType;
        const userInput = getString(fields.userInput);
        const metadata = getString(fields.metadata);
        
        // Parse user input into structured data
        const qrData = parseUserInput(qrType, userInput);
        
        // Create structured QR data
        const structuredQRData = createQRData(qrType, qrData, metadata ? JSON.parse(metadata) : undefined);

        const cornerShape = getString(fields.cornerShape);
        const eyeShape = getString(fields.eyeShape);
        const qrShape = getString(fields.qrShape);
        const foregroundColor = getString(fields.foregroundColor);
        const backgroundColor = getString(fields.backgroundColor);
        const dotColor = getString(fields.dotColor);
        const cornerColor = getString(fields.cornerColor);
        const eyeColor = getString(fields.eyeColor);
        // Frame settings
        const frameStyle = getString(fields.frameStyle);
        const frameText = getString(fields.frameText);
        const frameTextSize = getString(fields.frameTextSize);
        const frameColor = getString(fields.frameColor);
        const frameTextColor = getString(fields.frameTextColor);
        const userId = getString(fields.userId);

        // Handle imageFile as File | File[] | undefined
        let imageFile: formidable.File | undefined;
        if (Array.isArray(files.image)) {
          imageFile = files.image[0];
        } else {
          imageFile = files.image;
        }
        if (!imageFile) {
          return res.status(400).json({ error: 'No image file uploaded' });
        }

        // 1. Create the QR code in the database (without image path)
        const qrCode = await prisma.qRCode.create({
          data: {
            qrData: structuredQRData as any,
            cornerShape,
            eyeShape,
            qrShape,
            foregroundColor,
            backgroundColor,
            dotColor,
            cornerColor,
            eyeColor,
            // Frame settings
            frameStyle,
            frameText,
            frameTextSize,
            frameColor,
            frameTextColor,
            updateCount: 0,
            userId: userId ? parseInt(userId) : null,
          },
          select: {
            id: true,
            qrData: true,
            lastLink: true,
            uniqueCode: true,
            cornerShape: true,
            eyeShape: true,
            qrShape: true,
            foregroundColor: true,
            backgroundColor: true,
            dotColor: true,
            cornerColor: true,
            eyeColor: true,
            // Frame settings
            frameStyle: true,
            frameText: true,
            frameTextSize: true,
            frameColor: true,
            frameTextColor: true,
            updateCount: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
              },
            },
          },
        });

        // 2. Save the uploaded image to public/qrcodes/<userId>/qr-<id>-<timestamp>/qr.png
        const userFolder = userId ? String(userId) : 'guest';
        const timestamp = Math.floor(Date.now() / 1000);
        const subfolderName = `qr-${qrCode.id}-${timestamp}`;
        const imageDir = path.join(process.cwd(), 'public', 'qrcodes', userFolder, subfolderName);
        if (!fs.existsSync(imageDir)) {
          fs.mkdirSync(imageDir, { recursive: true });
        }
        const imageFileName = 'qr.png';
        const imagePath = `/qrcodes/${userFolder}/${subfolderName}/${imageFileName}`;
        const filePath = path.join(imageDir, imageFileName);
        fs.copyFileSync(imageFile.filepath, filePath);
        
        // Create metadata file in the subfolder
        const metadataFile = {
          id: qrCode.id,
          userId: userId ? parseInt(userId) : null,
          uniqueCode: qrCode.uniqueCode,
          createdAt: new Date().toISOString(),
          imagePath: imagePath,
          subfolderName: subfolderName,
          qrData: structuredQRData
        };
        const metadataPath = path.join(imageDir, 'metadata.json');
        fs.writeFileSync(metadataPath, JSON.stringify(metadataFile, null, 2));

        // 3. Update the QR code record with the image path
        await prisma.qRCode.update({
          where: { id: qrCode.id },
          data: { qrCodeImagePath: imagePath },
        });

        // 4. Return the created QR code with server link
        const origin = req.headers.origin || '';
        const serverLink = `${origin}/api/qr/dynamic/${qrCode.uniqueCode}`;
        const qrCodeWithServerLink = {
          ...qrCode,
          serverLink,
        };

        return res.status(200).json(qrCodeWithServerLink);
      } catch (error) {
        console.error('Error creating QR code:', error);
        let errorMessage = 'Failed to create QR code';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (typeof error === 'string') {
          errorMessage = error;
        }
        return res.status(500).json({ error: errorMessage });
      }
    });
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
} 