"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import JobList from "@/components/applicant/jobs/job-list";

export default function JobsPage() {
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
      } catch (err) {
        router.push("/login");
      }
    };

    loadProfile();
  }, [router]);

  return (
    <>
      <JobList />
    </>
  );
}
