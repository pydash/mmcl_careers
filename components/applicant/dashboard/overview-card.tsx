import { Separator } from "@/components/ui/separator";
import { UserPlus, Hourglass, Handshake } from "lucide-react";
import { useOverview } from "@/hooks/applicant/dashboard/useOverview";

function TotalSubmittedApplications({ data }: any) {
  return (
    <div className="p-4 rounded-xl flex flex-col gap-2">
      <UserPlus className="mb-2 h-6 w-6 text-primary" />
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-bold">{data?.total_applications}</p>
        <h2 className="text-sm text-muted-foreground mb-2">
          Submitted Applications
        </h2>
      </div>
    </div>
  );
}

function PendingApplications({ data }: any) {
  return (
    <div className="p-4 rounded-xl flex flex-col gap-2">
      <Hourglass className="mb-2 h-6 w-6 text-primary" />
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-bold">{data?.pending_applications}</p>
        <h2 className="text-sm text-muted-foreground mb-2">
          Pending Applications
        </h2>
      </div>
    </div>
  );
}

function InterviewScheduled({ data }: any) {
  return (
    <div className="p-4 rounded-xl flex flex-col gap-2">
      <Handshake className="mb-2 h-6 w-6 text-primary" />
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-bold">{data?.upcoming_interviews}</p>
        <h2 className="text-sm text-muted-foreground mb-2">
          Interviews Scheduled
        </h2>
      </div>
    </div>
  );
}

export default function OverviewCard() {
  const { overview, loading, error } = useOverview();
  if (loading) return <p className="p-4">Loading overview...</p>;
  if (error) return <p className="p-4">Error loading overview: {error}</p>;
  return (
    <div className="p-4 rounded-xl bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="flex gap-4 items-stretch justify-between">
        <TotalSubmittedApplications data={overview} />
        <Separator orientation="vertical" className="h-auto" />
        <PendingApplications data={overview} />
        <Separator orientation="vertical" className="h-auto" />
        <InterviewScheduled data={overview} />
      </div>
    </div>
  );
}
