"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Save,
  X,
  Check,
  AlertCircle
} from 'lucide-react';

interface PricingPlan {
  id: number;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  qrCodesLimit: number;
  features: string; // Changed from string[] to string (JSON string)
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPlans() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [deletePlan, setDeletePlan] = useState<PricingPlan | null>(null);
  const [showCreateConfirm, setShowCreateConfirm] = useState(false);
  const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [newPlan, setNewPlan] = useState({
    name: '',
    description: '',
    priceMonthly: 0,
    priceYearly: 0,
    qrCodesLimit: 0,
    features: JSON.stringify(['']), // Changed from string[] to JSON string
    isActive: true
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/plans');
      if (response.ok) {
        const data = await response.json();
        setPlans(data.plans);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlan = async () => {
    setShowCreateConfirm(true);
  };

  const confirmCreatePlan = async () => {
    try {
      const response = await fetch('/api/admin/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlan)
      });

      if (response.ok) {
        setShowCreateModal(false);
        setShowCreateConfirm(false);
        setNewPlan({
          name: '',
          description: '',
          priceMonthly: 0,
          priceYearly: 0,
          qrCodesLimit: 0,
          features: JSON.stringify(['']),
          isActive: true
        });
        fetchPlans();
        setSuccessMessage('Plan created successfully!');
        setShowSuccessPopup(true);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to create plan');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  const handleUpdatePlan = async () => {
    if (!editingPlan) return;
    setShowUpdateConfirm(true);
  };

  const confirmUpdatePlan = async () => {
    if (!editingPlan) return;

    try {
      const response = await fetch(`/api/admin/plans/${editingPlan.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPlan)
      });

      if (response.ok) {
        setEditingPlan(null);
        setShowUpdateConfirm(false);
        fetchPlans();
        alert('Plan updated successfully!');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to update plan');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  const handleDeletePlan = async () => {
    if (!deletePlan) return;

    try {
      const response = await fetch(`/api/admin/plans/${deletePlan.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setDeletePlan(null);
        fetchPlans();
        // Removed alert dialog - only confirmation popup shows
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to delete plan');
      }
    } catch (error) {
      alert('Network error. Please try again.');
    }
  };

  const addFeature = () => {
    if (editingPlan) {
      try {
        const features = JSON.parse(editingPlan.features);
        setEditingPlan({
          ...editingPlan,
          features: JSON.stringify([...features, ''])
        });
      } catch (error) {
        setEditingPlan({
          ...editingPlan,
          features: JSON.stringify([''])
        });
      }
    } else {
      setNewPlan({
        ...newPlan,
        features: JSON.stringify([...JSON.parse(newPlan.features), ''])
      });
    }
  };

  const removeFeature = (index: number) => {
    if (editingPlan) {
      try {
        const features = JSON.parse(editingPlan.features);
        const updatedFeatures = features.filter((_: string, i: number) => i !== index);
        setEditingPlan({
          ...editingPlan,
          features: JSON.stringify(updatedFeatures)
        });
      } catch (error) {
        setEditingPlan({
          ...editingPlan,
          features: JSON.stringify([])
        });
      }
    } else {
      const updatedFeatures = JSON.parse(newPlan.features).filter((_: string, i: number) => i !== index);
      setNewPlan({
        ...newPlan,
        features: JSON.stringify(updatedFeatures)
      });
    }
  };

  const updateFeature = (index: number, value: string) => {
    if (editingPlan) {
      try {
        const features = JSON.parse(editingPlan.features);
        const updatedFeatures = [...features];
        updatedFeatures[index] = value;
        setEditingPlan({
          ...editingPlan,
          features: JSON.stringify(updatedFeatures)
        });
      } catch (error) {
        setEditingPlan({
          ...editingPlan,
          features: JSON.stringify([value])
        });
      }
    } else {
      const updatedFeatures = JSON.parse(newPlan.features);
      updatedFeatures[index] = value;
      setNewPlan({
        ...newPlan,
        features: JSON.stringify(updatedFeatures)
      });
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-bold text-gray-900">Plans Management</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#063970] text-white rounded-full hover:bg-[#052c5c] transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className='text-sm'>Create Plan</span>
          </button>
        </div>

        {/* Plans Grid */}
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#063970]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                    <p className="text-sm text-gray-600">{plan.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingPlan(plan)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit Plan"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletePlan(plan)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Plan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Monthly Price:</span>
                    <span className="font-semibold">₹{(plan.priceMonthly / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Yearly Price:</span>
                    <span className="font-semibold">₹{(plan.priceYearly / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">QR Codes Limit:</span>
                    <span className="font-semibold">{plan.qrCodesLimit === -1 ? 'Unlimited' : plan.qrCodesLimit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`font-semibold ${plan.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {plan.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {(() => {
                      try {
                        const features = JSON.parse(plan.features);
                        return features.map((feature: string, index: number) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <Check className="w-3 h-3 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ));
                      } catch (error) {
                        return (
                          <li className="text-sm text-gray-500">
                            No features available
                          </li>
                        );
                      }
                    })()}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create Plan Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Create New Plan</h3>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                    <input
                      type="text"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#063970] focus:border-[#063970]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={newPlan.description}
                      onChange={(e) => setNewPlan({...newPlan, description: e.target.value})}
                      rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#063970] focus:border-[#063970]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Monthly Price (₹)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={(newPlan.priceMonthly / 100).toFixed(2)}
                        onChange={(e) => setNewPlan({...newPlan, priceMonthly: Math.round(parseFloat(e.target.value) * 100) || 0})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#063970] focus:border-[#063970]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Yearly Price (₹)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={(newPlan.priceYearly / 100).toFixed(2)}
                        onChange={(e) => setNewPlan({...newPlan, priceYearly: Math.round(parseFloat(e.target.value) * 100) || 0})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#063970] focus:border-[#063970]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">QR Codes Limit (-1 for unlimited)</label>
                    <input
                      type="number"
                      value={newPlan.qrCodesLimit}
                      onChange={(e) => setNewPlan({...newPlan, qrCodesLimit: parseInt(e.target.value) || 0})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#063970] focus:border-[#063970]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Features</label>
                    {JSON.parse(newPlan.features).map((feature: string, index: number) => (
                      <div key={index} className="flex space-x-2 mt-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#063970] focus:border-[#063970]"
                          placeholder="Enter feature"
                        />
                        <button
                          onClick={() => removeFeature(index)}
                          className="px-2 py-2 text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addFeature}
                      className="mt-2 text-sm text-[#063970] hover:text-[#052c5c]"
                    >
                      + Add Feature
                    </button>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newPlan.isActive}
                      onChange={(e) => setNewPlan({...newPlan, isActive: e.target.checked})}
                      className="h-4 w-4 text-[#063970] focus:ring-[#063970] border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Active</label>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmCreatePlan}
                    className="px-4 py-2 bg-[#063970] text-white rounded-md hover:bg-[#052c5c]"
                  >
                    Create Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Plan Modal */}
        {editingPlan && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Edit Plan</h3>
                  <button
                    onClick={() => setEditingPlan(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Plan Name</label>
                    <input
                      type="text"
                      value={editingPlan.name}
                      onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#063970] focus:border-[#063970]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      value={editingPlan.description}
                      onChange={(e) => setEditingPlan({...editingPlan, description: e.target.value})}
                      rows={3}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#063970] focus:border-[#063970]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Monthly Price (₹)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={(editingPlan.priceMonthly / 100).toFixed(2)}
                        onChange={(e) => setEditingPlan({...editingPlan, priceMonthly: Math.round(parseFloat(e.target.value) * 100) || 0})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#063970] focus:border-[#063970]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Yearly Price (₹)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={(editingPlan.priceYearly / 100).toFixed(2)}
                        onChange={(e) => setEditingPlan({...editingPlan, priceYearly: Math.round(parseFloat(e.target.value) * 100) || 0})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#063970] focus:border-[#063970]"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">QR Codes Limit (-1 for unlimited)</label>
                    <input
                      type="number"
                      value={editingPlan.qrCodesLimit}
                      onChange={(e) => setEditingPlan({...editingPlan, qrCodesLimit: parseInt(e.target.value) || 0})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#063970] focus:border-[#063970]"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Features</label>
                    {(() => {
                      try {
                        const features = JSON.parse(editingPlan.features);
                        return features.map((feature: string, index: number) => (
                          <div key={index} className="flex space-x-2 mt-2">
                            <input
                              type="text"
                              value={feature}
                              onChange={(e) => updateFeature(index, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#063970] focus:border-[#063970]"
                              placeholder="Enter feature"
                            />
                            <button
                              onClick={() => removeFeature(index)}
                              className="px-2 py-2 text-red-600 hover:text-red-800"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ));
                      } catch (error) {
                        return (
                          <div className="text-sm text-gray-500 mt-2">
                            No features available
                          </div>
                        );
                      }
                    })()}
                    <button
                      onClick={addFeature}
                      className="mt-2 text-sm text-[#063970] hover:text-[#052c5c]"
                    >
                      + Add Feature
                    </button>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingPlan.isActive}
                      onChange={(e) => setEditingPlan({...editingPlan, isActive: e.target.checked})}
                      className="h-4 w-4 text-[#063970] focus:ring-[#063970] border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Active</label>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => setEditingPlan(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmUpdatePlan}
                    className="px-4 py-2 bg-[#063970] text-white rounded-md hover:bg-[#052c5c]"
                  >
                    Update Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deletePlan && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-medium text-gray-900">Delete Plan</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  Are you sure you want to delete the plan "{deletePlan.name}"? This action cannot be undone.
                </p>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setDeletePlan(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeletePlan}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Create Confirmation Modal */}
        {showCreateConfirm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-medium text-gray-900">Create Plan</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  Are you sure you want to create the plan "{newPlan.name}"? This will add a new pricing plan to the system.
                </p>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowCreateConfirm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmCreatePlan}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Update Confirmation Modal */}
        {showUpdateConfirm && editingPlan && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-yellow-600 mr-3" />
                  <h3 className="text-lg font-medium text-gray-900">Update Plan</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  Are you sure you want to update the plan "{editingPlan.name}"? This will modify the pricing plan and may affect existing users.
                </p>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowUpdateConfirm(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmUpdatePlan}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Popup Modal */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center mb-4">
                  <Check className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-medium text-gray-900">Success</h3>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  {successMessage}
                </p>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowSuccessPopup(false)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 