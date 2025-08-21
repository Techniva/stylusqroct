
"use client"
import Dashboard from "@/app/components/layout/Dashboard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch("/api/auth/user");
      if (res.status === 401) {
      router.replace("/");
    } else {
      setLoading(false);
    }
    }
    checkAuth();
  }, [router]);

  if (loading) return null; // or a spinner
  return <Dashboard />;
} 