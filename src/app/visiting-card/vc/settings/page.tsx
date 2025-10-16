"use client";

import { useState } from "react";

export default function VisitingCardSettingsPage() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded shadow flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Visiting Card Settings</h1>

      <div className="flex items-center justify-between p-4 border rounded">
        <span>Enable Notifications</span>
        <input
          type="checkbox"
          checked={notifications}
          onChange={(e) => setNotifications(e.target.checked)}
          className="w-5 h-5"
        />
      </div>

      {/* Add more settings as needed */}
    </div>
  );
}
