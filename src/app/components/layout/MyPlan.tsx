import React, { useState, useEffect } from "react";
import { CreditCard, Check, AlertCircle } from "lucide-react";

interface SubscriptionData {
  planName: string;
  planDescription: string;
  priceMonthly: number;
  priceYearly: number;
  qrCodesLimit: number;
  qrCodesUsed: number;
  features: string[];
  isActive: boolean;
  subscriptionStart?: string;
  subscriptionEnd?: string;
  pricingPlan?: {
  id: number;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  qrCodesLimit: number;
  features: string;
  } | null;
}



const MyPlan: React.FC = () => {
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch subscription data
      const subscriptionResponse = await fetch('/api/subscription/user-data?t=' + Date.now());
      if (subscriptionResponse.ok) {
        const data = await subscriptionResponse.json();
        console.log('Subscription data fetched:', data);
        console.log('Plan name:', data.planName);
        console.log('Plan description:', data.planDescription);
        console.log('Price monthly:', data.priceMonthly);
        console.log('PricingPlan data:', data.pricingPlan);
        setSubscriptionData(data);
      } else if (subscriptionResponse.status === 401) {
        setError('Please log in to view your subscription details');
      } else {
        setError('Failed to fetch subscription data');
      }


    } catch (error) {
      setError('Network error while fetching data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-8 h-8 text-[#063970]" />
          <h1 className="text-2xl font-bold text-gray-900">My Plan</h1>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#063970]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="w-8 h-8 text-[#063970]" />
          <h1 className="text-2xl font-bold text-gray-900">My Plan</h1>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div>
              <h3 className="text-lg font-semibold text-red-900">Error Loading Plan</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const plan = subscriptionData || {
    planName: "Free",
    planDescription: "Perfect for getting started with QR codes",
    priceMonthly: 0,
    priceYearly: 0,
    qrCodesLimit: 5,
    qrCodesUsed: 0,
    features: ["5 QR codes", "Basic analytics", "Standard templates", "Email support"],
    isActive: true,
    hasActiveSubscription: false,
    subscriptionStart: undefined,
    subscriptionEnd: undefined
  };

  const pricingPlanLimit = subscriptionData?.pricingPlan?.qrCodesLimit || plan.qrCodesLimit;
  const usagePercentage = pricingPlanLimit === -1 ? 0 : (plan.qrCodesUsed / pricingPlanLimit) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-8 h-8 text-[#063970]" />
        <h1 className="text-2xl font-bold text-gray-900">My Plan</h1>
      </div>

      {/* Current Plan */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-2">Plan: {plan.planName}</h2>
            <p className="text-blue-100 mb-4">{plan.planDescription}</p>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              <span>Status: {plan.isActive ? 'Active' : 'Inactive'}</span>
            </div>
            {plan.subscriptionStart && (
              <div className="flex items-center gap-2 mt-2">
                <Check className="w-5 h-5" />
                <span>Subscribed on: {new Date(plan.subscriptionStart).toLocaleDateString()}</span>
                {plan.subscriptionEnd && (
                  <span className="text-xs">
                    (Valid until: {new Date(plan.subscriptionEnd).toLocaleDateString()})
                  </span>
                )}
              </div>
            )}
            {!plan.subscriptionStart && (
              <div className="flex items-center gap-2 mt-2">
                <Check className="w-5 h-5" />
                <span>Free plan - No subscription required</span>
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">
              {plan.priceMonthly === 0 ? 'Free' : `₹${(plan.priceMonthly / 100).toFixed(2)}`}
            </p>
            <p className="text-blue-100">
              {plan.priceMonthly === 0 ? 'No monthly charge' : 'per month'}
            </p>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Usage Statistics</h3>
          {subscriptionData?.pricingPlan && (
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Based on {subscriptionData.pricingPlan.name} Plan
            </span>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">QR Codes Used</span>
              <span className="text-sm font-semibold text-gray-900">
                {plan.qrCodesUsed} / {subscriptionData?.pricingPlan?.qrCodesLimit === -1 ? 'Unlimited' : subscriptionData?.pricingPlan?.qrCodesLimit || plan.qrCodesLimit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#063970] h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {subscriptionData?.pricingPlan?.qrCodesLimit === -1 ? 'Unlimited QR codes available' : `${(subscriptionData?.pricingPlan?.qrCodesLimit || plan.qrCodesLimit) - plan.qrCodesUsed} QR codes remaining`}
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-[#063970]">{Math.round(usagePercentage)}%</p>
            <p className="text-sm text-gray-600">Usage</p>
          </div>
        </div>
      </div>

      {/* Plan Features */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {plan.features.map((feature, index) => (
          <div key={`feature-${index}`} className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-sm text-gray-900">{feature}</h3>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default MyPlan; 