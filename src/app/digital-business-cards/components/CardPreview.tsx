"use client";

import { useState } from "react";
import { Phone, Mail, Globe, MapPin, UserPlus, User } from "lucide-react";
import ContactItem from "./ContactItem";
import { fieldIcons } from "./fieldIcons";

type FieldValue = {
  label: string;
  sublabel?: string; // Optional sublabel for custom fields
  value: string;
};

type CardPreviewProps = {
  name: string;
  title: string;
  company: string;
  about: string;
  pronoun?: string;
  accreditations?: string;
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  imageUrl?: string;
  onEdit?: (type: string) => void;
  onDelete?: (type: string) => void;
  primaryColor?: string;
  secondaryColor?: string;
  theme?: string | null;

  // Dynamic fields
  activeFields?: string[];
  fieldData?: Record<string, FieldValue>;              // ✅ FIXED
  fieldIcons?: Record<string, React.ReactNode>;
};

function TruncatedText({ text, limit = 100 }: { text: string; limit?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > limit;
  const displayedText = isExpanded || !isLong ? text : text.slice(0, limit) + "...";

  return (
    <p className="mt-2 text-sm text-gray-700 leading-relaxed">
      {displayedText}
      {isLong && !isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="ml-1 text-blue-800 text-sm"
        >
          more
        </button>
      )}
      {isExpanded && (
        <button
          onClick={() => setIsExpanded(false)}
          className="ml-1 text-blue-800 text-sm"
        >
          less
        </button>
      )}
    </p>
  );
}


export default function CardPreview({
  name,
  title,
  company,
  about,
  pronoun,
  accreditations,
  phone = "+91 1234567890",
  email = "email@example.com",
  address = "123 Main Street, Anytown, USA",
  website = "https://example.com",
  imageUrl,
  onEdit,
  onDelete,
  primaryColor = "#021B35",
  secondaryColor = "#032544",
  theme,
  activeFields = [],
  fieldData = {},
}: CardPreviewProps) {
  const [activeTab, setActiveTab] = useState<"email" | "phone" | "address" | "website">("email");

  const tabs = [
    { key: "email", icon: <Mail className="w-5 h-5" /> },
    { key: "phone", icon: <Phone className="w-5 h-5" /> },
    { key: "address", icon: <MapPin className="w-5 h-5" /> },
    { key: "website", icon: <Globe className="w-5 h-5" /> },
  ];

  const getActiveItems = () => {
    const itemsMap: Record<string, any[]> = {
      email: [
        { key: "email", icon: <Mail className="w-5 h-5 text-white" />, label: email, sublabel: "My personal email" },
      ],
      phone: [
        { key: "phone", icon: <Phone className="w-5 h-5 text-white" />, label: phone, sublabel: "Give me a call!" },
      ],
      address: [
        { key: "address", icon: <MapPin className="w-5 h-5 text-white" />, label: address, sublabel: "My address" },
      ],
      website: [
        { key: "website", icon: <Globe className="w-5 h-5 text-white" />, label: website, sublabel: "My website" },
      ],
    };

    return itemsMap[activeTab].map((item, index) => ({
      ...item,
      onEdit: () => onEdit?.(item.key),
      onDelete: () => onDelete?.(item.key),
      delay: `${index * 100}ms`,
    }));
  };

  return (
    <div className="w-full h-full bg-white shadow-md rounded-2xl overflow-hidden flex flex-col">
      {/* Header */}
      <div
        className="relative h-40 flex items-start px-4"
        style={{
          background: theme || `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
        }}
      >
        <h1 className="text-white font-bold text-xl mt-3">
          stylus<span className="text-sky-400">QR</span>
        </h1>

        <svg className="absolute bottom-0 left-0 w-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 60" preserveAspectRatio="none">
          <path d="M0,20 C150,80 350,-40 500,20 L500,60 L0,60 Z" className="fill-white" />
        </svg>

        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
          <img
            src={imageUrl || "/dbc/profile/profile.jpg"}
            alt={name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="px-6 pt-6 text-center flex-1 flex flex-col">
        <div>
          <span className="text-xl font-semibold text-gray-900">{name}</span>
          <span className="text-gray-500 text-sm italic">{pronoun && `(${pronoun})`}</span>
        </div>
        <p className="text-sm text-gray-500">{accreditations}</p>
        <p className="text-gray-600">{title} @ {company}</p>
        <TruncatedText text={about} limit={150} />

        {/* Tabs */}
        <div className="p-2 flex justify-around border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`p-2 rounded-full transition ${
                activeTab === tab.key
                  ? "bg-sky-100 text-sky-500"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
            </button>
          ))}
        </div>

        {/* Default Tab Items */}
        <div className="space-y-4 text-left">
          {getActiveItems().map((item) => {
            const { key, ...rest } = item;
            return (
              <div key={key} style={{ transitionDelay: item.delay }}>
                <ContactItem {...rest} animate />
              </div>
            );
          })}
        </div>

        {/* Dynamic Fields */}
        {activeFields.length > 0 && (
          <div className="text-left">
            {activeFields.map((fieldKey) => (
              <ContactItem
                key={fieldKey}
                icon={fieldIcons?.[fieldKey] || <User className="w-5 h-5 text-white" />}
                label={fieldData[fieldKey]?.label || fieldKey}
                sublabel={fieldData[fieldKey]?.sublabel || ""}
                value={fieldData[fieldKey]?.value || "Not filled"}
                onEdit={() => onEdit?.(fieldKey)}
                onDelete={() => onDelete?.(fieldKey)}
                animate={true}
              />
            ))}
          </div>
        )}

        
      </div>
      {/* Bottom Button */}
      <div className="p-4 border-gray-200 flex items-center justify-center">
      <button className="mt-auto w-full py-2 bg-[#021B35] text-white text-sm font-medium rounded-xl shadow hover:bg-[#032544] transition flex items-center justify-center space-x-2">
          <UserPlus className="w-5 h-5 text-white" />
          <span>Add to Contacts</span>
        </button>
      </div>
    </div>
  );
}
