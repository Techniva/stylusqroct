// fieldIcons.tsx
import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Link,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  MessageCircle,
  Send,
  PhoneCall,
  Github,
  Briefcase,
  Images,
  Calendar,
  Banknote,
} from "lucide-react";
import { FaPinterest, FaTiktok, FaPaypal, FaSkype } from "react-icons/fa";
import { SiVenmo } from "react-icons/si";

export const fieldIcons: Record<string, React.ReactNode> = {
  // General
  email: <Mail className="w-5 h-5" />,
  phone: <Phone className="w-5 h-5" />,
  location: <MapPin className="w-5 h-5" />,
  weblink: <Link className="w-5 h-5" />,

  // Social
  x: <Twitter className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  facebook: <Facebook className="w-5 h-5" />,
  tiktok: <FaTiktok className="w-5 h-5" />,
  youtube: <Youtube className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  pinterest: <FaPinterest className="w-5 h-5" />,

  // Messaging
  whatsapp: <MessageCircle className="w-5 h-5" />,
  skype: <FaSkype className="w-5 h-5" />,
  enquiry: <Send className="w-5 h-5" />,
  callback: <PhoneCall className="w-5 h-5" />,

  // Business
  calendly: <Calendar className="w-5 h-5" />,
  github: <Github className="w-5 h-5" />,
  products: <Briefcase className="w-5 h-5" />,
  gallery: <Images className="w-5 h-5" />,

  // Payments
  venmo: <SiVenmo className="w-5 h-5" />,
  paypal: <FaPaypal className="w-5 h-5" />,
  upi: <Banknote className="w-5 h-5" />,
  bank: <Banknote className="w-5 h-5" />,
};
