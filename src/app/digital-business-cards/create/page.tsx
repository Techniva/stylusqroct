"use client";

import { useState, useEffect } from "react";
import { User, LogOut, CreditCard, Settings, ChevronDown, Menu, Pencil, LayoutDashboard,
       Share2, Save, ToggleLeft, X, ToggleRight, LayoutDashboardIcon} from "lucide-react";
import CardPreview from "../components/CardPreview";
import { motion } from "framer-motion";
import Link from "next/link";
import DisplaySettings from "../components/DisplaySettings";
import InformationSettings from "../components/InformationSettings";
import FieldsSettings from "../components/FieldsSettings";
import { fieldIcons } from "../components/fieldIcons"; // ✅
import ShareModal from "../components/ShareModal";
import { useRouter } from "next/navigation";


type CardInfo = {
  name: string;
  title: string;
  company: string;
  about: string;
  pronoun: string;        // ✅ add
  accreditations: string; // ✅ add
};

export default function DigitalBusinessCardDashboard() {
// State
const [cardInfo, setCardInfo] = useState<CardInfo>({
  name: "Nikhil Avishek",
  title: "Managing Director",
  company: "Acme Inc.",
  about:
    "My name is Nikhil Avishek, and I'm passionate about [Interest], [Interest] and [Interest]. I'm currently working as a Managing Director...",
  pronoun: "Nikhil",            // ✅ initialize
  accreditations: "IIT Madras",     // ✅ initialize
});

const router = useRouter(); // ✅ use inside the component
const [isLoading, setIsLoading] = useState(false);

// Sidebar state
const [isDropdownOpen, setDropdownOpen] = useState(false);

const [user, setUser] = useState<{ id: string; fullName: string; email: string } | null>(null);

// Prefill from sessionStorage and fetch user on mount

useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/user", {
        method: "GET",
        credentials: "include", // ✅ send cookies (JWT)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setUser(data.user);
        } else {
          router.push("/"); // no user → redirect home
        }
      } else {
        router.push("/"); // invalid JWT → redirect home
      }
    } catch (err) {
      console.error("Auth check failed", err);
      router.push("/");
    }
  };

  checkAuth();
}, [router]);


useEffect(() => {
  // Prefill DBC info from sessionStorage
  const prefill = sessionStorage.getItem('dbc_prefill');
  if (prefill) {
    try {
      const { vcard, uniqueCode } = JSON.parse(prefill);
      if (vcard) {
        setCardInfo((prev) => ({
          ...prev,
          name: vcard.name || prev.name,
          title: vcard.title || prev.title,
          company: vcard.company || prev.company,
          about: vcard.about || prev.about,
          pronoun: vcard.pronoun || prev.pronoun,
          accreditations: vcard.accreditations || prev.accreditations,
        }));
      }
      if (uniqueCode) {
        setUrl(`https://dbc.stylusqr.ly/${uniqueCode}`);
      }
    } catch {}
  }
  // Fetch logged-in user
  fetch('/api/auth/user').then(async (res) => {
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    } else {
      setUser(null);
    }
  });
}, []);


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
    setLoadingMessage("Saving card...");
    setIsLoading(true);
    try {
      const res = await fetch("/api/digital-business-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id, // Make sure user object has id, or pass correct userId
          name: cardInfo.name,
          title: cardInfo.title,
          company: cardInfo.company,
          about: cardInfo.about,
          pronoun: cardInfo.pronoun,
          accreditations: cardInfo.accreditations,
          primaryColor,
          secondaryColor,
          theme: selectedTheme,
          fieldIcons,
          activeFields,
          fieldData,
        }),
      });
      if (res.ok) {
        setLoadingMessage("Card saved successfully!");
        await new Promise((r) => setTimeout(r, 1000));
      } else {
        setLoadingMessage("Failed to save card.");
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch {
      setLoadingMessage("Error saving card.");
      await new Promise((r) => setTimeout(r, 1000));
    }
    setIsLoading(false);
  };

  const buttons = [
    { 
      label: "PC Layout", gradient: "from-sky-400 to-blue-500", icon: <LayoutDashboard size={20} /> 
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
        setLoadingMessage(isPublished ? "Unpublishing card..." : "Publishing card...");
        setIsLoading(true);
        await new Promise(res => setTimeout(res, 1000)); // simulate API call
        setIsPublished(!isPublished);
        setIsLoading(false);
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
  const [url, setUrl] = useState("https://dbc.stylusqr.ly/nikhilavishek10");
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

  // Fields settings
  const [activeFields, setActiveFields] = useState<string[]>([]);

  // Share modal state
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Update handleLogout to clear session and redirect
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    window.location.href = '/';
  };


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
          <div className="flex-1 py-4 px-6 space-y-4 h-[calc(100vh-115px)] overflow-y-auto">
            <h2 className="text-2xl font-bold bg-gradient-to-br from-[#021B35] via-[#032544] to-[#041E30] text-transparent bg-clip-text border-b pb-2">
              Card View
            </h2>

            {/* Label Card */}
            <div className="bg-white shadow rounded-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Label Input */}
              <div>
                <label className="block font-semibold mb-2">
                  Label this card
                </label>
                <input
                  type="text"
                  value={cardInfo.name}
                  onChange={(e) =>
                    setCardInfo({ ...cardInfo, name: e.target.value })
                  }
                  className="w-full border rounded-lg py-2 px-4 focus:ring-2 focus:ring-[#032544] focus:outline-none"
                />
              </div>

              {/* URL Preview */}
              <div className="flex flex-col">
                <label className="block text-sm font-medium mb-2 mt-1">Card URL</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={url}
                    readOnly
                    className="w-full text-gray-700 text-sm bg-gray-100 py-2.5 px-4 rounded-lg border cursor-not-allowed"
                  />
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="ml-2 bg-gray-100 rounded-lg p-2 h-10 w-10 text-gray-500 border hover:text-gray-800"
                  >
                    <Pencil size={18} />
                  </button>
                </div>

                {/* Modal */}
                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                      <h2 className="text-lg font-medium mb-4">Edit URL</h2>
                      <input
                        type="text"
                        value={tempUrl}
                        onChange={(e) => setTempUrl(e.target.value)}
                        className="w-full p-3 mb-4 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#032544]"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setIsModalOpen(false)}
                          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSave}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
                        <DisplaySettings
                          primaryColor={primaryColor}
                          setPrimaryColor={setPrimaryColor}
                          secondaryColor={secondaryColor}
                          setSecondaryColor={setSecondaryColor}
                        />
                      
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
           
           
            {/* Circular Buttons with Labels */}
            
            <div className="py-6 flex flex-wrap justify-center md:justify-between px-4 md:px-16 gap-4 bg-white rounded-xl shadow-md">
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

          {/* Right Side - Preview */}
          <div className="lg:w-1/3 w-full p-6">
          <CardPreview
              name={cardInfo.name}
              pronoun={cardInfo.pronoun}
              accreditations={cardInfo.accreditations}
              title={cardInfo.title}
              company={cardInfo.company}
              about={cardInfo.about}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              theme={selectedTheme}
              fieldIcons={fieldIcons}        // ✅ real icons
              activeFields={activeFields}    // ✅ which fields are active
              fieldData={fieldData}          // ✅ actual { label, value } data
            />
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
              qrCode={"/dbc/qr-code.png"}          />
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