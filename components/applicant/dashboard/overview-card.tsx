// Next.js
import Link from "next/link";

// Icons
import { Handshake, Hourglass, UserPlus } from "lucide-react";

// Hooks
import { useOverview } from "@/hooks/applicant/dashboard/useOverview";

// UI components
import { Separator } from "@/components/ui/separator";

type OverviewData = {
  total_applications?: number;
  pending_applications?: number;
  upcoming_interviews?: number;
};

type OverviewMetricProps = {
  value: number | undefined;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

function OverviewMetric({ value, label, icon: Icon }: OverviewMetricProps) {
  const content = (
    <>
      <Icon className="mb-2 h-6 w-6 text-red-600" />
      <div className="flex flex-col gap-1">
        <p className="text-2xl md:text-3xl font-bold text-slate-900">{value}</p>
        <h2 className="text-xs md:text-sm text-muted-foreground leading-tight">
          {label}
        </h2>
      </div>
    </>
  );

  return (
    <div className="p-4 rounded-xl flex flex-1 min-w-30 flex-col gap-2">
      {content}
    </div>
  );
}

export default function OverviewCard() {
  const { overview, loading, error } = useOverview();

  // Loading state
  if (loading) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 border border-slate-200">
        <p className="animate-pulse">Loading...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 border border-slate-200">
        <p className="text-red-600 animate-pulse">Error: {error}</p>
      </div>
    );
  }

  const data = (overview ?? {}) as OverviewData;

  return (
    // Main overview panel
    <div className="p-4 md:p-6 bg-gray-50 border border-slate-200">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Overview</h2>

      {/* Metric row: stacks on mobile, inline on larger screens */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch justify-between">
        <OverviewMetric
          icon={UserPlus}
          label="Submitted Applications"
          value={data.total_applications}
        />

        <Separator orientation="vertical" className="hidden sm:block h-auto" />
        <Separator orientation="horizontal" className="sm:hidden w-full" />

        <OverviewMetric
          icon={Hourglass}
          label="Pending Applications"
          value={data.pending_applications}
        />

        <Separator orientation="vertical" className="hidden sm:block h-auto" />
        <Separator orientation="horizontal" className="sm:hidden w-full" />

        <OverviewMetric
          icon={Handshake}
          label="Interviews Scheduled"
          value={data.upcoming_interviews}
        />
      </div>
    </div>
  );
}
