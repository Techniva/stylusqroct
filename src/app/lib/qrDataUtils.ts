export interface QRDataBase {
  type: string;
  data: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface WebsiteQRData extends QRDataBase {
  type: 'website';
  data: {
    url: string;
    title?: string;
    description?: string;
  };
}

export interface EmailQRData extends QRDataBase {
  type: 'email';
  data: {
    email: string;
    subject?: string;
    body?: string;
  };
}

export interface PhoneQRData extends QRDataBase {
  type: 'phone';
  data: {
    phone: string;
    countryCode?: string;
  };
}

export interface WiFiQRData extends QRDataBase {
  type: 'wifi';
  data: {
    ssid: string;
    password?: string;
    encryption?: 'WEP' | 'WPA' | 'WPA2' | 'WPA3' | 'nopass';
    hidden?: boolean;
  };
}

export interface VCardQRData extends QRDataBase {
  type: 'vcard';
  data: {
    name: string;
    phone?: string;
    email?: string;
    company?: string;
    title?: string;
    address?: string;
    website?: string;
  };
}

export interface LocationQRData extends QRDataBase {
  type: 'location';
  data: {
    latitude: number;
    longitude: number;
    name?: string;
    address?: string;
  };
}

export interface WhatsAppQRData extends QRDataBase {
  type: 'whatsapp';
  data: {
    phone: string;
    message?: string;
    countryCode?: string;
  };
}

export interface InstagramQRData extends QRDataBase {
  type: 'instagram';
  data: {
    username: string;
    postId?: string;
    storyId?: string;
  };
}

export interface YouTubeQRData extends QRDataBase {
  type: 'youtube';
  data: {
    url: string;
    videoId?: string;
    channelId?: string;
    playlistId?: string;
  };
}

export interface PDFQRData extends QRDataBase {
  type: 'pdf';
  data: {
    url: string;
    filename?: string;
    size?: number;
  };
}

export interface LinkedInQRData extends QRDataBase {
  type: 'linkedin';
  data: {
    url: string;
    profileId?: string;
    companyId?: string;
  };
}

export interface TwitterQRData extends QRDataBase {
  type: 'twitter';
  data: {
    username: string;
    tweetId?: string;
  };
}

export interface FacebookQRData extends QRDataBase {
  type: 'facebook';
  data: {
    url: string;
    pageId?: string;
    postId?: string;
  };
}

export interface TextQRData extends QRDataBase {
  type: 'text';
  data: {
    text: string;
    encoding?: 'UTF-8' | 'Shift_JIS' | 'ISO-8859-1';
  };
}

export interface BusinessCardQRData extends QRDataBase {
  type: 'businesscard';
  data: {
    name: string;
    company?: string;
    title?: string;
    phone?: string;
    email?: string;    
    website?: string;
    address?: string;
  };
}

export type QRData = 
  | WebsiteQRData 
  | EmailQRData 
  | PhoneQRData 
  | WiFiQRData 
  | VCardQRData 
  | LocationQRData 
  | WhatsAppQRData 
  | InstagramQRData 
  | YouTubeQRData 
  | PDFQRData 
  | LinkedInQRData 
  | TwitterQRData 
  | FacebookQRData 
  | TextQRData
  | BusinessCardQRData;

// QR Code Type Configurations
export const QR_TYPE_CONFIGS = {
  website: {
    name: 'Website URL',
    icon: '🌐',
    description: 'Link to any website',
    placeholder: 'https://example.com',
    fields: ['url', 'title', 'description'],
    required: ['url']
  },
  text: {
    name: 'Text',
    icon: '📝',
    description: 'Plain text or message',
    placeholder: 'Enter your text here',
    fields: ['text', 'encoding'],
    required: ['text']
  },
  email: {
    name: 'Email',
    icon: '📧',
    description: 'Email address with subject',
    placeholder: 'email@example.com|Subject',
    fields: ['email', 'subject', 'body'],
    required: ['email']
  },
  phone: {
    name: 'Phone Number',
    icon: '📞',
    description: 'Phone number for calls',
    placeholder: '+1234567890',
    fields: ['phone', 'countryCode'],
    required: ['phone']
  },
  wifi: {
    name: 'WiFi',
    icon: '📶',
    description: 'WiFi network credentials',
    placeholder: 'Network name|Password|WPA',
    fields: ['ssid', 'password', 'encryption', 'hidden'],
    required: ['ssid']
  },
  vcard: {
    name: 'vCard',
    icon: '👤',
    description: 'Contact information',
    placeholder: 'Name|Phone|Email|Company',
    fields: ['name', 'phone', 'email', 'company', 'title', 'address', 'website'],
    required: ['name']
  },
  location: {
    name: 'Location',
    icon: '📍',
    description: 'GPS coordinates',
    placeholder: 'Latitude,Longitude',
    fields: ['latitude', 'longitude', 'name', 'address'],
    required: ['latitude', 'longitude']
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: '💬',
    description: 'WhatsApp chat or contact',
    placeholder: 'Phone number|Message',
    fields: ['phone', 'message', 'countryCode'],
    required: ['phone']
  },
  instagram: {
    name: 'Instagram',
    icon: '📸',
    description: 'Instagram profile or post',
    placeholder: '@username',
    fields: ['username', 'postId', 'storyId'],
    required: ['username']
  },
  youtube: {
    name: 'YouTube',
    icon: '📺',
    description: 'YouTube video or channel',
    placeholder: 'https://youtube.com/watch?v=...',
    fields: ['url', 'videoId', 'channelId', 'playlistId'],
    required: ['url']
  },
  pdf: {
    name: 'PDF Link',
    icon: '📄',
    description: 'Link to PDF document',
    placeholder: 'https://example.com/document.pdf',
    fields: ['url', 'filename', 'size'],
    required: ['url']
  },
  linkedin: {
    name: 'LinkedIn',
    icon: '💼',
    description: 'LinkedIn profile or post',
    placeholder: 'https://linkedin.com/in/username',
    fields: ['url', 'profileId', 'companyId'],
    required: ['url']
  },
  twitter: {
    name: 'Twitter/X',
    icon: '🐦',
    description: 'Twitter/X profile or post',
    placeholder: '@username',
    fields: ['username', 'tweetId'],
    required: ['username']
  },
  facebook: {
    name: 'Facebook',
    icon: '📘',
    description: 'Facebook page or post',
    placeholder: 'https://facebook.com/pagename',
    fields: ['url', 'pageId', 'postId'],
    required: ['url']
  },
  businesscard: {
    name: 'Business Card',
    icon: '💳',
    description: 'Digital business card with contact details',
    placeholder: 'Name|Phone|Email|Company|Title|Address|Website',
    fields: ['name', 'phone', 'email', 'company', 'title', 'address', 'website'],
    required: ['name']
  }
} as const;

export type QRType = keyof typeof QR_TYPE_CONFIGS;

// Utility functions
export function createQRData(type: QRType, data: Record<string, any>, metadata?: Record<string, any>): QRData {
  const config = QR_TYPE_CONFIGS[type];
  if (!config) {
    throw new Error(`Invalid QR type: ${type}`);
  }

  // Validate required fields
  for (const required of config.required) {
    if (!data[required]) {
      throw new Error(`Missing required field: ${required}`);
    }
  }

  return {
    type,
    data,
    metadata
  } as QRData;
}

export function formatQRDataToURL(qrData: QRData): string {
  switch (qrData.type) {
    case 'website':
      const url = qrData.data.url;
      return url.startsWith('http') ? url : `https://${url}`;
    
    case 'text':
      return qrData.data.text;
    
    case 'email':
      const emailAddr = qrData.data.email;
      const emailSubject = qrData.data.subject ? `&subject=${encodeURIComponent(qrData.data.subject)}` : '';
      const emailBody = qrData.data.body ? `&body=${encodeURIComponent(qrData.data.body)}` : '';
      return `mailto:${emailAddr}${emailSubject}${emailBody}`;
    
    case 'phone':
      const phoneNumber = qrData.data.phone.replace(/[^\d+]/g, '');
      return `tel:${phoneNumber}`;
    
    case 'wifi':
      const { ssid: wifiSsid, password: wifiPassword = '', encryption: wifiEncryption = 'WPA' } = qrData.data;
      return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
    
    case 'vcard': {
      const vcardData = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${qrData.data.name}`,
        qrData.data.phone ? `TEL:${qrData.data.phone}` : "",
        qrData.data.email ? `EMAIL:${qrData.data.email}` : "",
        qrData.data.company ? `ORG:${qrData.data.company}` : "",
        qrData.data.title ? `TITLE:${qrData.data.title}` : "",
        qrData.data.address ? `ADR:;;${qrData.data.address}` : "",
        qrData.data.website ? `URL:${qrData.data.website}` : "",
        "END:VCARD",
      ].filter(Boolean).join("\n");
      return `data:text/vcard;charset=utf-8,${encodeURIComponent(vcardData)}`;
    }

    case 'businesscard': {
      const bcData = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${qrData.data.name}`,
        qrData.data.phone ? `TEL:${qrData.data.phone}` : "",
        qrData.data.email ? `EMAIL:${qrData.data.email}` : "",
        qrData.data.company ? `ORG:${qrData.data.company}` : "",
        qrData.data.title ? `TITLE:${qrData.data.title}` : "",
        qrData.data.address ? `ADR:;;${qrData.data.address}` : "",
        qrData.data.website ? `URL:${qrData.data.website}` : "",
        "END:VCARD",
      ].filter(Boolean).join("\n");
      return `data:text/vcard;charset=utf-8,${encodeURIComponent(bcData)}`;
    }
  
    case 'location':
      const { latitude: locLat, longitude: locLng } = qrData.data;
      return `geo:${locLat},${locLng}`;
    
    case 'whatsapp':
      const whatsappPhoneNum = qrData.data.phone.replace(/[^\d]/g, '');
      const whatsappMessage = qrData.data.message ? `?text=${encodeURIComponent(qrData.data.message)}` : '';
      return `https://wa.me/${whatsappPhoneNum}${whatsappMessage}`;
    
    case 'instagram':
      const instagramUsername = qrData.data.username.replace('@', '');
      return `https://instagram.com/${instagramUsername}`;
    
    case 'youtube':
      return qrData.data.url;
    
    case 'pdf':
      return qrData.data.url;
    
    case 'linkedin':
      return qrData.data.url;
    
    case 'twitter':
      const twitterUsernameHandle = qrData.data.username.replace('@', '');
      return `https://twitter.com/${twitterUsernameHandle}`;
    
    case 'facebook':
      return qrData.data.url;
    
    default:
      throw new Error(`Unknown QR type: ${(qrData as any).type}`);
  }
}

export function validateQRData(qrData: QRData): boolean {
  const config = QR_TYPE_CONFIGS[qrData.type as QRType];
  if (!config) return false;

  // Check required fields
  for (const required of config.required) {
    if (!(qrData.data as any)[required]) return false;
  }

  // Type-specific validation
  switch (qrData.type) {
    case 'email':
      const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailValidationRegex.test(qrData.data.email);
    
    case 'phone':
      const cleanPhoneNumber = qrData.data.phone.replace(/[^\d]/g, '');
      return cleanPhoneNumber.length >= 7;
    
    case 'location':
      const { latitude: lat, longitude: lng } = qrData.data;
      return !isNaN(lat) && !isNaN(lng) && 
             lat >= -90 && lat <= 90 && 
             lng >= -180 && lng <= 180;
    
    case 'website':
    case 'youtube':
    case 'pdf':
    case 'linkedin':
    case 'facebook':
      try {
        new URL(qrData.data.url.startsWith('http') ? qrData.data.url : `https://${qrData.data.url}`);
        return true;
      } catch {
        return false;
      }
    
    default:
      return true;
  }
}

export function parseUserInput(type: QRType, input: string): Record<string, any> {
  const config = QR_TYPE_CONFIGS[type];
  if (!config) throw new Error(`Invalid QR type: ${type}`);

  switch (type) {
    case 'email':
      const [emailAddr, subject, body] = input.split('|');
      return { email: emailAddr?.trim(), subject: subject?.trim(), body: body?.trim() };
    
    case 'wifi':
      const [ssid, password, encryption] = input.split('|');
      return { 
        ssid: ssid?.trim(), 
        password: password?.trim(), 
        encryption: encryption?.trim() || 'WPA' 
      };
    
      case 'vcard': {
        const [name, phone, email, company, title, address, website] = input.split('|');
        return { 
          name: name?.trim(),
          phone: phone?.trim(),
          email: email?.trim(),
          company: company?.trim(),
          title: title?.trim(),
          address: address?.trim(),
          website: website?.trim()
        };
      };
      
      case 'businesscard': {
        const [name, phone, email, company, title, address, website] = input.split('|');
        return { 
          name: name?.trim(),
          phone: phone?.trim(),
          email: email?.trim(),
          company: company?.trim(),
          title: title?.trim(),
          address: address?.trim(),
          website: website?.trim()
        };
      }
       
    case 'location':
      const [latCoord, lngCoord] = input.split(',').map(coord => parseFloat(coord.trim()));
      return { latitude: latCoord, longitude: lngCoord };
    
    case 'whatsapp':
      const [whatsappPhone, message] = input.split('|');
      return { phone: whatsappPhone?.trim(), message: message?.trim() };
    
    case 'instagram':
      return { username: input.replace('@', '').trim() };
    
    case 'twitter':
      return { username: input.replace('@', '').trim() };
    
    case 'text':
      return { text: input.trim() };
    
    case 'phone':
      return { phone: input.trim() };
    
    case 'website':
    case 'youtube':
    case 'pdf':
    case 'linkedin':
    case 'facebook':
      return { url: input.trim() };
    
    default:
      return { [config.required[0]]: input.trim() };
  }
}

export function getQRDataDisplayName(qrData: QRData): string {
  const config = QR_TYPE_CONFIGS[qrData.type as QRType];
  return config?.name || qrData.type;
}

export function getQRDataIcon(qrData: QRData): string {
  const config = QR_TYPE_CONFIGS[qrData.type as QRType];
  return config?.icon || '📱';
} 