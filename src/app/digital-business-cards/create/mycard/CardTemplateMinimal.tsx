"use client";

import { UserPlus, Phone, Mail, Globe, User } from "lucide-react";
import { fieldIcons as allFieldIcons } from "@/app/digital-business-cards/components/fieldIcons";

type FieldValue = {
  label: string;
  sublabel?: string;
  value: string;
};

type CardTemplateMinimalProps = {
  name?: string;
  title?: string;
  company?: string;
  pronoun?: string;
  about?: string;
  phone?: string;
  address?: string;
  accreditations?: string;
  email?: string;
  website?: string;
  profileUrl?: string;

  // Dynamic fields
  activeFields?: string[];
  fieldData?: Record<string, FieldValue>;
  onEdit?: (fieldKey: string) => void;
  onDelete?: (fieldKey: string) => void;
};

export default function CardTemplateMinimal({
  name = "Nikhil Avishek",
  title = "CEO | Managing Director",
  company = "Techniva",
  email = "john.doe@example.com",
  phone = "+91 xxx xxx xxx",
  website = "www.techniva.com",
  pronoun = "Nikhil",
  about = "My name is [Your Name], a [Your Job Title] passionate about [Interest], [Interest], and [Interest]. I specialize in [Skill] and [Skill], and I enjoy leveraging my expertise to build meaningful solutions.",
  accreditations = "",
  profileUrl = "/dbc/profile/profile.jpg",
  activeFields = [],
  fieldData = {},
  onEdit,
  onDelete,
}: CardTemplateMinimalProps) {
  const defaultContacts = [
    { key: "phone", icon: <Phone size={20} />, value: phone },
    { key: "email", icon: <Mail size={20} />, value: email },
    { key: "website", icon: <Globe size={20} />, value: website },
  ];

  return (
    <div className="w-full md:max-w-sm lg:w-[22rem] bg-gradient-to-b from-gray-800 to-gray-900 text-white rounded-xl shadow-xl overflow-hidden flex flex-col">
      
      {/* Top Section */}
      <div className="w-full h-[135px] relative">
        <img
          src={profileUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        {/* Profile Image */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
          <img src={profileUrl} alt={name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Name & Title */}
      <div className="mt-12 px-4 text-center">
        <div className="flex justify-center items-baseline gap-2">
          <h1 className="text-xl font-bold text-white">{name}</h1>
          {pronoun && (
            <p className="text-xs italic text-gray-300">({pronoun})</p>
          )}
        </div>
        <p className="text-sm opacity-90 mt-1">{accreditations} {title} | {company}</p>
      </div>

      {/* About */}
      {about && (
        <div className="px-4 py-2">
          <p className="text-xs text-gray-200 text-center leading-relaxed">{about}</p>
        </div>
      )}

      {/* Default Contact Info */}
      <div className="px-4 pb-2 space-y-1">
        {defaultContacts.map((contact) => (
          <ContactItem key={contact.key} icon={contact.icon} label={contact.value} />
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
                  className="flex justify-between items-center py-3 bg-gray-900 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                  {allFieldIcons[key.toLowerCase()] || <User className="w-5 h-5 text-gray-500" />}
                    <div className="flex flex-col text-sm">
                      {link ? (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-blue-400 hover:underline"
                        >
                          {sublabel}
                        </a>
                      ) : (
                        <span className="text-gray-300">{value}</span>
                      )}
                      {!link && sublabel && (
                        <span className="text-xs text-gray-400">{sublabel}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        className="text-xs text-blue-400"
                        onClick={() => onEdit(key)}
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="text-xs text-red-400"
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
      <button className="w-full py-4 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-b-xl shadow-md transition flex items-center justify-center gap-2">
        <UserPlus className="w-5 h-5" />
        <span>Add to Contacts</span>
      </button>
    </div>
  );
}

// Reusable Contact Item Component
function ContactItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center py-3 gap-2 text-sm text-gray-200">
      {icon}
      <span>{label}</span>
    </div>
  );
}
