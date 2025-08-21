import React, { useState } from "react";
import { Crown } from "lucide-react";
import Link from "next/link";
import PaymentModal from "./PaymentModal";

interface Stat {
  label: string;
  value: number;
}

interface UserData {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

interface DashboardStatsProps {
  stats: Stat[];
  onCreateQr: () => void;
  user?: UserData | null;
  userPlan?: string | null;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ stats, onCreateQr, user, userPlan }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const handleUpgrade = (planName: string) => {
    // Mock plan data - in real app, fetch from API
    const plan = {
      name: planName,
      priceMonthly: planName === 'Basic' ? 29900 : 59900, // in paise (₹299 and ₹599)
      priceYearly: planName === 'Basic' ? 299000 : 599000, // in paise (₹2990 and ₹5990)
      features: planName === 'Basic' 
        ? ['50 QR Codes', 'Advanced Analytics', 'Custom Branding', 'Priority Support']
        : ['Unlimited QR Codes', 'Advanced Analytics', 'Custom Branding', 'Priority Support', 'API Access', 'White Label']
    };
    
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  return (
  <div className="grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-6 items-center w-full">
    {stats.map(stat => (
      <div key={stat.label} className="flex flex-col items-center bg-white rounded-xl shadow px-6 py-3 min-w-[120px] w-full md:w-auto">
        <span className="text-2xl font-bold text-[#063970]">{stat.value}</span>
        <span className="text-xs text-gray-500 mt-1">{stat.label}</span>
      </div>
    ))}
    
    {/* Upgrade Button for Non-Pro Users */}
    {user && userPlan !== 'Pro' && (
      <div className="col-span-2 md:col-span-1 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl px-4 py-2 shadow">
        <div className="flex justify-center gap-2 my-1">
          <button
            onClick={() => handleUpgrade('Basic')}
            className="inline-flex items-center gap-2 bg-yellow-600 text-white py-2 px-3 rounded-full hover:bg-yellow-700 transition-colors text-xs"
          >
            <Crown size={14} />
            Upgrade to Basic
          </button>
          <button
            onClick={() => handleUpgrade('Pro')}
            className="inline-flex items-center gap-2 bg-[#063970] text-white py-2 px-3 rounded-full hover:bg-[#052c5c] transition-colors text-xs"
          >
            <Crown size={14} />
            Upgrade to Pro
          </button>
        </div>
        <div className="text-xs text-yellow-700 text-center">
          Get more benefits and exciting features etc.
        </div>
      </div>
    )}
    
    <button
      className="col-span-2 md:ml-auto bg-[#063970] text-white text-sm px-6 py-2 rounded-full font-semibold shadow hover:bg-[#052c5c] transition-colors w-full md:w-auto mt-2 md:mt-0"
      onClick={onCreateQr}
    >
      + Create QR Code
    </button>

    {/* Payment Modal */}
    {selectedPlan && (
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => {
          setShowPaymentModal(false);
          setSelectedPlan(null);
        }}
        plan={selectedPlan}
        billingCycle="monthly"
      />
    )}
  </div>
  );
};

export default DashboardStats; 