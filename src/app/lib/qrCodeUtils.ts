export interface QRCodeTypeConfig {
  name: string;
  icon: string;
  description: string;
  placeholder: string;
  formatUrl: (input: string) => string;
  validation?: (input: string) => boolean;
}

export const QR_CODE_TYPES: Record<string, QRCodeTypeConfig> = {
  'Website URL': {
    name: 'Website URL',
    icon: '🌐',
    description: 'Link to any website',
    placeholder: 'https://example.com',
    formatUrl: (input: string) => {
      if (!input.startsWith('http://') && !input.startsWith('https://')) {
        return `https://${input}`;
      }
      return input;
    },
    validation: (input: string) => {
      try {
        new URL(input.startsWith('http') ? input : `https://${input}`);
        return true;
      } catch {
        return false;
      }
    }
  },
  'Text': {
    name: 'Text',
    icon: '📝',
    description: 'Plain text or message',
    placeholder: 'Enter your text here',
    formatUrl: (input: string) => input
  },
  'Email': {
    name: 'Email',
    icon: '📧',
    description: 'Email address with subject',
    placeholder: 'email@example.com',
    formatUrl: (input: string) => {
      const [email, subject] = input.split('|');
      const cleanEmail = email.trim();
      const cleanSubject = subject ? `&subject=${encodeURIComponent(subject.trim())}` : '';
      return `mailto:${cleanEmail}${cleanSubject}`;
    },
    validation: (input: string) => {
      const email = input.split('|')[0].trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  },
  'Phone Number': {
    name: 'Phone Number',
    icon: '📞',
    description: 'Phone number for calls',
    placeholder: '+1234567890',
    formatUrl: (input: string) => {
      const cleanNumber = input.replace(/[^\d+]/g, '');
      return `tel:${cleanNumber}`;
    },
    validation: (input: string) => {
      const cleanNumber = input.replace(/[^\d+]/g, '');
      return cleanNumber.length >= 7;
    }
  },
  'WiFi': {
    name: 'WiFi',
    icon: '📶',
    description: 'WiFi network credentials',
    placeholder: 'Network name|Password|WPA',
    formatUrl: (input: string) => {
      const [ssid, password, encryption] = input.split('|');
      const cleanSsid = ssid.trim();
      const cleanPassword = password ? password.trim() : '';
      const cleanEncryption = encryption ? encryption.trim() : 'WPA';
      return `WIFI:T:${cleanEncryption};S:${cleanSsid};P:${cleanPassword};;`;
    },
    validation: (input: string) => {
      const parts = input.split('|');
      return Boolean(parts[0] && parts[0].trim().length > 0);
    }
  },
  'vCard': {
    name: 'vCard',
    icon: '👤',
    description: 'Contact information',
    placeholder: 'Name|Phone|Email|Company',
    formatUrl: (input: string) => {
      const [name, phone, email, company] = input.split('|');
      const vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${name || ''}`,
        `TEL:${phone || ''}`,
        `EMAIL:${email || ''}`,
        `ORG:${company || ''}`,
        'END:VCARD'
      ].join('\n');
      return `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`;
    },
    validation: (input: string) => {
      const parts = input.split('|');
      return Boolean(parts[0] && parts[0].trim().length > 0);
    }
  },
  'Location': {
    name: 'Location',
    icon: '📍',
    description: 'GPS coordinates',
    placeholder: 'Latitude,Longitude',
    formatUrl: (input: string) => {
      const [lat, lng] = input.split(',').map(coord => coord.trim());
      return `geo:${lat},${lng}`;
    },
    validation: (input: string) => {
      const coords = input.split(',');
      if (coords.length !== 2) return false;
      const [lat, lng] = coords.map(coord => parseFloat(coord.trim()));
      return !isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
    }
  },
  'WhatsApp': {
    name: 'WhatsApp',
    icon: '💬',
    description: 'WhatsApp chat or contact',
    placeholder: 'Phone number|Message',
    formatUrl: (input: string) => {
      const [phone, message] = input.split('|');
      const cleanPhone = phone.replace(/[^\d]/g, '');
      const cleanMessage = message ? encodeURIComponent(message.trim()) : '';
      return `https://wa.me/${cleanPhone}${cleanMessage ? `?text=${cleanMessage}` : ''}`;
    },
    validation: (input: string) => {
      const phone = input.split('|')[0];
      const cleanPhone = phone.replace(/[^\d]/g, '');
      return cleanPhone.length >= 7;
    }
  },
  'Instagram': {
    name: 'Instagram',
    icon: '📸',
    description: 'Instagram profile or post',
    placeholder: 'https://instagram.com/username',
    formatUrl: (input: string) => {
      if (!input.startsWith('http')) {
        return `https://instagram.com/${input.replace('@', '')}`;
      }
      return input;
    },
    validation: (input: string) => {
      return input.includes('instagram.com') || input.startsWith('@') || input.length > 0;
    }
  },
  'YouTube': {
    name: 'YouTube',
    icon: '📺',
    description: 'YouTube video or channel',
    placeholder: 'https://youtube.com/watch?v=...',
    formatUrl: (input: string) => {
      if (!input.startsWith('http')) {
        return `https://youtube.com/${input}`;
      }
      return input;
    },
    validation: (input: string) => {
      return input.includes('youtube.com') || input.includes('youtu.be') || input.length > 0;
    }
  },
  'PDF Link': {
    name: 'PDF Link',
    icon: '📄',
    description: 'Link to PDF document',
    placeholder: 'https://example.com/document.pdf',
    formatUrl: (input: string) => {
      if (!input.startsWith('http://') && !input.startsWith('https://')) {
        return `https://${input}`;
      }
      return input;
    },
    validation: (input: string) => {
      try {
        new URL(input.startsWith('http') ? input : `https://${input}`);
        return input.toLowerCase().includes('.pdf');
      } catch {
        return false;
      }
    }
  },
  'LinkedIn': {
    name: 'LinkedIn',
    icon: '💼',
    description: 'LinkedIn profile or post',
    placeholder: 'https://linkedin.com/in/username',
    formatUrl: (input: string) => {
      if (!input.startsWith('http')) {
        return `https://linkedin.com/in/${input}`;
      }
      return input;
    },
    validation: (input: string) => {
      return input.includes('linkedin.com') || input.length > 0;
    }
  },
  'Twitter/X': {
    name: 'Twitter/X',
    icon: '🐦',
    description: 'Twitter/X profile or post',
    placeholder: 'https://twitter.com/username',
    formatUrl: (input: string) => {
      if (!input.startsWith('http')) {
        return `https://twitter.com/${input.replace('@', '')}`;
      }
      return input;
    },
    validation: (input: string) => {
      return input.includes('twitter.com') || input.includes('x.com') || input.startsWith('@') || input.length > 0;
    }
  },
  'Facebook': {
    name: 'Facebook',
    icon: '📘',
    description: 'Facebook page or post',
    placeholder: 'https://facebook.com/pagename',
    formatUrl: (input: string) => {
      if (!input.startsWith('http')) {
        return `https://facebook.com/${input}`;
      }
      return input;
    },
    validation: (input: string) => {
      return input.includes('facebook.com') || input.length > 0;
    }
  }
};

export function formatQRCodeUrl(dataType: string, input: string): string {
  const typeConfig = QR_CODE_TYPES[dataType];
  if (!typeConfig) {
    // Default to website URL if type not found
    return input.startsWith('http') ? input : `https://${input}`;
  }
  return typeConfig.formatUrl(input);
}

export function validateQRCodeInput(dataType: string, input: string): boolean {
  const typeConfig = QR_CODE_TYPES[dataType];
  if (!typeConfig || !typeConfig.validation) {
    return input.length > 0;
  }
  return typeConfig.validation(input);
}

export function getQRCodeTypeConfig(dataType: string): QRCodeTypeConfig | null {
  return QR_CODE_TYPES[dataType] || null;
} 