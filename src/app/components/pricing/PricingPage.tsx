"use client";

import React, { useState, useEffect } from 'react';
import { Check, Star } from 'lucide-react';
import PaymentModal from '@/app/components/layout/PaymentModal';

interface PricingPlan {
  id: number;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  qrCodesLimit: number;
  features: string[];
  isActive: boolean;
}

const PricingPage: React.FC = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  useEffect(() => {
    fetchPricingPlans();
  }, []);

  const fetchPricingPlans = async () => {
    try {
      const response = await fetch('/api/pricing/plans');
      const data = await response.json();
      if (data.success) {
        setPlans(data.plans);
      }
    } catch (error) {
      console.error('Error fetching pricing plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPrice = (plan: PricingPlan) => {
    const priceInPaise = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
    // Convert from paise to rupees by dividing by 100
    const priceInRupees = priceInPaise / 100;
    return priceInRupees.toString();
  };

  const getSavings = (plan: PricingPlan) => {
    if (plan.priceMonthly === 0) return 0;
    const monthlyTotalInPaise = plan.priceMonthly * 12;
    const yearlyPriceInPaise = plan.priceYearly;
    return Math.round(((monthlyTotalInPaise - yearlyPriceInPaise) / monthlyTotalInPaise) * 100);
  };

  const handleSubscribe = async (plan: PricingPlan) => {
    if (plan.name === 'Free') {
      // Handle free plan - redirect to dashboard or show success message
      console.log('Free plan selected');
      return;
    }
    
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#063970]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with our free plan and upgrade as you grow. All plans include our core QR code features.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="relative flex bg-white rounded-full shadow-sm border overflow-hidden w-[270px] h-10">
            {/* Sliding background */}
            <div
              className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-[#063970] transition-transform duration-300"
              style={{
                transform: billingCycle === 'monthly' ? 'translateX(0%)' : 'translateX(100%)'
              }}
            ></div>

            {/* Buttons */}
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`flex-1 relative z-10 text-sm font-medium transition-colors duration-300 ${
                billingCycle === 'monthly'
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`flex-1 relative z-10 text-sm font-medium transition-colors duration-300 flex items-center justify-center`}
            >
              <span
                className={`transition-colors duration-300 ${
                  billingCycle === 'yearly'
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Yearly
              </span>
              {billingCycle === 'yearly' && (
                <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  Save 17%
                </span>
              )}
            </button>
          </div>
        </div>


        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.name === 'Pro' ? 'border-[#063970] scale-105' : 'border-gray-200'
              }`}
            >
              {/* Popular Badge */}
              {plan.name === 'Pro' && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#063970] to-[#052c5c] text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{getPrice(plan)}
                    </span>
                    <span className="text-gray-600 ml-2">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  
                  {/* Savings */}
                  {billingCycle === 'yearly' && plan.priceMonthly > 0 && (
                    <p className="text-green-600 text-sm font-medium">
                      Save {getSavings(plan)}% with yearly billing
                    </p>
                  )}
                </div>

                {/* QR Codes Limit */}
                <div className="mb-6">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-[#063970]">
                      {plan.qrCodesLimit === -1 ? 'Unlimited' : plan.qrCodesLimit}
                    </span>
                    <p className="text-gray-600 text-sm">QR Codes</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(plan)}
                  className={`w-full py-3 px-6 rounded-full font-semibold transition-colors ${
                    plan.name === 'Pro'
                      ? 'bg-[#063970] text-white hover:bg-[#052c5c]'
                      : plan.name === 'Basic'
                      ? 'bg-white text-[#063970] border-2 border-[#063970] hover:bg-[#063970] hover:text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {plan.name === 'Free' ? 'Get Started Free' : `Subscribe to ${plan.name}`}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade or downgrade my plan?
              </h3>
              <p className="text-gray-600">
                Yes, you can change your plan at any time. Changes will be prorated and reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, debit cards, and UPI payments through secure payment gateways.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a free trial?
              </h3>
              <p className="text-gray-600">
                Yes, you can start with our free plan which includes 5 QR codes and basic features.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Absolutely! You can cancel your subscription at any time. No long-term contracts required.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPlan(null);
          }}
          plan={selectedPlan}
          billingCycle={billingCycle}
        />
      )}
    </div>
  );
};

export default PricingPage; 