import React, { useState } from 'react';
import { X, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    priceMonthly: number;
    priceYearly: number;
    features: string[];
  };
  billingCycle: 'monthly' | 'yearly';
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  plan,
  billingCycle
}) => {
  const [step, setStep] = useState<'payment' | 'paymentId' | 'success'>('payment');
  const [paymentId, setPaymentId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const price = billingCycle === 'monthly' ? plan.priceMonthly : plan.priceYearly;
  const priceInRupees = price / 100; // Convert from paise to rupees

  const handlePayment = async () => {
    // Move directly to payment ID submission
    setStep('paymentId');
  };

  const handlePaymentIdSubmit = async () => {
    if (!paymentId.trim()) {
      setError('Please enter a valid payment reference ID');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/payment/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentId: paymentId.trim(),
          planName: plan.name,
          billingCycle,
          amount: price,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep('success');
      } else {
        setError(data.error || 'Failed to submit payment ID');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStep('payment');
    setPaymentId('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {step === 'payment' && 'Submit Reference ID'}
            {step === 'paymentId' && 'Submit Reference ID'}
            {step === 'success' && 'Reference ID Submitted'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 'payment' && (
            <div className="space-y-6">
              {/* Plan Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">{plan.name} Plan</h3>
                <div className="text-2xl font-bold text-[#063970] mb-2">
                  ₹{priceInRupees.toLocaleString()}
                  <span className="text-sm font-normal text-gray-600">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>
                <ul className="space-y-1 text-sm text-gray-600">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Payment Instructions */}
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Payment Instructions</h4>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Complete the payment using UPI, Bank Transfer, or any preferred method</li>
                    <li>2. Note down the payment reference ID/transaction ID</li>
                    <li>3. Submit the reference ID for admin approval</li>
                    <li>4. Your subscription will be activated within 24 hours after approval</li>
                  </ol>
                </div>

                <button
                  onClick={handlePayment}
                  className="w-full bg-[#063970] text-white py-3 px-4 rounded-lg hover:bg-[#052a5a] transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Submit Reference ID</span>
                </button>
              </div>
            </div>
          )}

          {step === 'paymentId' && (
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-900">Ready to Submit</span>
                </div>
                <p className="text-sm text-green-800">
                  Please submit your payment reference ID for admin approval. Your subscription will be activated within 24 hours.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Reference ID / Transaction ID
                  </label>
                  <input
                    type="text"
                    value={paymentId}
                    onChange={(e) => setPaymentId(e.target.value)}
                    placeholder="Enter your payment reference ID"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#063970] focus:border-[#063970] transition-colors"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-800">{error}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePaymentIdSubmit}
                  disabled={isSubmitting || !paymentId.trim()}
                  className="w-full bg-[#063970] text-white py-3 px-4 rounded-lg hover:bg-[#052a5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Reference ID'}
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Reference ID Submitted Successfully!
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Your payment reference ID has been submitted for admin approval. You will receive an email notification once your subscription is activated.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Admin will review your payment within 24 hours</li>
                    <li>• You'll receive an email confirmation</li>
                    <li>• Your subscription will be automatically activated</li>
                    <li>• You can continue using the app normally</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal; 