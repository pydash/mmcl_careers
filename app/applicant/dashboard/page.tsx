"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import OverviewCard from "@/components/applicant/dashboard/overview-card";
import RecentApplications from "@/components/applicant/dashboard/recent-applications";
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm font-medium text-slate-500 animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 m-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
        Error loading profile: {error}
      </div>
    );
  }

  return (
    /* - lg:ml-64 added to main to offset the fixed sidebar on desktop.
       - mt-16 added for mobile header clearance.
    */
    <main className="flex-1 overflow-x-hidden lg:ml-64 mt-16 lg:mt-0 bg-slate-50 min-h-screen">
      <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
        
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, {profile?.email?.split('@')[0] || 'Applicant'}
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Here is what is happening with your career search today.
          </p>
        </header>

        {/* Responsive Grid Layout:
           - 1 Column on mobile/tablet (default)
           - 2 Columns on large screens (lg:grid-cols-[1fr_350px] or lg:grid-cols-12)
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left/Main Column: Overview, Apps, Explore */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <OverviewCard />
            <RecentApplications />
            <ExploreJobs />
          </div>

          {/* Right/Sidebar Column: Interviews */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8">
            <InterviewCard />
          </aside>
          
        </div>
      </div>
    </main>
  );
}