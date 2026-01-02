"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import OverviewCard from "@/components/applicant/dashboard/overview-card";
import RecentApplications from "@/components/applicant/dashboard/recent-applications";
import ResumeCard from "@/components/applicant/dashboard/resume-card";
import ExploreJobs from "@/components/applicant/dashboard/explore-jobs";
import InterviewCard from "@/components/applicant/dashboard/interview-card";

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
  }, [router]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4">Error loading profile: {error}</p>;

  return (
    <main className="flex-1 overflow-auto">
      <div className="grid grid-cols-[6fr_4fr] gap-4 p-4">
        <div className="flex flex-col gap-4">
          <OverviewCard />
          <RecentApplications />
          <ResumeCard />
          <ExploreJobs />
        </div>
        <InterviewCard />
      </div>
    </main>
  );
}
