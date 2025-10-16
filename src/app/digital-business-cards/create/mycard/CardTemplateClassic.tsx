"use client";

import { useState } from "react";
import { Phone, Mail, Globe, MapPin, UserPlus, User } from "lucide-react";
import { fieldIcons as allFieldIcons } from "@/app/digital-business-cards/components/fieldIcons";

type FieldValue = {
  label: string;
  sublabel?: string;
  value: string;
};

export type CardTemplateClassicProps = {
  name?: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  pronoun?: string;
  about?: string;
  accreditations?: string;
  profileUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;

  // Dynamic fields
  activeFields?: string[];
  fieldData?: Record<string, FieldValue>;
  onEdit?: (fieldKey: string) => void;
  onDelete?: (fieldKey: string) => void;
};

export default function CardTemplateClassic({
  name = "Nikhil Avishek",
  title = "CEO | Managing Director",
  company = "Techniva",
  email = "john.doe@example.com",
  phone = "+91 xxx xxx xxx",
  address = "Bangalore, India",
  website = "www.techniva.com",
  pronoun = "Nikhil",
  about = "My name is [Your Name], a [Your Job Title] passionate about [Interest], [Interest], and [Interest]. I specialize in [Skill] and [Skill], and I enjoy leveraging my expertise to build meaningful solutions.",
  accreditations = "IIT Madras",
  profileUrl = "/dbc/profile/profile.jpg",
  primaryColor = "#1E3A8A",
  secondaryColor = "#3B82F6",
  activeFields = [],
  fieldData = {},
  onEdit,
  onDelete,
}: CardTemplateClassicProps) {
  const [activeTab, setActiveTab] = useState<"email" | "phone" | "address" | "website">("email");

  const tabs = [
    { key: "email", icon: <Mail className="w-4 h-4" />, label: email },
    { key: "phone", icon: <Phone className="w-4 h-4" />, label: phone },
    { key: "address", icon: <MapPin className="w-4 h-4" />, label: address },
    { key: "website", icon: <Globe className="w-4 h-4" />, label: website },
  ];

  const handleAddToContacts = async () => {
    // Fetch image and convert to Base64
    const response = await fetch(profileUrl);
    const blob = await response.blob();
    const reader = new FileReader();
  
    reader.onloadend = () => {
      const base64data = reader.result?.toString().split(",")[1]; // strip "data:image/jpeg;base64,"
  
      const vcardData = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `FN:${name}`,                          // Full name
        `TEL;TYPE=CELL,VOICE:${phone}`,        // Mobile number
        `EMAIL;TYPE=INTERNET,WORK:${email}`,   // Work email
        `PHOTO;ENCODING=b;TYPE=JPEG:${base64data}`, // Profile image (JPEG)
        "END:VCARD"
      ].join("\r\n");
  
      const fileBlob = new Blob([vcardData], { type: "text/vcard;charset=utf-8" });
      const url = URL.createObjectURL(fileBlob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = `${name.replace(/\s+/g, "_")}.vcf`;
      a.click();
  
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    };
  
    reader.readAsDataURL(blob); // Convert image to base64
  };
  

  return (
    <div className="w-full md:max-w-sm lg:w-[22rem] bg-white shadow-lg rounded-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div
        className="relative h-[155px] flex items-start justify-center"
        style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
      >
        <h1 className="absolute top-3 left-3 text-white font-bold text-xl">
          stylus<span className="text-sky-400">QR</span>
        </h1>

        <svg className="absolute bottom-0 left-0 w-full h-16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 60" preserveAspectRatio="none">
          <path d="M0,30 C150,0 350,60 500,30 L500,60 L0,60 Z" className="fill-white" />
        </svg>

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
          <img
            src={profileUrl}
            alt={name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>

      {/* Body */}
      <div className="mt-6 px-4 text-center flex-1 flex flex-col items-center">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-gray-900">{name}</h1>
          {pronoun && <p className="text-xs italic text-gray-500">({pronoun})</p>}
        </div>

        <p className="text-gray-600 text-sm">{title} @ {company}</p>
        <p className="text-sm text-gray-500">{accreditations}</p>
        <p className="my-2 text-sm text-gray-700">{about}</p>

        {/* Tabs */}
        <div className="py-2 flex justify-around space-x-6 border-b border-gray-200 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`p-3 rounded-full transition ${
                activeTab === tab.key
                  ? "bg-sky-100 text-sky-500"
                  : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab.icon}
            </button>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="my-4 py-1 w-full text-left text-sm">
          {tabs
            .filter((tab) => tab.key === activeTab)
            .map((tab) => (
              <div key={tab.key} className="flex items-center gap-3 text-gray-700">
                {tab.icon}
                <span>{tab.label}</span>
              </div>
            ))}
        </div>

        {/* Dynamic Fields */}
        {activeFields.length > 0 && (
          <div className="w-full text-left space-y-2">
          {activeFields.map((key) => {
            const field = fieldData[key];
            const value = field?.value || "Not filled";
            const sublabel = field?.sublabel || value;
        
            let link: string | null = null;
            const lowerKey = key.toLowerCase();
        
            const socialFields = [
              "facebook",
              "twitter",
              "instagram",
              "linkedin",
              "youtube",
              "website",
              "github",
              "portfolio",
              "whatsapp",
            ];
        
            if (lowerKey.includes("phone") || lowerKey.includes("mobile")) {
              link = `tel:${value}`;
            } else if (lowerKey.includes("email")) {
              link = `mailto:${value}`;
            } else if (socialFields.some((f) => lowerKey.includes(f))) {
              if (lowerKey.includes("whatsapp")) {
                const cleaned = value.replace(/\D/g, "");
                link = `https://wa.me/${cleaned}`;
              } else {
                // Other social links
                if (value.startsWith("http://") || value.startsWith("https://")) {
                  link = value;
                } else {
                  const socialBase: Record<string, string> = {
                    facebook: "https://www.facebook.com/",
                    twitter: "https://twitter.com/",
                    instagram: "https://www.instagram.com/",
                    linkedin: "https://www.linkedin.com/in/",
                    youtube: "https://www.youtube.com/",
                    github: "https://github.com/",
                    portfolio: "",
                  };
        
                  const matchedBase = Object.entries(socialBase).find(([k]) =>
                    lowerKey.includes(k)
                  )?.[1];
        
                  // Only prepend if value is not a full URL
                  if (matchedBase && !value.includes(matchedBase.replace("https://", ""))) {
                    link = `${matchedBase}${value}`;
                  } else {
                    link = value.startsWith("http") ? value : `https://${value}`;
                  }
                }
              }
            }
        
            return (
              <div key={key} className="flex items-center justify-between gap-3 text-gray-700 pb-4">
                <div className="flex items-center gap-2">
                {allFieldIcons[lowerKey] || <User className="w-4 h-4 text-gray-500" />}
                  <div className="flex flex-col">
                    {link ? (
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {sublabel}
                      </a>
                    ) : (
                      <span className="text-sm">{value}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {onEdit && <button className="text-xs text-blue-500" onClick={() => onEdit(key)}>Edit</button>}
                  {onDelete && <button className="text-xs text-red-500" onClick={() => onDelete(key)}>Delete</button>}
                </div>
              </div>
            );
          })}
        </div>
        
        
        )}
      </div>

      {/* Footer Button */}
        <button
          className="w-full py-4 bg-[#021B35] text-white text-sm font-medium rounded-b shadow hover:bg-[#032544] transition flex items-center justify-center space-x-2"
          style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
          onClick={handleAddToContacts}
        >
          <UserPlus className="w-5 h-5 text-white" />
          <span>Add to Contacts</span>
        </button>

    </div>
  );
}
