import React from "react";
import { Link, Code, Webhook, Database, Zap, Settings, Copy, ExternalLink } from "lucide-react";

const Integrations: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link className="w-8 h-8 text-[#063970]" />
        <h1 className="text-2xl font-bold text-gray-900">Integrations</h1>
      </div>

      {/* API Documentation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Code className="w-6 h-6 text-[#063970]" />
          <h2 className="text-xl font-semibold text-gray-900">API Documentation</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Integrate QR code generation into your applications with our RESTful API.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Base URL</span>
            <button className="text-[#063970] hover:text-[#052c5c]">
              <Copy className="w-4 h-4" />
            </button>
          </div>
          <code className="text-sm bg-white px-3 py-2 rounded border">
            https://api.stylusqr.com/v1
          </code>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Create QR Code</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">POST</span> /qr-codes</p>
              <p className="text-gray-600">Generate a new QR code</p>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Get QR Code</h4>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">GET</span> /qr-codes/{'{id}'}</p>
              <p className="text-gray-600">Retrieve QR code details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Webhooks */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Webhook className="w-6 h-6 text-[#063970]" />
          <h2 className="text-xl font-semibold text-gray-900">Webhooks</h2>
        </div>
        <p className="text-gray-600 mb-4">
          Receive real-time notifications when QR codes are scanned or updated.
        </p>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Scan Event</h4>
            <p className="text-sm text-gray-600 mb-2">Triggered when a QR code is scanned</p>
            <code className="text-xs bg-gray-50 px-2 py-1 rounded">
              qr_code.scanned
            </code>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Update Event</h4>
            <p className="text-sm text-gray-600 mb-2">Triggered when a QR code is updated</p>
            <code className="text-xs bg-gray-50 px-2 py-1 rounded">
              qr_code.updated
            </code>
          </div>
        </div>
      </div>

      {/* Popular Integrations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Integrations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Zapier", icon: Zap, description: "Automate workflows" },
            { name: "Slack", icon: Settings, description: "Team notifications" },
            { name: "Google Sheets", icon: Database, description: "Data tracking" },
            { name: "Shopify", icon: ExternalLink, description: "E-commerce integration" },
            { name: "Mailchimp", icon: ExternalLink, description: "Email marketing" },
            { name: "HubSpot", icon: ExternalLink, description: "CRM integration" }
          ].map((integration, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-[#063970] transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <integration.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                  <p className="text-sm text-gray-600">{integration.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SDKs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">SDKs & Libraries</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "JavaScript", version: "v2.1.0", status: "Latest" },
            { name: "Python", version: "v1.8.2", status: "Latest" },
            { name: "PHP", version: "v1.5.0", status: "Latest" },
            { name: "Ruby", version: "v1.3.1", status: "Latest" }
          ].map((sdk, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">{sdk.name}</h4>
                  <p className="text-sm text-gray-600">Version {sdk.version}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  {sdk.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Integrations; 