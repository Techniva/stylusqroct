"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, LayoutDashboard, Share2, Save, ToggleLeft, ToggleRight, X, } from "lucide-react";
import { useRouter } from "next/navigation";
import DisplaySettings from "../components/DisplaySettings";
import InformationSettings from "../components/InformationSettings";
import FieldsSettings from "../components/FieldsSettings";
import ShareModal from "../components/ShareModal";
import CardTemplateModal from "./mycard/CardTemplateModal";
import CardTemplateClassic from "./mycard/CardTemplateClassic";
import CardTemplateModern from "./mycard/CardTemplateModern";
import CardTemplateMinimal from "./mycard/CardTemplateMinimal";
import CardTemplateElegant from "./mycard/CardTemplateElegant";

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

type FieldValue = {
  label: string;
  value: string;
};

export default function CardView() {
  const router = useRouter();

  // Card state
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    name: "",
    phone: "",
    email: "",
    address: "",
    website: "",
    title: "",
    company: "",
    about:
      "My name is [Your name], and I'm passionate about [Interest], [Interest] and [Interest]. I'm currently working as a [Your current job title] where I practise [Relevant skill] and [Relevant skill] every day.",
    pronoun: "",
    accreditations: "",
  });

  const [fieldData, setFieldData] = useState<Record<string, FieldValue>>({});
  const [activeFields, setActiveFields] = useState<string[]>([]);
  const [accordion, setAccordion] = useState<string | null>(null);

  const [uniqueCode, setUniqueCode] = useState<string | null>(null);
  const [isPageLoading, setIsPageLoading] = useState(true); // initial fetch
  const [isActionLoading, setIsActionLoading] = useState(false); // save/publish/etc
  const [actionMessage, setActionMessage] = useState(""); // message for actions


  // URL / share state
  const [url, setUrl] = useState("");
  const [qrCodePath, setQrCodePath] = useState<string>("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Template / display state
  const [isCardTemplateModalOpen, setIsCardTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("classic");
  const [primaryColor, setPrimaryColor] = useState("#021B35");
  const [secondaryColor, setSecondaryColor] = useState("#FCC736");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  // Media
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // Publish state
  const [isPublished, setIsPublished] = useState(false);

  // Prefill from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/auth/user");
        if (!res.ok) {
          router.push("/");
          return;
        }
        const { user } = await res.json();
        const params = new URLSearchParams(window.location.search);
        const codeFromUrl = params.get("uniqueCode");
        if (!codeFromUrl) return;
  
        const dbcRes = await fetch(
          `/api/digital-business-cards?uniqueCode=${codeFromUrl}&userId=${user.id}`
        );
  
        if (dbcRes.ok) {
          const dbc = await dbcRes.json();
          setCardInfo({
            name: dbc.name || "",
            phone: dbc.phone || "",
            email: dbc.email || "",
            address: dbc.address || "",
            website: dbc.website || "",
            title: dbc.title || "",
            company: dbc.company || "",
            about: dbc.about || cardInfo.about,
            pronoun: dbc.pronoun || "",
            accreditations: dbc.accreditations || "",
          });
          setQrCodePath(dbc.qrCodePath || "");
          setIsPublished(dbc.published || false);
          setProfileUrl(dbc.profileUrl || "");
          setPrimaryColor(dbc.primaryColor || "#021B35");
          setSecondaryColor(dbc.secondaryColor || "#FCC736");
          setSelectedTheme(dbc.theme || null);
          setSelectedTemplate(dbc.template || "classic");
          setActiveFields(dbc.activeFields || []);
          setFieldData(dbc.fieldData || {});
          setUniqueCode(dbc.uniqueCode);
          setUrl(`${window.location.origin}/dbc/${dbc.uniqueCode}`);
        }
      } catch (err) {
        console.error("Init load failed:", err);
      } finally {
        setIsPageLoading(false); // only hide after initial load
      }
    };
    loadData();
  }, [router]);
  
  // Accordion toggle
  const toggleAccordion = (key: string) => {
    setAccordion(accordion === key ? null : key);
  };

  // Save card
  const handleSaveCard = async () => {
    if (!uniqueCode) return;
  
    setActionMessage("Updating card...");
    setIsActionLoading(true);
  
    try {
      const res = await fetch("/api/digital-business-cards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uniqueCode,
          ...cardInfo,
          profileUrl,
          primaryColor,
          secondaryColor,
          theme: selectedTheme,
          template: selectedTemplate,
          activeFields,
          fieldData,
          qrCodePath,
        }),
      });
  
      if (res.ok) setActionMessage("Card updated successfully!");
      else {
        const errData = await res.json();
        setActionMessage(errData.error || "Failed to update card.");
      }
    } catch (err) {
      console.error("Update error:", err);
      setActionMessage("Error updating card.");
    } finally {
      await new Promise((r) => setTimeout(r, 1000));
      setIsActionLoading(false);
    }
  };
  
  // Button actions
  const buttons = [
    {
      label: "Choose Template",
      gradient: "from-sky-400 to-blue-500",
      icon: <LayoutDashboard size={20} />,
      onClick: () => setIsCardTemplateModalOpen(true),
    },
    {
      label: "Share Card",
      gradient: "from-pink-500 to-red-500",
      icon: <Share2 size={20} />,
      onClick: () => setIsShareModalOpen(true),
    },
    {
      label: isPublished ? "Unpublish Card" : "Publish Card",
      gradient: isPublished
        ? "from-green-400 to-emerald-500"
        : "from-orange-400 to-red-500",
      icon: isPublished ? <ToggleLeft size={20} /> : <ToggleRight size={20} />,
      onClick: async () => {
        try {
          setActionMessage(
            isPublished ? "Unpublishing Card..." : "Publishing Card..."
          );
          setIsActionLoading(true);

          const res = await fetch("/api/digital-business-cards", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              uniqueCode,
              published: !isPublished,
            }),
          });

          if (!res.ok) throw new Error("Failed to update publish state");

          const updatedCard = await res.json();
          setIsPublished(updatedCard.published);
          setActionMessage(
            updatedCard.published ? "Card published!" : "Card unpublished."
          );
        } catch (err) {
          console.error("Publish toggle error:", err);
          setActionMessage("Error updating publish state.");
        } finally {
          await new Promise((r) => setTimeout(r, 1000));
          setIsActionLoading(false);
        }
      },
    },
    {
      label: "Save Card",
      gradient: "from-indigo-500 to-purple-500",
      icon: <Save size={20} />,
      onClick: handleSaveCard,
    },
    {
      label: "Close",
      gradient: "from-red-500 to-pink-600",
      icon: <X size={20} />,
      onClick: async () => {
        setActionMessage("Moving to dashboard...");
        setIsActionLoading(true);
        await new Promise((res) => setTimeout(res, 1000));
        router.push("/dashboard");
        setIsActionLoading(false);
      },
    },
  ];

  // Render template preview
  const renderTemplate = () => {
    const props = {
      ...cardInfo,
      primaryColor,
      secondaryColor,
      theme: selectedTheme,
      profileUrl: profileUrl || undefined,
      activeFields,
      fieldData,
    };

    switch (selectedTemplate) {
      case "classic":
        return <CardTemplateClassic {...props} />;
      case "modern":
        return <CardTemplateModern {...props} />;
      case "minimal":
        return <CardTemplateMinimal {...props} />;
      case "elegant":
        return <CardTemplateElegant {...props} />;
      default:
        return <CardTemplateClassic {...props} />;
    }
  };
  
  if (isPageLoading) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#063970] mb-3"></div>
        <span className="text-gray-700 font-medium">Loading Card...</span>
      </div>
    );
  }

  return (
    <>
      {/* Left Side */}
      <div className="flex-1 px-4 space-y-4 h-[calc(100vh-145px)] overflow-y-auto">
        <h2 className="text-xl font-bold bg-gradient-to-br from-[#021B35] via-[#032544] to-[#041E30] text-transparent bg-clip-text border-b pb-2">
          Card View
        </h2>

        {/* QR + Label + URL */}
        <div className="bg-white shadow rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="flex items-center gap-3">
            {qrCodePath ? (
              <img
                src={qrCodePath}
                alt="QR Code"
                className="w-24 h-24 object-contain border rounded-md shadow-sm"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center bg-gray-200 text-gray-500 rounded-md text-xs">
                No QR
              </div>
            )}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => qrCodePath && window.open(qrCodePath, "_blank")}
                className="text-xs px-3 py-1 bg-gray-600 text-white rounded-full hover:bg-blue-700"
                disabled={!qrCodePath}
              >
                Download
              </button>
              <button
                onClick={() => qrCodePath && window.open(qrCodePath, "_blank")}
                className="text-xs px-3 py-1 bg-gray-600 text-white rounded-full hover:bg-blue-700"
                disabled={!qrCodePath}
              >
                Share QR
              </button>
              <span className="text-sm font-semibold text-left px-3">Visit: </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-xs font-medium mb-1">
                Label this card
              </label>
              <input
                type="text"
                value={cardInfo.name}
                onChange={(e) =>
                  setCardInfo({ ...cardInfo, name: e.target.value })
                }
                className="w-full border rounded-md py-1 px-2 text-xs focus:ring-1 focus:ring-[#032544] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1">Card URL</label>
              <input
                type="text"
                value={url}
                readOnly
                className="w-full text-gray-700 text-xs bg-gray-100 py-1 px-2 rounded-md border cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {["Display", "Information", "Fields"].map((section) => (
            <div
              key={section}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
            >
              <button
                onClick={() => toggleAccordion(section)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-[#021B35] hover:bg-gray-50 transition"
              >
                <span>{section}</span>
                <motion.div
                  animate={{ rotate: accordion === section ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={18} />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: accordion === section ? "auto" : 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className={accordion === section ? "p-4" : "hidden"}>
                  {section === "Display" ? (
                    uniqueCode && (
                      <DisplaySettings
                        primaryColor={primaryColor}
                        setPrimaryColor={setPrimaryColor}
                        secondaryColor={secondaryColor}
                        setSecondaryColor={setSecondaryColor}
                        uniqueCode={uniqueCode}
                        profileUrl={profileUrl}
                        setProfileUrl={setProfileUrl}
                        coverUrl={coverUrl}
                        setCoverUrl={setCoverUrl}
                        logoUrl={logoUrl}
                        setLogoUrl={setLogoUrl}
                      />
                    )
                  ) : section === "Information" ? (
                    <InformationSettings
                      cardInfo={cardInfo}
                      setCardInfo={setCardInfo}
                    />
                  ) : section === "Fields" ? (
                    <FieldsSettings
                      activeFields={activeFields}
                      setActiveFields={setActiveFields}
                      fieldData={fieldData}
                      setFieldData={setFieldData}
                    />
                  ) : null}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="p-4 flex flex-wrap justify-center md:justify-between md:px-16 gap-4 bg-white rounded-xl shadow-md">
          {buttons.map((btn) => (
            <div key={btn.label} className="flex flex-col items-center">
              <button
                onClick={btn.onClick}
                className="relative rounded-full flex items-center justify-center text-white font-semibold
                  shadow-xl transition-all duration-300 transform hover:scale-105
                  hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                  focus:outline-none w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                title={btn.label}
              >
                <div
                  className={`absolute inset-0 rounded-full bg-gradient-to-br ${btn.gradient} transition-all duration-500`}
                ></div>
                <div className="relative z-10">{btn.icon}</div>
                <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-10 bg-white"></span>
              </button>
              <span className="mt-2 text-xs sm:text-xs md:text-sm font-medium text-gray-700 text-center">
                {btn.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Preview */}
      <div className="px-4 h-[calc(100vh-145px)] overflow-y-auto">
        {renderTemplate()}
      </div>

      {/* Loading Spinner */}
      {isActionLoading && (
        <div className="absolute inset-0  bg-white/70 flex flex-col items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#063970] mb-3"></div>
          <span className="text-gray-700 font-medium">{actionMessage}</span>
        </div>
      )}

      {/* Share Modal */}
      {isShareModalOpen && (
        <ShareModal
          url={url}
          onClose={() => setIsShareModalOpen(false)}
          qrCode={qrCodePath}
        />
      )}

      {/* Template Modal */}
      {isCardTemplateModalOpen && (
        <CardTemplateModal
          onClose={() => setIsCardTemplateModalOpen(false)}
          onSelectTemplate={(template) => setSelectedTemplate(template)}
        />
      )}
    </>
  );
}