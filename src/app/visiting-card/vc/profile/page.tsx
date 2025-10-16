"use client";

import { useState, useEffect } from "react";

export default function VisitingCardProfilePage() {
  const [profile, setProfile] = useState({ fullName: "", email: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/auth/user");
        if (res.ok) {
          const data = await res.json();
          setProfile({ fullName: data.user.fullName, email: data.user.email });
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded shadow flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Full Name</label>
        <input
          type="text"
          value={profile.fullName}
          readOnly
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold">Email</label>
        <input
          type="email"
          value={profile.email}
          readOnly
          className="border px-3 py-2 rounded w-full"
        />
      </div>
    </div>
  );
}
