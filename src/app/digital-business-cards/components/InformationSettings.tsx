"use client";

import { User, Briefcase, Building2, Award, FileText } from "lucide-react";

type CardInfo = {
  name: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  title: string;
  company: string;
  about: string;
  pronoun: string;
  accreditations: string;
};

type InformationSettingsProps = {
  cardInfo: CardInfo;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
};

export default function InformationSettings({ cardInfo, setCardInfo }: InformationSettingsProps) {
  const bioTemplate = "My name is [Your name], and I'm passionate about [Interest], [Interest] and [Interest]. I'm currently working as a [Your current job title] where I practise [Relevant skill] and [Relevant skill] every day.";

  const inputClasses =
    "w-full pl-10 pr-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#032544] focus:outline-none transition";

  const handleChange = (key: keyof CardInfo, value: string) => {
    setCardInfo({ ...cardInfo, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl space-y-3 w-full">
        <div className="grid grid-cols-2 gap-2">
        {/* Name */}
        <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
            type="text"
            value={cardInfo.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Name"
            className={inputClasses}
            />
        </div>

        {/* Pronoun */}
        <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">⚪</span>
            <input
            type="text"
            value={cardInfo.pronoun}
            onChange={(e) => handleChange("pronoun", e.target.value)}
            placeholder="Pronoun (Optional)"
            className={inputClasses}
            />
        </div>
      </div>
      {/* Job & Company */}
      <div className="grid grid-cols-2 gap-2">
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={cardInfo.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Job Title"
            className={inputClasses}
          />
        </div>

        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={cardInfo.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Company"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Accreditations */}
      <div className="relative">
        <Award className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          value={cardInfo.accreditations}
          onChange={(e) => handleChange("accreditations", e.target.value)}
          placeholder="Accreditations (e.g. MBA, PMP)"
          className={inputClasses}
        />
      </div>

      {/* Bio Headline */}
      <div className="relative">
        <FileText className="absolute left-3 top-2 text-gray-400" size={16} />
        <textarea
          rows={3}
          value={cardInfo.about}
          onChange={(e) => handleChange("about", e.target.value)}
          placeholder="Bio Headline"
          className="w-full pl-10 pr-2 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#032544] focus:outline-none transition resize-none"
        />
        <button
          type="button"
          onClick={() => handleChange("about", bioTemplate)}
          className="mt-1 text-xs px-2 py-1 rounded-lg border bg-gray-100 hover:bg-gray-200 transition"
        >
          ⚡ Update Bio
        </button>
      </div>
    </div>
  );
}