"use client";

import { useState, useEffect } from "react";
import { User, LogOut, CreditCard, Settings, ChevronDown, Menu, LayoutDashboard,
       Share2, Save, ToggleLeft, X, ToggleRight, LayoutDashboardIcon} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import DisplaySettings from "../components/DisplaySettings";
import InformationSettings from "../components/InformationSettings";
import FieldsSettings from "../components/FieldsSettings";
import ShareModal from "../components/ShareModal";
import { useRouter } from "next/navigation";
import CardTemplateModal from "./mycard/CardTemplateModal";
// Import templates
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
  pronoun: string;        // ✅ add
  accreditations: string; // ✅ add
};

export default function DigitalBusinessCardDashboard() {
// State
const [cardInfo, setCardInfo] = useState<CardInfo>({
  name: "",
  phone: "",
  email: "",
  address: "",
  website: "",
  title: "",
  company: "",
  about : "My name is [Your name], and I'm passionate about [Interest], [Interest] and [Interest]. I'm currently working as a [Your current job title] where I practise [Relevant skill] and [Relevant skill] every day.",
  pronoun: "",            // ✅ initialize
  accreditations: "",     // ✅ initialize
});
const [uniqueCode, setUniqueCode] = useState<string | null>(null);
const router = useRouter(); // ✅ use inside the component
const [isLoading, setIsLoading] = useState(true);

// Sidebar state
const [isDropdownOpen, setDropdownOpen] = useState(false);

const [user, setUser] = useState<{ id: string; fullName: string; email: string } | null>(null);

// Prefill from sessionStorage and fetch user on mount
useEffect(() => {
  const loadData = async () => {
    try {
      // ✅ 1. Fetch logged-in user
      const res = await fetch("/api/auth/user");
      if (!res.ok) {
        setUser(null);
        router.push("/");
        return;
      }
      const { user } = await res.json();
      setUser(user);

      // ✅ 2. Grab uniqueCode from URL
      const params = new URLSearchParams(window.location.search);
      //console.log(window.location.host);
      const codeFromUrl = params.get("uniqueCode");
      if (!codeFromUrl) {
        console.error("uniqueCode missing in URL");
        return;
      }

      // ✅ 3. Fetch card using userId from session + uniqueCode
      const dbcRes = await fetch(
        `/api/digital-business-cards?uniqueCode=${codeFromUrl}&userId=${user.id}`
      );

      if (dbcRes.ok) {
        const dbc = await dbcRes.json();

        // ✅ 4. Prefill state with DB values
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
      } else {
        console.error("Failed to fetch digital business card");
      }
    } catch (err) {
      console.error("Init load failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  loadData();
}, [router]);


// Fields data
type FieldValue = {
  label: string;
  value: string;
};

const [fieldData, setFieldData] = useState<Record<string, FieldValue>>({});
 
  // Accordion toggle
  const [accordion, setAccordion] = useState<string | null>(null);
  const toggleAccordion = (key: string) => {
    setAccordion(accordion === key ? null : key);
  };

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Loading state
  const [isPublished, setIsPublished] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");

  const handleSaveCard = async () => {
    if (!uniqueCode) {
      setLoadingMessage("Unique code not found.");
      setIsLoading(false);
      return;
    }
  
    setLoadingMessage("Updating card...");
    setIsLoading(true);
  
    try {
      const res = await fetch("/api/digital-business-cards", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uniqueCode, // ✅ send uniqueCode, not userId
          name: cardInfo.name,
          phone: cardInfo.phone,
          email: cardInfo.email,
          title: cardInfo.title,
          company: cardInfo.company,
          about: cardInfo.about,
          pronoun: cardInfo.pronoun,
          accreditations: cardInfo.accreditations,
          profileUrl,
          primaryColor,
          secondaryColor,
          theme: selectedTheme,
          template: selectedTemplate, // ✅ save the selected template
          activeFields,
          fieldData,
          qrCodePath,        
        }),
      });
  
      if (res.ok) {
        setLoadingMessage("Card updated successfully!");
      } else {
        const errData = await res.json();
        setLoadingMessage(errData.error || "Failed to update card.");
      }
    } catch (err) {
      console.error("Update error:", err);
      setLoadingMessage("Error updating card.");
    }
  
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  };
  
  const buttons = [
    { 
      label: "Choose Template", gradient: "from-sky-400 to-blue-500", icon: <LayoutDashboard size={20} />,
      onClick: ()  => setIsCardTemplateModalOpen(true), 
    },
    { 
      label: "Share Card", gradient: "from-pink-500 to-red-500", icon: <Share2 size={20} />, 
      onClick: () => setIsShareModalOpen(true),  
    },
    {
      label: isPublished ? "Unpublish Card" : "Publish Card",
      gradient: isPublished ? "from-green-400 to-emerald-500" : "from-orange-400 to-red-500",
      icon: isPublished ? <ToggleLeft size={20} /> : <ToggleRight size={20} />,
      onClick: async () => {
        try {
          setLoadingMessage(isPublished ? "Unpublishing card..." : "Publishing card...");
          setIsLoading(true);
    
          const res = await fetch("/api/digital-business-cards", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              uniqueCode,       // ✅ send uniqueCode
              published: !isPublished, // ✅ toggle publish state
            }),
          });
    
          if (!res.ok) throw new Error("Failed to update publish state");
    
          const updatedCard = await res.json();
          setIsPublished(updatedCard.published);
          setLoadingMessage(updatedCard.published ? "Card published!" : "Card unpublished.");
        } catch (err) {
          console.error("Publish toggle error:", err);
          setLoadingMessage("Error updating publish state.");
        } finally {
          await new Promise(r => setTimeout(r, 1000));
          setIsLoading(false);
        }
      },
    },    
    { 
      label: "Save Card", gradient: "from-indigo-500 to-purple-500", icon: <Save size={20} />, 
      onClick: handleSaveCard,
    },
    { 
      label: "Close", gradient: "from-red-500 to-pink-600", icon: <X size={20} />,
      onClick: async () => {
        setLoadingMessage("Loading… Moving to dashboard");
        setIsLoading(true);
        await new Promise(res => setTimeout(res, 1000)); // simulate API call
        router.push("/dashboard");
        setIsLoading(false);
      },
    },
  ];
  
  // URL state
  const [url, setUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempUrl, setTempUrl] = useState(url);

  const handleSave = () => {
    setUrl(tempUrl);
    setIsModalOpen(false);
  };

  const handleClose = async () => {
    setLoadingMessage("Moving to dashboard...");
    setIsLoading(true);
    await new Promise((res) => setTimeout(res, 2000)); // simulate API delay
    router.push("/dashboard");
    setIsLoading(false);
  };

  // Display settings
  const [primaryColor, setPrimaryColor] = useState("#021B35");
  const [secondaryColor, setSecondaryColor] = useState("#FCC736");
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  
  // Inside DigitalBusinessCardDashboard
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // Fields settings
  const [activeFields, setActiveFields] = useState<string[]>([]);

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
 
  // Card Template modal state
  const [isCardTemplateModalOpen, setIsCardTemplateModalOpen] = useState(false);

  // State for template
  const [selectedTemplate, setSelectedTemplate] = useState<string>("classic");
  {isCardTemplateModalOpen && (
    <CardTemplateModal
      onClose={() => setIsCardTemplateModalOpen(false)}
      onSelectTemplate={(template) => setSelectedTemplate(template)} // updates dashboard state
    />
  )}
  
  // Update handleLogout to clear session and redirect
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    window.location.href = '/';
  };
  
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
    const [qrCodePath, setQrCodePath] = useState<string>("");
  return (
    <div className="bg-gray-100 flex relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-br from-[#021B35] via-[#032544] to-[#041E30] text-white shadow-lg transition-all duration-300 flex flex-col z-50
        ${isSidebarOpen ? "w-64" : "w-16"}`}
      >
        {/* Top Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isSidebarOpen && <span className="font-bold text-lg">Dashboard</span>}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-white p-[3px]"
            aria-label="Toggle Sidebar"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Nav Menu */}
        <nav className="flex-1 p-2 space-y-2">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800">
            <CreditCard size={20} />
            {isSidebarOpen && <span>My Cards</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800">
            <Settings size={20} />
            {isSidebarOpen && <span>Settings</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-800">
            <User size={20} />
            {isSidebarOpen && <span>Profile</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64 ml-16" : "ml-16"
        }`}
      >
        {/* Header */}
        <header className="w-full bg-white shadow p-4 flex justify-between items-center sticky top-0 z-40">
          <Link href="/digital-business-cards">
            <h1 className="text-lg font-bold text-[#021B35] cursor-pointer hover:text-[#032544] transition-colors">
              Digital Business Card
            </h1>
          </Link>

          <div className="relative flex items-center gap-4">
            <span className="text-gray-600">Welcome, {user?.fullName || 'User'}</span>
            <div className="relative">
              <User
                size={20}
                className="text-gray-700 cursor-pointer"
                onClick={() => setDropdownOpen(!isDropdownOpen)}
              />

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center text-sm gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                  <button
                    onClick={handleClose}
                    className="w-full flex items-center text-sm gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <LayoutDashboardIcon size={16} />QR Dashboard
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 flex flex-col lg:flex-row">
          {/* Left Side - Settings */}
          <div className="flex-1 py-4 px-6 space-y-4 h-[calc(100vh-114px)] overflow-y-auto">
            <h2 className="text-xl font-bold bg-gradient-to-br from-[#021B35] via-[#032544] to-[#041E30] text-transparent bg-clip-text border-b pb-2">
              Card View
            </h2>

            {/* Label Card */}
            <div className="bg-white shadow rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Left: QR Code + Actions */}
              <div className="flex items-center gap-3">
                {/* QR Code */}
                {qrCodePath ? (
                  <img src={qrCodePath} alt="QR Code" className="w-24 h-24 object-contain border rounded-md shadow-sm" />
                ) : (
                  <div className="w-24 h-24 flex items-center justify-center bg-gray-200 text-gray-500 rounded-md text-xs">
                    No QR
                  </div>
                )}

                {/* Buttons */}
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

              {/* Right: Label + URL */}
              <div className="flex flex-col gap-3">
                {/* Label Input */}
                <div>
                  <label className="block text-xs font-medium mb-1">Label this card</label>
                  <input
                    type="text"
                    value={cardInfo.name}
                    onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                    className="w-full border rounded-md py-1 px-2 text-xs focus:ring-1 focus:ring-[#032544] focus:outline-none"
                  />
                </div>

                {/* URL Preview */}
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

            {/* Accordion Sections */}
            <div className="space-y-4">
              {["Display", "Information", "Fields"].map((section) => (
                <div
                  key={section}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                >
                  {/* Header Button */}
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

                  {/* Animated Content */}
                  <motion.div
                    initial={false}
                    animate={{ height: accordion === section ? "auto" : 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className={accordion === section ? "p-4" : "hidden"}>
                      {section === "Display" ? (
                          uniqueCode && ( // ✅ ensure uniqueCode exists
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
                        )  : section === "Information" ? (
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
                     
            {/* Circular Buttons with Labels */}
           
            <div className="py-4 flex flex-wrap justify-center md:justify-between px-4 md:px-16 gap-4 bg-white rounded-xl shadow-md">
              {buttons.map((btn) => (
                <div key={btn.label} className="flex flex-col items-center">
                  <button
                    onClick={btn.onClick}
                    className={`
                      relative rounded-full flex items-center justify-center text-white font-semibold
                      shadow-xl transition-all duration-300 transform hover:scale-105
                      hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)]
                      focus:outline-none
                      w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                    `}
                    title={btn.label}
                  >
                    {/* Gradient background */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${btn.gradient} transition-all duration-500`}></div>

                    {/* Icon layer */}
                    <div className="relative z-10">{btn.icon}</div>

                    {/* Ripple effect */}
                    <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-10 bg-white"></span>
                  </button>

                  {/* Label */}
                  <span className="mt-2 text-xs sm:text-xs md:text-sm font-medium text-gray-700 text-center">
                    {btn.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

         {/* Right Side - Preview with vertical scroll */}
          <div className="lg:w-[30%] p-6  h-[calc(100vh-115px)] overflow-y-auto">
            {renderTemplate()}
          </div>

          {/* Loading Spinner */}
          {isLoading && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex flex-col items-center justify-center text-white">
              <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin mb-4"></div>
              <span className="text-sm font-medium">{loadingMessage}</span>
            </div>
          )}

          {/* Share Modal */}
          {isShareModalOpen && (
            <ShareModal 
              url={url}
              onClose={() => setIsShareModalOpen(false)} // ✅ close when clicking X
              qrCode={qrCodePath}/>
          )}
          {isCardTemplateModalOpen && (
            <CardTemplateModal
              onClose={() => setIsCardTemplateModalOpen(false)}
              onSelectTemplate={(template) => setSelectedTemplate(template)} 
            />
          )}
        </main>

        {/* Footer */}
        <footer className="w-full bg-white border shadow-inner p-4 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} StylusQR | All rights reserved.
        </footer>
      </div>
    </div>
  );
}