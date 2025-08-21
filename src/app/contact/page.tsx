import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import Body from "@/app/components/layout/Body";
import React from 'react';

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Body>
        <div className="max-w-xl mx-auto py-12 px-4">
          <h1 className="text-3xl font-bold mb-4 text-[#063970]">Contact Us</h1>
          <p className="mb-8 text-gray-700 text-lg">Have a question or need help? Fill out the form below and we’ll get back to you soon.</p>
          <form className="space-y-6 bg-white p-6 rounded-xl shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#063970]" rows={5} placeholder="How can we help you?" />
            </div>
            <button type="submit" className="w-full px-4 py-2 bg-[#063970] text-white rounded-lg hover:bg-[#052c5c] transition-colors">Send Message</button>
          </form>
        </div>
      </Body>
      <Footer />
    </div>
  );
} 