"use client";

import OpenRolesCard from "@/components/admin/dashboard/open-roles-card";
import ActiveApplicantsCard from "@/components/admin/dashboard/active-applicants-card";
import InterviewsScheduledCard from "@/components/admin/dashboard/interviews-scheduled-card";
import OffersOutCard from "@/components/admin/dashboard/offers-out-card";
import { useStats } from "@/hooks/admin/dashboard/useStats";

export default function DashboardPage() {
  const { stats, loading, error } = useStats();
  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OpenRolesCard count={stats?.open_roles} />
        <ActiveApplicantsCard count={stats?.applicants_total} />
        <InterviewsScheduledCard count={stats?.upcoming_interviews} />
        <OffersOutCard count={stats?.recent_offers} />
      </section>
    </div>
  );
}
