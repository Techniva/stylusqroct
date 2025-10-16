"use client";

import { Phone, MapPin, UserPlus, User } from "lucide-react";
import { fieldIcons as allFieldIcons } from "@/app/digital-business-cards/components/fieldIcons";

type FieldValue = {
  label: string;
  sublabel?: string;
  value: string;
};

type CardTemplateElegantProps = {
  name?: string;
  title?: string;
  company?: string;
  pronoun?: string;
  about?: string;
  phone?: string;
  address?: string;
  accreditations?: string;
  email?: string;
  profileUrl?: string;
  website?: string;
  primaryColor?: string;
  secondaryColor?: string;

  // Dynamic fields
  activeFields?: string[];
  fieldData?: Record<string, FieldValue>;
  onEdit?: (fieldKey: string) => void;
  onDelete?: (fieldKey: string) => void;
};

export default function CardTemplateElegant({
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
}: CardTemplateElegantProps) {

  const defaultLinks = [
    { key: "phone", label: "Contact", icon: <Phone className="w-5 h-5 text-gray-700" />, value: phone },
    { key: "address", label: "Location", icon: <MapPin className="w-5 h-5 text-gray-700" />, value: address },
    { key: "email", label: "Email", icon: <User className="w-5 h-5 text-gray-700" />, value: email },
  ];

  return (
    <div className="w-full md:max-w-sm lg:w-[22rem] bg-white shadow-lg rounded-xl overflow-hidden flex flex-col">
      {/* Profile Section */}
      <div
        className="relative flex flex-col items-center text-center p-4"
        style={{ background: `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor})` }}
      >
        <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md">
          <img src={profileUrl} alt={name} className="w-full h-full object-cover rounded-full" />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <h1 className="text-xl font-bold text-white">{name}</h1>
          {pronoun && <p className="text-xs italic text-white">({pronoun})</p>}
        </div>
        <p className="text-sm text-gray-200">{title} | {accreditations}</p>
        <p className="mt-3 text-xs text-gray-100 leading-relaxed max-w-xs">{about}</p>
      </div>

      {/* Default Links */}
      <div className="flex flex-col p-4 space-y-3 bg-gray-50">
        {defaultLinks.map((link) => (
          <div
            key={link.key}
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              {link.icon}
              <span className="text-sm font-medium text-gray-800">{link.label}</span>
            </div>
            <span className="text-gray-700 text-sm">{link.value}</span>
          </div>
        ))}

        {/* Dynamic Fields */}
          <div className="w-full space-y-2">
            {activeFields.length > 0 &&
              activeFields.map((key, index) => {
                const field = fieldData[key];
                const value = field?.value || "Not filled";
                const sublabel = field?.sublabel || value;
                const getFieldLink = (key: string, value: string) => {
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
                    return `tel:${value}`;
                  }
                
                  if (lowerKey.includes("email")) {
                    return `mailto:${value}`;
                  }
                
                  if (socialFields.some((f) => lowerKey.includes(f))) {
                    if (lowerKey.includes("whatsapp")) {
                      const cleaned = value.replace(/\D/g, "");
                      return `https://wa.me/${cleaned}`;
                    }
                
                    const socialBase: Record<string, string> = {
                      facebook: "https://www.facebook.com/",
                      twitter: "https://twitter.com/",
                      instagram: "https://www.instagram.com/",
                      linkedin: "https://www.linkedin.com/in/",
                      youtube: "https://www.youtube.com/",
                      github: "https://github.com/",
                      portfolio: "",
                      website: "",
                    };
                
                    const matchedBase = Object.entries(socialBase).find(([k]) =>
                      lowerKey.includes(k)
                    )?.[1];
                
                    let normalized = value.trim();
                
                    // If value starts with www., prepend https://
                    if (normalized.startsWith("www.")) {
                      normalized = `https://${normalized}`;
                    }
                
                    // If value already starts with http(s), return directly
                    if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
                      return normalized;
                    }
                
                    // Otherwise append to the matched base
                    return matchedBase ? `${matchedBase}${normalized}` : `https://${normalized}`;
                  }
                
                  return null;
                };
                
                const link = getFieldLink(key, value);

                return (
                  <div
                    key={`${key}-${index}`} // ensure uniqueness
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-gray-100 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                    {allFieldIcons[key.toLowerCase()] || <User className="w-5 h-5 text-gray-500" />}
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
                          <span className="text-sm text-gray-700">{value}</span>
                        )}
                        {sublabel && !link && (
                          <span className="text-xs text-gray-500">{sublabel}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {onEdit && (
                        <button
                          className="text-xs text-blue-500"
                          onClick={() => onEdit(key)}
                        >
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="text-xs text-red-500"
                          onClick={() => onDelete(key)}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
      </div>

      {/* Footer */}
      <button className="w-full py-4 bg-[#3B82F6] text-white text-sm font-medium rounded-b shadow hover:bg-[#1E3A8A] transition flex items-center justify-center space-x-2"
      style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
      >
        <UserPlus className="w-5 h-5 text-white" />
        <span>Add to Contacts</span>
      </button>
    </div>
  );
}
