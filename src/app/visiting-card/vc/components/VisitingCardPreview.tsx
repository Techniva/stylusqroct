// src/components/VisitingCardPreview.tsx
"use client";

import React, { FC } from "react";
import { useRouter } from "next/navigation";

type DigitalBusinessCard = {
  id: number;
  uniqueCode: string;
  name: string;
  title?: string | null;
  company?: string | null;
  profileUrl?: string | null;
  address?: string | null;
  accreditations?: string | null;
  phone?: string | null;
  email?: string | null;
  website?: string | null;
  qrCodePath?: string | null;
};

interface VisitingCardPreviewProps {
  card: DigitalBusinessCard;
}

const VisitingCardPreview: FC<VisitingCardPreviewProps> = ({ card }) => {
  const router = useRouter();
  const contactInfo = [
    card.address && `🏢 ${card.address}`,
    card.phone && `📞 ${card.phone}`,
    card.email && `✉️ ${card.email}`,
    card.website && `🌐 ${card.website}`
  ].filter(Boolean);

  return (
    <div className="mt-6 mx-auto max-h-80 w-80 border rounded-3xl bg-white shadow-lg flex flex-col justify-between overflow-hidden
                    transform scale-95 animate-fadeIn hover:scale-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500">

      {/* Top Section: Header */}
      <div className="p-5 space-y-3">
        <div className="flex items-center space-x-4">
          {card.profileUrl && (
            <img
              src={card.profileUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover p-[1px] border-2 border-[#2a0062] transition-transform duration-300 hover:scale-110"
            />
          )}
          <div className="flex-1 overflow-hidden">
            <p className="text-xl font-bold text-gray-800 truncate">{card.name}</p>
            {card.title && <p className="text-sm text-gray-500 truncate">{card.title}</p>}
            {card.company && <p className="text-sm text-gray-400 truncate">{card.company}</p>}
            {card.accreditations && <p className="text-xs text-indigo-600 truncate">{card.accreditations}</p>}
          </div>
        </div>
      </div>

      {/* Middle Section: Contact Info + QR */}
      {contactInfo.length > 0 && (
        <div className="px-5 flex justify-between items-start mt-2">
          {/* Contact Info */}
          <div className="text-sm text-gray-600 space-y-1">
            {contactInfo.map((info, i) => (
              <p key={i}>{info}</p>
            ))}
          </div>

          {/* QR Code */}
          {card.qrCodePath && (
            <img
              src={card.qrCodePath}
              alt="QR Code"
              className="w-24 h-24 border rounded-md shadow-sm transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>
      )}

      {/* Bottom Section: Edit Button */}
      <div className="p-5">
        <button
          onClick={() => router.push(`/visiting-card/vc/create?uniqueCode=${card.uniqueCode}`)}
          className="w-full flex justify-center items-center gap-2 px-5 py-2 bg-[#2a0062] text-white rounded-2xl shadow-md hover:bg-[#201133] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Start Editing Visiting Card
        </button>
      </div>
    </div>
  );
};

export default VisitingCardPreview;
