"use client";

import DashboardMainContent from "@/app/components/layout/DashboardMainContent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  fullName: string;
  email: string;
}

export default function DashboardMainContentPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/user");

        if (res.status === 401) {
          router.replace("/");
          return;
        }

        if (res.ok) {
          const userData = await res.json();
          setUser(userData.user); // Make sure API returns { user }
        } else {
          router.replace("/");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.replace("/");
      }
    }

    checkAuth();
  }, [router]);

  // If user is not set yet, return null (avoids flash)
  if (!user) return null;

  return <DashboardMainContent user={user} />;
}
