"use client";

import { useState } from "react";
import React from "react";
import { fieldIcons } from "./fieldIcons"; // ✅ central import
import { Edit2, Trash2 } from "lucide-react";

type FieldItem = {
  key: string;
  label: string;
};

type FieldValue = {
  label: string;
  value: string;
  sublabel?: string; // Optional sublabel for custom fields
};

type FieldsSettingsProps = {
  activeFields: string[];
  setActiveFields: React.Dispatch<React.SetStateAction<string[]>>;
  fieldData: Record<string, FieldValue>;
  setFieldData: React.Dispatch<
    React.SetStateAction<Record<string, FieldValue>>
  >;
};

export default function FieldsSettings({
  activeFields,
  setActiveFields,
  fieldData,
  setFieldData,
}: FieldsSettingsProps) {
  const [popupField, setPopupField] = useState<FieldItem | null>(null);
  const [inputLabel, setInputLabel] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [inputSublabel, setInputSublabel] = useState("");


  const categories: { title: string; fields: FieldItem[] }[] = [
    {
      title: "General",
      fields: [
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone Number" },
        { key: "location", label: "Location" },
        { key: "weblink", label: "Web Link" },
      ],
    },
    {
      title: "Social",
      fields: [
        { key: "x", label: "X" },
        { key: "instagram", label: "Instagram" },
        { key: "facebook", label: "Facebook" },
        { key: "tiktok", label: "TikTok" },
        { key: "youtube", label: "YouTube" },
        { key: "linkedin", label: "LinkedIn" },
        { key: "pinterest", label: "Pinterest" },
      ],
    },
    {
      title: "Messaging",
      fields: [
        { key: "whatsapp", label: "WhatsApp" },
        { key: "skype", label: "Skype" },
        { key: "enquiry", label: "Enquiry Form" },
        { key: "callback", label: "Callback Requests" },
      ],
    },
    {
      title: "Business",
      fields: [
        { key: "calendly", label: "Calendly" },
        { key: "github", label: "Github" },
        { key: "products", label: "Products & Services" },
        { key: "gallery", label: "Media Gallery" },
      ],
    },
    {
      title: "Payments",
      fields: [
        { key: "venmo", label: "Venmo" },
        { key: "paypal", label: "PayPal" },
        { key: "upi", label: "UPI" },
        { key: "bank", label: "Bank" },
      ],
    },
  ];

  const handleSave = () => {
    if (!popupField) return;
    setFieldData({
      ...fieldData,
      [popupField.key]: {
        label: inputLabel,
        value: inputValue,
        sublabel: inputSublabel, // ✅ save sublabel
      },
    });
    if (!activeFields.includes(popupField.key)) {
      setActiveFields([...activeFields, popupField.key]);
    }
    setPopupField(null);
    setInputLabel("");
    setInputValue("");
    setInputSublabel(""); // reset sublabel
  };

  return (
    <div className="space-y-6">
      {/* Field Categories */}
      {categories.map((cat) => (
        <div key={cat.title}>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            {cat.title}
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
            {cat.fields.map((field) => (
              <button
                key={field.key}
                onClick={() => {
                  setPopupField(field);
                  setInputLabel(fieldData[field.key]?.label || "");
                  setInputValue(fieldData[field.key]?.value || "");
                }}
                className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl border transition ${
                  activeFields.includes(field.key)
                    ? "bg-[#032544] text-white border-[#021B35]"
                    : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                }`}
              >
                <div className="text-lg">{fieldIcons[field.key]}</div>
                <span className="text-xs">{field.label}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Active Fields Display */}
      {activeFields.length > 0 && (
        <div className="mt-6 space-y-2">
          {activeFields.map((key) => (
            <div
              key={key}
              className="flex items-center gap-4 bg-gray-100 p-2 rounded"
            >
              {fieldIcons[key]}
              <div className="flex-1">
                <span className="font-medium">{fieldData[key]?.label}:</span>{" "}
                <span>{fieldData[key]?.value}</span>
              </div>

              {/* Edit Icon Button */}
              <button
                onClick={() => {
                  const fieldItem = { key, label: key };
                  setPopupField(fieldItem);
                  setInputLabel(fieldData[key]?.label || "");
                  setInputValue(fieldData[key]?.value || "");
                  setInputSublabel(fieldData[key]?.sublabel || "");
                }}
                className="text-blue-500 hover:text-blue-700"
                aria-label="Edit Field"
              >
                <Edit2 size={18} />
              </button>

              {/* Delete Icon Button */}
              <button
                onClick={() => {
                  const updatedFields = activeFields.filter((f) => f !== key);
                  const updatedData = { ...fieldData };
                  delete updatedData[key];
                  setActiveFields(updatedFields);
                  setFieldData(updatedData);
                }}
                className="text-red-500 hover:text-red-700"
                aria-label="Delete Field"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Popup Modal */}
      {popupField && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{popupField.label}</h2>
              <button
                onClick={() => setPopupField(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-4">
             {/* Sublabel Input */}
                <input
                  type="text"
                  placeholder={`Sublabel (e.g. Personal, Business, etc.)`}
                  value={inputSublabel}
                  onChange={(e) => setInputSublabel(e.target.value)}
                  className="border p-2 rounded w-full"
                />
              {/* Value Input */}
              <input
                type="text"
                placeholder={`Enter ${popupField.label}`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <button
                onClick={handleSave}
                className="bg-sky-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
