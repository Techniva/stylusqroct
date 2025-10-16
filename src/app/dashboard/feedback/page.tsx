"use client"
import React, { useState, useEffect } from "react";
import { MessageCircle, Star, Send, ThumbsUp, ThumbsDown, HelpCircle, Mail, Phone } from "lucide-react";

const Feedback: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [feedbackType, setFeedbackType] = useState("general");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hasFeedback, setHasFeedback] = useState(false);

  useEffect(() => {
    const checkFeedback = async () => {
      try {
        const res = await fetch('/api/user/feedback');
        if (res.ok) {
          const data = await res.json();
          setHasFeedback(data.hasFeedback);
        }
      } catch {}
    };
    checkFeedback();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch('/api/user/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, feedbackType, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setRating(0);
        setFeedbackType("general");
        setMessage("");
        setHasFeedback(true);
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    }
  };

  return (
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-[#063970]" />
            <h1 className="text-xl font-bold text-gray-900">Feedback & Support</h1>
          </div>

          {/* 2-column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Feedback Form */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Share Your Feedback</h2>

              {hasFeedback ? (
                <p className="text-green-600 font-medium">You have already submitted your feedback 🙂</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rate your experience
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`p-2 rounded-lg transition-colors ${
                            star <= rating ? 'text-yellow-400' : 'text-gray-300'
                          } hover:text-yellow-400`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Feedback Type */}
                  <select
                    value={feedbackType}
                    onChange={(e) => setFeedbackType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                  >
                    <option value="general">General Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="improvement">Improvement Suggestion</option>
                  </select>

                  {/* Message */}
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                    placeholder="Describe your experience, suggestions, or issues..."
                  />

                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  {success && <p className="text-green-500 text-sm">{success}</p>}

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-[#063970] text-white rounded-full hover:bg-[#052c5c] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Submit
                  </button>
                </form>
              )}
            </section>

            {/* Quick Feedback */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Feedback</h2>

              <div className="grid grid-cols-1 gap-4">
                <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                  <ThumbsUp className="w-5 h-5 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">I love this!</h3>
                    <p className="text-sm text-gray-600">Everything works great</p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
                  <ThumbsDown className="w-5 h-5 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Needs Improvement</h3>
                    <p className="text-sm text-gray-600">Some things could be better</p>
                  </div>
                </button>
              </div>
            </section>

            {/* Help & Support */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Help & Support</h2>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { icon: HelpCircle, title: 'Help Center', desc: 'Find answers to common questions', bg: 'bg-blue-100', color: 'text-blue-600' },
                  { icon: Mail, title: 'Email Support', desc: 'Get help via email', bg: 'bg-green-100', color: 'text-green-600' },
                  { icon: Phone, title: 'Phone Support', desc: 'Call us for immediate help', bg: 'bg-purple-100', color: 'text-purple-600' }
                ].map(({ icon: Icon, title, desc, bg, color }, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:border-[#063970] transition-colors cursor-pointer">
                    <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{title}</h3>
                      <p className="text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">FAQs</h2>

              <div className="space-y-3">
                {[
                  { question: "How do I create a QR code?", answer: "Enter your URL, customize, and click 'Create QR Code'." },
                  { question: "Can I customize colors?", answer: "Yes! Foreground, background, and logo are customizable." },
                  { question: "What file formats?", answer: "Currently, PNG is supported." },
                  { question: "Limit on QR codes?", answer: "No limits in the free plan." }
                ].map((faq, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
  );
};

export default Feedback; 