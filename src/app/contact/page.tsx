"use client";

import React from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "../components/ui/Breadcrumbs";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-16 relative overflow-hidden">
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="max-w-6xl mx-auto px-6 mt-4 mb-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="relative w-full overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-fuchsia-500 py-36 relative">
            {/* Abstract floating blobs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>

            <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6"
              >
                Get in Touch with StylusQR
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-white/90 text-lg md:text-xl"
              >
                Whether you have questions about our QR Codes, Digital Business Cards, or
                need help optimizing your networking, we’re here to help.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Contact Info + Form Section */}
        <section className="max-w-6xl mx-auto mt-16 px-6 py-12 bg-gradient-to-b from-gray-100 to-white rounded-3xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-gray-800">Contact Information</h2>
              <p className="text-gray-600">
                Reach out to us via email, phone, or visit our office in Bangalore.
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@stylusqr.com"
                    className="text-purple-600 hover:underline"
                  >
                    support@stylusqr.com
                  </a>
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  <a
                    href="tel:+911234567890"
                    className="text-purple-600 hover:underline"
                  >
                    +91 12345 67890
                  </a>
                </p>
                <p>
                  <strong>Address:</strong> 123 QR Street, Bangalore, Karnataka, India
                </p>
              </div>

              {/* Google Maps */}
              <div className="mt-6 w-full h-64 bg-gray-200 rounded-lg overflow-hidden shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18..."
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  className="rounded-lg"
                ></iframe>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              <form className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows={4}
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-500 to-fuchsia-500 text-white rounded-lg font-semibold shadow-lg hover:opacity-90 transition"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Marketing/Trust Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-600 via-purple-500 to-fuchsia-500 py-20 mt-16"
        >
          <div className="max-w-6xl mx-auto px-6 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Why StylusQR?</h3>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              Trusted by thousands of professionals to create and share digital
              business cards and QR codes that stand out.
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/digital-business-cards/create"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-full font-semibold shadow hover:bg-gray-100 transition"
            >
              Create Your Free Digital Card
            </motion.a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
