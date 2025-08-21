"use client";

import {
  Mail,
  Linkedin,
  Twitter,
  MessageCircle,
  Send,
  Copy,
  Facebook,
} from "lucide-react";

type ShareModalProps = {
  url: string;
  qrCode: string; // base64 or external QR URL
  onClose: () => void;
};

export default function ShareModal({ url, qrCode, onClose }: ShareModalProps) {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  const shareLinks = [
    {
      icon: <Mail size={20} className="text-white" />,
      href: `mailto:?subject=Check%20this%20Business%20Card&body=${url}`,
      bg: "bg-gray-600",
    },
    {
      icon: <MessageCircle size={20} className="text-white" />, // WhatsApp
      href: `https://wa.me/?text=${encodeURIComponent(url)}`,
      bg: "bg-green-500",
    },
    {
      icon: <Facebook size={20} className="text-white" />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      bg: "bg-blue-600",
    },
    {
      icon: <Linkedin size={20} className="text-white" />,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      bg: "bg-blue-700",
    },
    {
      icon: <Send size={20} className="text-white" />, // Telegram
      href: `https://t.me/share/url?url=${encodeURIComponent(url)}`,
      bg: "bg-sky-500",
    },
    {
      icon: <Twitter size={20} className="text-white" />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
      bg: "bg-black",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-96 relative text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Heading */}
        <p className="text-sm text-gray-700 mb-4">
          Click on any of the below buttons to quick share this business card.
        </p>

        {/* Share Buttons Row */}
        <div className="flex justify-center gap-2 mb-4">
          {shareLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg ${link.bg} hover:opacity-90 transition`}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* URL + Copy */}
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 px-3 py-2 border rounded-l-lg bg-gray-100 text-sm"
          />
          <button
            onClick={handleCopy}
            className="px-3 py-2 bg-gray-200 rounded-r-lg hover:bg-gray-300"
          >
            <Copy size={18} />
          </button>
        </div>

        {/* QR Code */}
        <div className="flex justify-center mb-3">
          <img src={qrCode} alt="QR Code" className="w-36 h-36" />
        </div>

        {/* Bottom note */}
        <p className="text-xs text-gray-500">
          You can also scan the QR code above to share this business card.
        </p>
      </div>
    </div>
  );
}
