"use client";

// React
import { useEffect, useState } from "react";

// Next.js
import { useRouter } from "next/navigation";

// Dashboard sections
import OverviewCard from "@/components/applicant/dashboard/overview-card";
import RecentApplications from "@/components/applicant/dashboard/recent-applications";
import ExploreJobs from "@/components/applicant/dashboard/explore-jobs";
import InterviewCard from "@/components/applicant/dashboard/interview-card";

type SessionProfile = {
  email: string | null;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) return error.message;
  return "Unknown error";
};

export default function DashboardPage() {
  // Router for auth redirect
  const router = useRouter();

  // Page state
  const [profile, setProfile] = useState<SessionProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load active session for dashboard personalization
    const loadSessionProfile = async () => {
      try {
        const res = await fetch("/api/session", { cache: "no-store" });

        // Not authenticated -> send user to login page
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
      } catch (error) {
        setError(getErrorMessage(error));
        setLoading(false);
      }
    };

    loadSessionProfile();
  }, [router]);

  // Loading state UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Loading dashboard...
        </p>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="p-4 m-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
        Error loading profile: {error}
      </div>
    );
  }

  return (
    // Main dashboard surface
    <section className="w-full ">
      <div className="mx-auto w-full max-w-7xl p-4 md:p-6 lg:p-8">
        {/* Header: personalized greeting and context text */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here is what is happening with your career search today.
          </p>
        </header>

        {/* Responsive content grid: main feed + interview sidebar */}
        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12">
          {/* Left/Main Column */}
          <div className="flex flex-col gap-6 xl:col-span-8">
            <OverviewCard />
            <RecentApplications />
            <ExploreJobs />
          </div>

          {/* Right Column */}
          <aside className="xl:col-span-4 xl:sticky xl:top-6">
            <InterviewCard />
          </aside>
        </div>
      </div>
    </section>
  );
}
