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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="w-8 h-8 text-[#063970]" />
        <h1 className="text-2xl font-bold text-gray-900">Feedback & Support</h1>
      </div>

      {/* Feedback Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Share Your Feedback</h2>
        {hasFeedback ? (
          <p className="text-green-600 font-medium mb-4">You have already submitted your feedback 🙂</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">How would you rate your experience?</label>
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
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">What type of feedback is this?</label>
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
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]"
                placeholder="Tell us about your experience, suggestions, or any issues you've encountered..."
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-[#063970] text-white rounded-full hover:bg-[#052c5c] transition-colors"
            >
              <Send className="w-4 h-4" />
              Submit Feedback
            </button>
          </form>
        )}
      </div>

      {/* Quick Feedback */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Feedback</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <ThumbsUp className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">I love this!</h3>
              <p className="text-sm text-gray-600">Everything is working great</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
            <ThumbsDown className="w-6 h-6 text-red-600" />
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Needs improvement</h3>
              <p className="text-sm text-gray-600">Something could be better</p>
            </div>
          </button>
        </div>
      </div>

      {/* Help & Support */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Help & Support</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-[#063970] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Help Center</h3>
            <p className="text-sm text-gray-600">Find answers to common questions</p>
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-[#063970] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-sm text-gray-600">Get help via email</p>
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg hover:border-[#063970] transition-colors cursor-pointer">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600">Call us for immediate help</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {[
            {
              question: "How do I create a QR code?",
              answer: "Simply enter your URL in the input field, customize the design if desired, and click 'Create QR Code' to generate and download your QR code."
            },
            {
              question: "Can I customize the colors of my QR code?",
              answer: "Yes! You can customize the foreground color, background color, and even add your logo to make your QR code unique."
            },
            {
              question: "What file formats are supported for download?",
              answer: "Currently, we support PNG format for high-quality downloads that are perfect for printing and digital use."
            },
            {
              question: "Is there a limit to how many QR codes I can create?",
              answer: "No! You can create unlimited QR codes with our free plan. There are no restrictions on the number of QR codes you can generate."
            }
          ].map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback; 