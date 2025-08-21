import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, User, CreditCard } from 'lucide-react';

interface Payment {
  id: number;
  userId: number;
  user: {
    id: number;
    fullName: string;
    email: string;
    createdAt: string;
  };
  subscription: {
    id: number;
    name: string;
    description: string;
    qrCodesLimit: number;
  };
  amount: number;
  currency: string;
  transactionId: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

const PaymentApprovals: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingPayment, setProcessingPayment] = useState<number | null>(null);

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/payments/pending');
      const data = await response.json();

      if (response.ok) {
        setPayments(data.payments);
      } else {
        setError(data.error || 'Failed to fetch pending payments');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentAction = async (paymentId: number, action: 'approve' | 'reject') => {
    try {
      setProcessingPayment(paymentId);
      const response = await fetch('/api/admin/payments/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentId, action }),
      });

      const data = await response.json();

      if (response.ok) {
        // Remove the processed payment from the list
        setPayments(prev => prev.filter(p => p.id !== paymentId));
        // You could also show a success message here
      } else {
        setError(data.error || `Failed to ${action} payment`);
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setProcessingPayment(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAmount = (amount: number) => {
    return `₹${(amount / 100).toLocaleString()}`; // Convert from paise to rupees
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#063970]"></div>
        <span className="ml-2 text-gray-600">Loading pending payments...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <XCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800">{error}</span>
        </div>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Payments</h3>
        <p className="text-gray-600">All payments have been processed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Payment Approvals</h2>
        <div className="text-sm text-gray-600">
          {payments.length} pending payment{payments.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{payment.user.fullName}</h3>
                    <p className="text-sm text-gray-600">{payment.user.email}</p>
                  </div>
                </div>

                {/* Payment Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Subscription Plan
                    </label>
                    <p className="text-sm font-medium text-gray-900">{payment.subscription.name}</p>
                    <p className="text-xs text-gray-600">{payment.subscription.description}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Amount
                    </label>
                    <p className="text-lg font-bold text-[#063970]">{formatAmount(payment.amount)}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Payment ID
                    </label>
                    <p className="text-sm font-mono text-gray-900">{payment.transactionId}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Submitted
                    </label>
                    <p className="text-sm text-gray-900">{formatDate(payment.createdAt)}</p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Plan Features
                  </label>
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {payment.subscription.qrCodesLimit === -1 ? 'Unlimited' : payment.subscription.qrCodesLimit} QR Codes
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-2 ml-4">
                <button
                  onClick={() => handlePaymentAction(payment.id, 'approve')}
                  disabled={processingPayment === payment.id}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => handlePaymentAction(payment.id, 'reject')}
                  disabled={processingPayment === payment.id}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
                {processingPayment === payment.id && (
                  <div className="text-xs text-gray-500">Processing...</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentApprovals; 