"use client";

import React, { useState, useEffect } from 'react';
import { Crown, CreditCard, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface SubscriptionStatus {
  name: string;
  qrCodesUsed: number;
  qrCodesLimit: number;
  isActive: boolean;
  subscriptionStart?: string;
  subscriptionEnd?: string;
}

const SubscriptionStatus: React.FC = () => {
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscription');
      if (response.ok) {
        const data = await response.json();
        setSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!subscription) {
    return null;
  }

  const usagePercentage = subscription.qrCodesLimit === -1 ? 0 : 
    (subscription.qrCodesUsed / subscription.qrCodesLimit) * 100;
  const isNearLimit = usagePercentage > 80;
  const isAtLimit = usagePercentage >= 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Crown className="w-5 h-5 text-[#063970]" />
          <h3 className="font-semibold text-gray-900">{subscription.name} Plan</h3>
        </div>
        {subscription.name !== 'Free' && (
          <Link
            href="/pricing"
            className="text-sm text-[#063970] hover:text-[#052c5c] font-medium"
          >
            Upgrade
          </Link>
        )}
      </div>

      <div className="space-y-3">
        {/* Usage Progress */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">QR Codes Used</span>
            <span className="text-gray-900 font-medium">
              {subscription.qrCodesUsed}
              {subscription.qrCodesLimit !== -1 && ` / ${subscription.qrCodesLimit}`}
            </span>
          </div>
          {subscription.qrCodesLimit !== -1 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  isAtLimit ? 'bg-red-500' : isNearLimit ? 'bg-yellow-500' : 'bg-[#063970]'
                }`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Status Messages */}
        {isAtLimit && (
          <div className="flex items-center space-x-2 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>You've reached your QR code limit. Upgrade to create more.</span>
          </div>
        )}
        {isNearLimit && !isAtLimit && (
          <div className="flex items-center space-x-2 text-yellow-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>You're approaching your QR code limit.</span>
          </div>
        )}

        {/* Subscription Info */}
        {subscription.name !== 'Free' && subscription.subscriptionEnd && (
          <div className="text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>
                Renews on {new Date(subscription.subscriptionEnd).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

        {/* Upgrade CTA for Free users */}
        {subscription.name === 'Free' && (
          <div className="mt-4">
            <Link
              href="/pricing"
              className="inline-flex items-center space-x-2 bg-[#063970] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#052c5c] transition-colors"
            >
              <Crown className="w-4 h-4" />
              <span>Upgrade Plan</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionStatus; 