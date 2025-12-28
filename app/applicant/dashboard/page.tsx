"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<{ email: string | null } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/session", { cache: "no-store" });

        if (res.status === 401) {
          router.push("/login");
          return;
        }

        if (!res.ok) {
          throw new Error("Failed to load session");
        }

        const data = await res.json();
        setProfile({ email: data.email ?? null });
        setLoading(false);
      } catch (err: any) {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading profile: {error}</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {profile?.email}</p>
      <Button
        variant="outline"
        onClick={() => {
          document.cookie = "session_token=; Max-Age=0; path=/";
          document.cookie = "session_email=; Max-Age=0; path=/";
          router.push("/login");
        }}
      >
        Logout
      </Button>
    </div>
  );
}
