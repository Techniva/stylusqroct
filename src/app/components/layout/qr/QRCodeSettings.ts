import { QRType } from '../../../lib/qrDataUtils';

export interface QRCodeSettings {
  url: string;
  cornerShape: 'square' | 'dot' | 'extra-rounded';
  eyeShape: 'square' | 'circle' | 'rounded';
  qrShape: 'square' | 'circle' | 'rounded' | 'diamond' | 'hexagon' | 'octagon' | 'star' | 'heart';
  qrCodeShape: 'square' | 'circle' | 'rounded' | 'hexagon' | 'octagon'; // Overall QR code shape
  foregroundColor: string;
  dotColor: string;
  cornerColor: string;
  eyeColor: string;
  backgroundColor: string;
  logoImage: string;
  backgroundImage?: string;
  frameStyle?: 'none' | 'solid' | 'dashed' | 'dotted' | 'gradient';
  frameText?: string;
  frameTextSize?: 'small' | 'medium' | 'large' | 'xl';
  frameColor?: string;
  frameTextColor?: string;
  processedLogoPath?: string;
  dataType?: QRType;
  dataContent?: string;
  website?: {
    url: string;
    title?: string;
    description?: string;
  };
  wifi?: {
    ssid?: string; 
    password?: string;
    encryption?: string;
    hidden?: boolean;
  };
  email?: {
    email: string;
    subject?: string;
    body?: string;
  };
  phone?: {
    phone: string;
    countryCode?: string;
  };
  vcard?: {
    name?: string;
    phone?: string;
    email?: string;
    company?: string;
    title?: string;
    address?: string;
    website?: string;
  };
  // ...etc for other types
}
