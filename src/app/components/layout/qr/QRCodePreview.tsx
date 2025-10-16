"use client";

import React, { useEffect, useRef, useState } from "react";
import { Download, RefreshCw, Save, Lock } from "lucide-react";
import QRCodeStyling from "qr-code-styling";
import { useRouter } from "next/navigation";

import { QRCodeSettings } from "@/app/components/layout/qr/QRCodeSettings";
import { formatQRDataToURL, createQRData, parseUserInput, QRType } from "../../../lib/qrDataUtils";

interface UserData {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

interface QRCodePreviewProps {
  settings?: QRCodeSettings;
  user?: UserData | null;
  refreshQRStats?: () => void;
  onReset?: () => void;
}

const QRCodePreview: React.FC<QRCodePreviewProps> = ({
  settings = {
    url: '',
    cornerShape: 'square',
    eyeShape: 'square',
    qrShape: 'square',
    qrCodeShape: 'square',
    foregroundColor: '#000000',
    dotColor: '#000000',
    cornerColor: '#000000',
    eyeColor: '#000000',
    backgroundColor: '#FFFFFF',
    logoImage: '',
    backgroundImage: undefined,
    processedLogoPath: undefined,
    frameStyle: undefined,
    frameText: undefined,
    frameTextSize: undefined,
    frameColor: undefined,
    frameTextColor: undefined,
    dataType: undefined
  },
  user = null,
  refreshQRStats, onReset
}) => {
  // Debug received settings
  //console.log('=== QRCODE PREVIEW RECEIVED SETTINGS ===');
  // Monitor settings changes
  useEffect(() => {
    //console.log('=== SETTINGS CHANGE DETECTED ===');
  }, [settings.logoImage]);

  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstance = useRef<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [shouldBlur, setShouldBlur] = useState(false);
  const [businesscardCreated, setBusinesscardCreated] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const router = useRouter();
  // Extend blurState logic to handle other data types
  useEffect(() => {
    let blurState = false;

    switch (settings.dataType) {
      case 'vcard': {
        const vcard = settings.vcard || {};
        blurState = !vcard.name?.trim() || !vcard.phone?.trim() || !vcard.email?.trim();
        break;
      }
      case 'businesscard': {
        const businesscard = settings.businesscard || {};
        blurState = !businesscard.name?.trim() || !businesscard.phone?.trim() || !businesscard.email?.trim();
        break;
      }
      case 'wifi': {
        const wifi = settings.wifi || {};
        blurState = !wifi.ssid?.trim();
        break;
      }
      case 'email':
        blurState = !settings.url || !/^[\S]+@[\S]+\.[\S]+$/.test(settings.url);
        break;
      case 'phone':
        blurState = !settings.url || !/^\+?[0-9]{7,15}$/.test(settings.url);
        break;
      case 'text':
        blurState = !settings.url || settings.url.trim() === '';
        break;
      default:
        blurState = !settings.url || settings.url.trim() === '';
    }

    setShouldBlur(blurState);
  }, [settings.dataType, settings.url, settings.vcard, settings.wifi]);

  // Map UI settings to qr-code-styling options
  const getQrOptions = (customSettings?: any) => {
    // Allowed values for qr-code-styling library
    type DotType = 'rounded' | 'dots' | 'classy' | 'classy-rounded' | 'square' | 'extra-rounded';
    type CornerSquareType = 'dot' | 'square' | 'extra-rounded' | 'dotted';
    type CornerDotType = 'dot' | 'square' | 'extra-rounded';

    // Map body shapes to supported dot types
    const dotTypes: Record<string, DotType> = {
      square: "square",
      circle: "dots",
      rounded: "rounded",
      dots: "dots",
      classy: "classy",
      classyRounded: "classy-rounded",
      "classy-rounded": "classy-rounded",
      "extra-rounded": "extra-rounded",
      minimal: "square",
    };

    // Map corner shapes to supported corner square types
    const cornersSquareTypes: Record<string, CornerSquareType> = {
      square: "square",
      circle: "dot",
      rounded: "extra-rounded",
      dotted: "dotted",

    };

    // Map eye shapes to supported corner dot types
    const cornersDotTypes: Record<string, CornerDotType> = {
      square: "square",
      rounded: "extra-rounded",
      circle: "dot",
    };
    
    // Use custom settings if provided, otherwise use component settings
    const currentSettings = customSettings || settings;
    const options: any = {
      width: settings.qrCodeShape !== 'square' ? 240 : 280,
      height: settings.qrCodeShape !== 'square' ? 240 : 280,
      // Use Canvas type if backgroundImage is present for reliable rendering
      type: currentSettings.backgroundImage ? "canvas" : "svg",
      data: "https://example.com",
      image: undefined,
      margin: settings.qrCodeShape !== 'square' ? 10 : 0,
      qrOptions: {
        type: "Canvas" as const,
        mode: "Byte" as const,
        errorCorrectionLevel: "Q" as const,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.15,
        margin: 0,
      },
      dotsOptions: {
        type: dotTypes[currentSettings.qrShape] || "square",
        color: currentSettings.dotColor || currentSettings.foregroundColor || "#000000",
      },
      backgroundOptions: {
        color: currentSettings.backgroundImage ? "transparent" : (currentSettings.backgroundColor || "#FFFFFF"),
      },
      cornersSquareOptions: {
        type: cornersSquareTypes[currentSettings.cornerShape] || "square",
        color: currentSettings.cornerColor || currentSettings.foregroundColor || "#000000",
      },
      cornersDotOptions: {
        type: cornersDotTypes[currentSettings.eyeShape] || "square",
        color: currentSettings.eyeColor || currentSettings.foregroundColor || "#000000",
      },
    };

  
    // Handle logo image
    if (currentSettings.logoImage) {
      let logoUrl = currentSettings.logoImage;
      
      // Handle different logo formats
      if (typeof currentSettings.logoImage === 'object' && currentSettings.logoImage.url) {
        logoUrl = currentSettings.logoImage.url;
      } else if (typeof currentSettings.logoImage === 'object' && currentSettings.logoImage.dataUrl) {
        logoUrl = currentSettings.logoImage.dataUrl;
      } else if (typeof currentSettings.logoImage === 'string') {
        logoUrl = String(currentSettings.logoImage);
      }
      
      // Validate the URL
      if (
        typeof logoUrl !== 'string' ||
        !logoUrl ||
        logoUrl === '[object Object]' ||
        logoUrl === 'undefined' ||
        logoUrl === 'null' ||
        logoUrl.trim() === ''
      ) {
        console.warn('Invalid logo URL, skipping:', currentSettings.logoImage);
        return options;
      }
      
      // Ensure proper URL format
      let finalLogoUrl = logoUrl;
      if (logoUrl.startsWith('/') && !logoUrl.startsWith('//')) {
        finalLogoUrl = `${window.location.origin}${logoUrl}`;
      }
      
      // Set image URL directly (QRCodeStyling expects a string, not an object)
      (options as any).image = finalLogoUrl;
      
      console.log('✅ Logo configured successfully:', finalLogoUrl);
      
      // Also set additional image options if needed
      options.imageOptions = {
        hideBackgroundDots: true,
        imageSize: 0.15,
        margin: 0
      };
    }
    if (currentSettings.backgroundImage) {
      (options.backgroundOptions as any).image = currentSettings.backgroundImage;
    }
    return options;
  };

  // Initialize and update QR code
  useEffect(() => {
    if (qrRef.current) {
      qrRef.current.innerHTML = "";
      let displayData = settings.url && settings.url.trim() !== '' ? settings.url : 'https://example.com';
      
    // Format the URL/data based on the data type using JSON structure
    if (settings.dataType) {
      try {
        let qrData;

        if (settings.dataType === 'vcard') {
          qrData = createQRData('vcard', settings.vcard || {});
          displayData = formatQRDataToURL(qrData);
        } else if (settings.dataType === 'businesscard') {
          qrData = createQRData('businesscard', settings.businesscard || {});
          displayData = formatQRDataToURL(qrData);
        }
         else if (settings.url) {
          // Other QR types
          qrData = createQRData(settings.dataType as QRType, parseUserInput(settings.dataType as QRType, settings.url));
          displayData = formatQRDataToURL(qrData);
        }

      } catch (error) {
        console.warn('Failed to format QR data:', error);
        // Fallback to original URL
        displayData = settings.url && settings.url.startsWith('http') ? settings.url : `https://${settings.url}`;
      }
    }

      
      if (!displayData || displayData.trim() === '') {
        const size = settings.qrCodeShape !== 'square' ? 240 : 280;
        qrRef.current.innerHTML = `
          <div style="
            width: ${size}px; 
            height: ${size}px; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            background-color: ${settings.backgroundColor || '#fff'}; 
            border: 2px solid #e5e7eb; 
            border-radius: ${settings.qrCodeShape === 'circle' ? '50%' : '8px'};
            font-size: ${size * 0.5}px; 
            color: #9ca3af; 
            font-weight: bold;
          ">
            ?
          </div>
        `;
      } else {
        try {
          const qrOptions = getQrOptions(settings);
          
          console.log('=== QR CODE GENERATION DEBUG ===');
          
          // Always recreate QR instance when settings change
          if (qrInstance.current) {
            console.log('Destroying existing QR instance');
            qrRef.current.innerHTML = "";
          }
          
            console.log('=== QR INSTANCE CREATION ===');
        
            qrInstance.current = new QRCodeStyling({
              ...qrOptions,
              data: displayData
            });
            console.log('QR instance created successfully');
          console.log('=== QR INSTANCE APPEND ===');
          qrInstance.current.append(qrRef.current);
          console.log('QR instance appended successfully');
          // Blur effect for placeholder - use setTimeout to avoid React style conflicts
          setTimeout(() => {
            const qrElement = qrRef.current?.querySelector('canvas') || qrRef.current?.querySelector('svg');
          if (qrElement) {
            if (shouldBlur) {
              qrElement.style.filter = 'sepia(0.3) hue-rotate(200deg) saturate(1.5) brightness(0.8)';
              qrElement.style.opacity = '0.7';
            } else {
              qrElement.style.filter = 'none';
              qrElement.style.opacity = '1';
            }
          }
          }, 0);
        } catch (error) {
          console.error('Error creating QR code:', error);
          const size = settings.qrCodeShape !== 'square' ? 240 : 280;
          qrRef.current.innerHTML = `
            <div style="
              width: ${size}px; 
              height: ${size}px; 
              display: flex; 
              align-items: center; 
              justify-content: center; 
              background-color: #fee2e2; 
              border: 2px solid #fecaca; 
              border-radius: ${settings.qrCodeShape === 'circle' ? '50%' : '8px'};
              color: #dc2626; 
              font-size: 14px; 
              text-align: center;
              padding: 20px;
            ">
              Error creating QR code
            </div>
          `;
        }
      }
    }
  }, [settings, settings.dotColor, settings.foregroundColor, settings.cornerColor, settings.eyeColor, settings.backgroundColor, settings.frameStyle, settings.frameText, settings.backgroundImage]);

  const downloadQR = () => {
    if (qrInstance.current) {
      qrInstance.current.download({ name: 'qr-code', extension: 'png' });
    }
  };

  const handleCreateQRClick = () => {
    if (!user) {
      alert('Please log in to create QR codes');
      return;
    }
    setShowConfirmPopup(true);
  };

  const confirmCreateQR = async () => {
    if (!user) return;
    setIsSaving(true);
    setSaveMessage("");
    setShowConfirmPopup(false);
    try {
      // Check subscription limit first
      const limitCheck = await fetch('/api/subscription/check-limit');
      if (!limitCheck.ok) {
        setSaveMessage('Failed to check subscription limit');
        setIsSaving(false);
        return;
      }
      const limitData = await limitCheck.json();
      
      if (!limitData.canCreate) {
        // Check if user has Pro subscription (unlimited)
        const userResponse = await fetch('/api/subscription/user-data');
        if (userResponse.ok) {
          const userData = await userResponse.json();
          if (userData.planName === 'Pro') {
            setSaveMessage(`QR code limit reached. You've used ${limitData.qrCodesUsed}/${limitData.qrCodesLimit} QR codes. Please contact support.`);
          } else {
            setSaveMessage(`QR code limit reached. You've used ${limitData.qrCodesUsed}/${limitData.qrCodesLimit} QR codes. Please upgrade your plan.`);
          }
        } else {
        setSaveMessage(`QR code limit reached. You've used ${limitData.qrCodesUsed}/${limitData.qrCodesLimit} QR codes. Please upgrade your plan.`);
        }
        setIsSaving(false);
        return;
      }

      // Create structured QR data
      const qrType = settings.dataType as QRType || 'website';
      let qrData;
      if (qrType === 'vcard') {
        qrData = settings.vcard || {};
      } else if (qrType === 'businesscard') {
        qrData = settings.businesscard || {};
      } else if (qrType === 'wifi') {
        qrData = settings.wifi || {};
      } else {
        qrData = parseUserInput(qrType, settings.url);
      }
      const structuredQRData = createQRData(qrType, qrData);

      // 1. Create the QR code in the database to get the uniqueCode
      const qrDataForAPI = {
        qrType,
        qrData,
        metadata: {
          createdFrom: 'web-interface',
          originalDataType: settings.dataType
        },
        cornerShape: settings.cornerShape,
        eyeShape: settings.eyeShape,
        qrShape: settings.qrShape,
        foregroundColor: settings.foregroundColor,
        backgroundColor: settings.backgroundColor,
        dotColor: settings.dotColor,
        cornerColor: settings.cornerColor,
        eyeColor: settings.eyeColor,
        // Frame settings
        frameStyle: settings.frameStyle,
        frameText: settings.frameText,
        frameTextSize: settings.frameTextSize,
        frameColor: settings.frameColor,
        frameTextColor: settings.frameTextColor,
        userId: user.id,
      };
      const createRes = await fetch("/api/qr", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(qrDataForAPI),
      });
      if (!createRes.ok) {
        const errorData = await createRes.json();
        setSaveMessage(errorData.error || 'Failed to create QR code');
        setIsSaving(false);
        return;
      }
     // ✅ INSERT HERE
          const createdQR = await createRes.json();
          const serverLink = createdQR.serverLink;

          // Save uniqueCode in state
          if (createdQR.uniqueCode) {
            setUniqueCode(createdQR.uniqueCode);
          }
      
      // 2. Generate the QR code image with the server link and frame
      let qrSettings = {
        ...settings,
        url: serverLink,
      };
      if (!qrInstance.current) {
        qrInstance.current = new QRCodeStyling({
          ...getQrOptions(qrSettings),
          data: serverLink,
        });
      }
      qrInstance.current.update({
        ...getQrOptions(qrSettings),
        data: serverLink,
      });
      
      // Generate QR code blob
      const qrBlob = await qrInstance.current.getRawData('png');
      if (!qrBlob) {
        setSaveMessage('Failed to export QR code image');
        setIsSaving(false);
        return;
      }
      
      // Create composite image with frame and text
      const blob = await createQRWithFrame(qrBlob, settings);
      
      // 3. Upload the image and update the QR code record
      const formData = new FormData();
      formData.append('image', blob, 'qr.png');
      formData.append('qrId', createdQR.id);
      // Add processed logo path if available
      if (settings.processedLogoPath) {
        formData.append('processedLogoPath', settings.processedLogoPath);
      }
      // Add background path if available
      if (settings.backgroundImage) {
        formData.append('backgroundPath', settings.backgroundImage);
      }
      // Add QR data for metadata
      formData.append('qrType', qrType);
      formData.append('userInput', settings.url);
      formData.append('metadata', JSON.stringify({
        createdFrom: 'web-interface',
        originalDataType: settings.dataType
      }));
      
      const uploadRes = await fetch(`/api/qr/${createdQR.id}/image`, {
        method: "POST",
        body: formData,
      });
      
      if (!uploadRes.ok) {
        const errorData = await uploadRes.json();
        setSaveMessage(errorData.error || 'Failed to upload QR code image');
        setIsSaving(false);
        return;
      }
      
      const uploadedQR = await uploadRes.json();
      if (onReset) onReset();
      setSaveMessage('QR code created successfully!');
      setIsSaving(false);
      if (qrType === 'businesscard') {
        setBusinesscardCreated(true);
      }
      // Refresh QR stats if callback provided
      if (refreshQRStats) {
        refreshQRStats();
      }
      
      // Clear the form after successful creation
      setTimeout(() => {
        setSaveMessage('');
        // Do NOT clear businesscardCreated here, so the button stays visible
      }, 3000);
      
    } catch (error) {
      console.error('Error creating QR code:', error);
      setSaveMessage('Failed to create QR code. Please try again.');
      setIsSaving(false);
    }
  };

  const cancelCreateQR = () => {
    setShowConfirmPopup(false);
  };

  const getFrameContainerClasses = () => {
    const baseClasses = "relative bg-white overflow-hidden border border-gray-200 ";
    // Increase height when frame is enabled to accommodate frame border and text
    const sizeClasses = settings.frameStyle && settings.frameStyle !== 'none' 
      ? "w-[302px] h-[342px]" // Larger size for frame with bigger QR code
      : "w-[280px] h-[280px]"; // Larger size for standard QR code
    return `${baseClasses} ${sizeClasses}`;
  };

  const getQRCodeShapeStyle = () => {
    const size = settings.frameStyle && settings.frameStyle !== 'none' ? 300 : 280;
  
    return {
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };
  };  

  const getFrameTextSizeClass = () => {
    switch (settings.frameTextSize) {
      case 'small': return 'text-xs';
      case 'medium': return 'text-sm';
      case 'large': return 'text-base';
      case 'xl': return 'text-lg';
      default: return 'text-sm';
    }
  };

  const createQRWithFrame = async (qrBlob: Blob, settings: QRCodeSettings): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Helper to draw everything after background is loaded
      const drawAll = (bgImg?: HTMLImageElement) => {
        const qrSize = 600;
        const framePadding = 36; // Increased padding to prevent cropping
        const borderWidth = 4;
        const textHeight = 40; // Space for frame text
        const totalWidth = qrSize + (framePadding * 2);
        const totalHeight = qrSize + (framePadding * 2) + (settings.frameText ? textHeight : 0);
        canvas.width = totalWidth;
        canvas.height = totalHeight;

        // Draw background image if present
        if (bgImg) {
          ctx.drawImage(bgImg, 0, 0, totalWidth, totalHeight);
        } else {
          // Draw background color
          ctx.fillStyle = settings.backgroundColor || '#FFFFFF';
          ctx.fillRect(0, 0, totalWidth, totalHeight);
        }

        // Draw frame if enabled
        if (settings.frameStyle && settings.frameStyle !== 'none') {
          ctx.save();
          ctx.strokeStyle = settings.frameColor || '#000000';
          ctx.lineWidth = borderWidth;
          ctx.strokeRect(
            framePadding - borderWidth / 2,
            framePadding - borderWidth / 2,
            qrSize + borderWidth,
            qrSize + borderWidth
          );
          ctx.restore();
        }

        // Draw QR code, shifted down to avoid cropping at top
        ctx.drawImage(
          img,
          framePadding,
          framePadding,
          qrSize,
          qrSize
        );

        // Draw frame text if provided
        if (settings.frameText) {
          ctx.save();
          // Draw text background
          ctx.fillStyle = settings.frameColor || '#000000';
          const textBgWidth = qrSize - 20;
          const textBgHeight = 40;
          const textBgX = framePadding + 10;
          const textBgY = framePadding + qrSize + 8; // Slightly increased Y for more space
          ctx.fillRect(textBgX, textBgY, textBgWidth, textBgHeight);
          // Draw text
          ctx.fillStyle = settings.frameTextColor || '#FFFFFF';
          const fontSize = settings.frameTextSize === 'large' ? 20 : 
                            settings.frameTextSize === 'xl' ? 22 : 
                            settings.frameTextSize === 'small' ? 16 : 18;
          ctx.font = `bold ${fontSize}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const textX = totalWidth / 2;
          const textY = textBgY + (textBgHeight / 2);
          ctx.fillText(settings.frameText, textX, textY);
          ctx.restore();
        }

        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob'));
          }
        }, 'image/png');
      };

      // Load QR code image
      const img = new Image();
      img.onload = () => {
        // If backgroundImage is set, load and draw it first
        if (settings.backgroundImage) {
          const bgImg = new Image();
          bgImg.crossOrigin = 'anonymous';
          bgImg.onload = () => drawAll(bgImg);
          bgImg.onerror = () => drawAll(); // fallback to color
          bgImg.src = settings.backgroundImage;
        } else {
          drawAll();
        }
      };
      img.onerror = () => reject(new Error('Failed to load QR image'));
      img.src = URL.createObjectURL(qrBlob);
    });
  };

  const [uniqueCode, setUniqueCode] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl shadow p-6 space-y-6 min-h-[525px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">QR Code Preview</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={downloadQR}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Download QR Code"
          >
            <Download size={18} />
          </button>
          <button
            onClick={() => window.location.reload()}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>
      
      {/* QR Code Display */}
      <div className="flex justify-center">
        <div className={getFrameContainerClasses()} style={{ position: 'relative' }}>
          {/* Always render background image if present */}
          {settings.backgroundImage && (
            <img
              src={settings.backgroundImage}
              alt="QR Background"
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0,
                borderRadius: getQRCodeShapeStyle().borderRadius || undefined,                
                top: 0,
                left: 0
              }}
            />
          )}
          {/* QR Code container - always single div */}
          <div
            ref={qrRef}
            className="flex items-center justify-center relative"
            style={{
              ...getQRCodeShapeStyle(),
              backgroundColor: !settings.backgroundImage ? (settings.backgroundColor || '#FFFFFF') : undefined,
              zIndex: 1
            }}
          />
          {/* Frame border and text overlays */}
          {settings.frameStyle && settings.frameStyle !== 'none' && (
            <>
              <div
                className={`absolute inset-0 pointer-events-none ${
                  settings.frameStyle === 'solid' ? 'border-2 border-solid' :
                  settings.frameStyle === 'dashed' ? 'border-2 border-dashed' :
                  settings.frameStyle === 'dotted' ? 'border-2 border-dotted' : ''
                }`}
                style={{
                  borderColor: settings.frameColor || '#000000',
                  borderRadius: getQRCodeShapeStyle().borderRadius || undefined,
                  zIndex: 2
                }}
              />
              {settings.frameText ? (
                <div
                  className={`${getFrameTextSizeClass()} absolute bottom-2 left-1/2 -translate-x-1/2 text-center font-bold p-2 rounded-lg shadow border border-gray-200 w-[90%]`}
                  style={{
                    backgroundColor: settings.frameColor || '#000000',
                    color: settings.frameTextColor || '#FFFFFF',
                    zIndex: 3
                  }}
                >
                  {settings.frameText}
                </div>
              ) : (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-xs text-gray-400 border-dashed border-gray-300 px-4 py-2 rounded-lg border-2 w-[90%]" style={{zIndex: 3}}>
                  No frame text set (Debug: frameText="{settings.frameText}")
                </div>
              )}
            </>
          )}
        </div>
      </div>
        
      {/* Action Buttons */}
      <div className="space-y-3">
        {user ? (
            <button
              onClick={handleCreateQRClick}
              disabled={isSaving || (
                (settings.dataType === 'vcard' || settings.dataType === 'businesscard')
                  ? !(
                      (settings.dataType === 'vcard' && settings.vcard?.name?.trim() && settings.vcard?.phone?.trim() && settings.vcard?.email?.trim()) ||
                      (settings.dataType === 'businesscard' && settings.businesscard?.name?.trim() && settings.businesscard?.phone?.trim() && settings.businesscard?.email?.trim())
                    )
                  : settings.dataType === 'wifi'
                  ? !(settings.wifi && settings.wifi.ssid?.trim())
                  : !settings.url || settings.url.trim() === ''
              )}
              className="w-full bg-[#063970] text-white py-3 px-4 rounded-full hover:bg-[#052a5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Create QR Code
                </>
              )}
            </button>
          ) : (
            <button
              disabled={true}
              className="w-full bg-gray-400 text-white py-3 px-4 rounded-full opacity-50 cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              <Lock size={18} />
              Create QR Code
            </button>
          )}

        {/* Customize DBC button: show if businesscardCreated and dataType is businesscard */}
        {businesscardCreated && settings.dataType === 'businesscard' && (
          
          <button
              className="w-full bg-green-600 text-white py-3 px-4 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              style={{ marginTop: '0.5rem' }}
              onClick={() => {
                if (!uniqueCode) {
                  console.error("No uniqueCode available");
                  return;
                }
            
                // Build query parameters
                const params = new URLSearchParams();
                params.set("uniqueCode", uniqueCode);
            
                // Navigate client-side with query parameters
                router.push(`/digital-business-cards/create?${params.toString()}`);
              }}
            >
              Customize DBC
            </button>
          )}
        
        {/* Save Message */}
        {saveMessage && (
          <div className={`p-3 rounded-lg text-sm ${
            saveMessage.includes('successfully') 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {saveMessage}
          </div>
        )}
      </div>

      {/* Confirmation Popup */}
      {showConfirmPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Create QR Code</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to create this QR code? It will be saved to your account.
            </p>
            <div className="flex gap-3">
                <button
                  onClick={cancelCreateQR}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmCreateQR}
                className="flex-1 px-4 py-2 bg-[#063970] text-white rounded-lg hover:bg-[#052a5a] transition-colors"
                >
                Create
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodePreview;