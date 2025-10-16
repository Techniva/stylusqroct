"use client";

import { Phone, Mail, Globe, User, UserPlus } from "lucide-react";
import { fieldIcons as allFieldIcons } from "@/app/digital-business-cards/components/fieldIcons";

type FieldValue = {
  label: string;
  sublabel?: string;
  value: string;
};

type CardTemplateModernProps = {
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

export default function CardTemplateModern({
  name = "Nikhil Avishek",
  title = "CEO | Managing Director",
  company = "Techniva",
  email = "john.doe@example.com",
  phone = "+91 xxx xxx xxx",
  website = "www.techniva.com",
  pronoun = "(Nikhil)",
  about = "My name is [Your Name], a [Your Job Title] passionate about [Interest], [Interest], and [Interest]. I specialize in [Skill] and [Skill], and I enjoy leveraging my expertise to build meaningful solutions.",
  accreditations = "IIT Madras",
  profileUrl = "/dbc/profile/profile.jpg",
  primaryColor,
  secondaryColor,
  activeFields = [],
  fieldData = {},
  onEdit,
  onDelete,
}: CardTemplateModernProps) {
  const defaultContacts = [
    { key: "phone", icon: <Phone size={18} className="text-[#47627a]" />, value: phone, subLabel: "Work" },
    { key: "email", icon: <Mail size={18} className="text-[#47627a]" />, value: email, subLabel: "Work" },
    { key: "website", icon: <Globe size={18} className="text-[#47627a]" />, value: website, subLabel: "Company" },
  ];

  return (
    <div className="w-full md:max-w-sm lg:w-[22rem] bg-white shadow-lg rounded-xl overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-[#021B35] text-white p-6 relative"
      style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
      >
        <div className="flex items-baseline gap-2">
            <h1 className="text-xl font-bold text-white">{name}</h1>
            {pronoun && (
                <p className="text-xs italic text-gray-300">({pronoun})</p>
            )}
        </div>
        <p className="mt-2 text-sm font-medium">{accreditations}</p>
        <p className="mt-2 text-sm font-medium">{title}</p>
        <p className="text-sm mt-1 opacity-90">{company}</p>

        {/* Profile Image */}
        <div className="absolute right-6 -bottom-10 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img src={profileUrl} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* About */}
      {about && (
        <div className="px-4 pt-12 pb-3">
          <p className="text-sm text-gray-700 text-center leading-relaxed">{about}</p>
        </div>
      )}

      {/* Default Contact Info */}
      <div className="px-4 pb-4 space-y-3">
        {defaultContacts.map((contact) => (
          <ContactItem
            key={contact.key}
            icon={contact.icon}
            label={contact.value}
            subLabel={contact.subLabel}
          />
        ))}

        {/* Dynamic Fields */}
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
                  key={`${key}-${index}`}
                  className="flex justify-between items-center py-2 bg-gray-100 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                  {allFieldIcons[key.toLowerCase()] || <User className="w-5 h-5 text-gray-500" />}
                    <div className="flex flex-col text-sm">
                      {link ? (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-blue-500 hover:underline"
                        >
                          {sublabel}
                        </a>
                      ) : (
                        <span className="text-gray-600">{value}</span>
                      )}
                      {!link && sublabel && (
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

      {/* Footer */}
      <button className="w-full py-4 bg-[#021B35] text-white text-sm font-medium rounded-b-xl shadow-md hover:bg-[#032544] transition flex items-center justify-center gap-2"
      style={{ background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})` }}
      >
        <UserPlus className="w-5 h-5" />
        <span>Add to Contacts</span>
      </button>
    </div>
  );
}

// Reusable Contact Item Component
function ContactItem({
  icon,
  label,
  subLabel,
}: {
  icon: React.ReactNode;
  label: string;
  subLabel?: string;
}) {
  return (
    <div className="flex items-center gap-3 text-gray-700 text-sm">
      {icon}
      <div className="flex flex-col">
        <span>{label}</span>
        {subLabel && <span className="text-xs text-gray-400">{subLabel}</span>}
      </div>
    </div>
  );
}
