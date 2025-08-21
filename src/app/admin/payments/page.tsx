"use client";

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  RefreshCw,
  Eye,
  CreditCard,
  User,
  Calendar,
  DollarSign
} from 'lucide-react';

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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [planFilter, setPlanFilter] = useState('');
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });
  const [processingPayment, setProcessingPayment] = useState<number | null>(null);

  useEffect(() => {
    fetchPendingPayments();
  }, [pagination.page, searchTerm, statusFilter, planFilter]);

  const fetchPendingPayments = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(planFilter && { plan: planFilter })
      });

      const response = await fetch(`/api/admin/payments/pending?${params}`);
      if (response.ok) {
        const data = await response.json();
        setPayments(data.payments || []);
        setPagination(data.pagination || { page: 1, limit: 20, total: 0, pages: 0 });
      } else {
        console.error('Failed to fetch payments:', response.status);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
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
        alert(`Payment ${action === 'approve' ? 'approved' : 'rejected'} successfully!`);
      } else {
        alert(data.error || `Failed to ${action} payment`);
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setProcessingPayment(null);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
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

  return (
    <div className="py-2 px-4">
      {/* Page Header */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Payment Approvals</h1>
          </div>
          <button
            onClick={fetchPendingPayments}
            className="flex items-center space-x-2 px-2 py-2 bg-[#063970] text-white rounded-full hover:bg-[#052c5c] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-3 mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search payments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-sm pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-[#063970] focus:border-[#063970]"
              />
            </div>
            
            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#063970] focus:border-[#063970]"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            {/* Plan Filter */}
            <div>
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="w-full text-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#063970] focus:border-[#063970]"
              >
                <option value="">All Plans</option>
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
              </select>
            </div>
            
            {/* Total Count */}
            <div className="text-sm text-gray-500 text-center md:text-left">
              Total: {pagination.total} payments
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#063970] mx-auto"></div>
                    </td>
                  </tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No pending payments found
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{payment.user?.fullName || 'Unknown'}</div>
                          <div className="text-sm text-gray-500">{payment.user?.email || 'No email'}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {payment.subscription?.name || 'Unknown'}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {payment.subscription?.qrCodesLimit === -1 ? 'Unlimited' : payment.subscription?.qrCodesLimit} QR Codes
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{formatAmount(payment.amount)}</div>
                        <div className="text-xs text-gray-500">{payment.currency}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-mono text-gray-900">{payment.transactionId}</div>
                        <div className="text-xs text-gray-500">{payment.paymentMethod}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(payment.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handlePaymentAction(payment.id, 'approve')}
                            disabled={processingPayment === payment.id}
                            className="mr-4 text-green-600 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Approve Payment"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handlePaymentAction(payment.id, 'reject')}
                            disabled={processingPayment === payment.id}
                            className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Reject Payment"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          {processingPayment === payment.id && (
                            <div className="text-xs text-gray-500">Processing...</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(pagination.page - 1) * pagination.limit + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(pagination.page * pagination.limit, pagination.total)}
                    </span>{' '}
                    of <span className="font-medium">{pagination.total}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          page === pagination.page
                            ? 'z-10 bg-[#063970] border-[#063970] text-white'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 