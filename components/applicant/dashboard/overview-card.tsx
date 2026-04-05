import { Separator } from "@/components/ui/separator";
import { UserPlus, Hourglass, Handshake } from "lucide-react";
import { useOverview } from "@/hooks/applicant/dashboard/useOverview";
import Link from "next/link";

function TotalSubmittedApplications({ data }: any) {
  return (
    <Link 
      href="/applicant/applications" 
      className="p-4 rounded-xl flex flex-col gap-2 hover:bg-white/50 transition-colors flex-1 min-w-[120px]"
    >
      <UserPlus className="mb-2 h-6 w-6 text-red-600" />
      <div className="flex flex-col gap-1">
        <p className="text-2xl md:text-3xl font-bold text-slate-900">{data?.total_applications}</p>
        <h2 className="text-xs md:text-sm text-muted-foreground leading-tight">
          Submitted Applications
        </h2>
      </div>
    </Link>
  );
}

function PendingApplications({ data }: any) {
  return (
    <Link 
      href="/applicant/applications?status=pending" 
      className="p-4 rounded-xl flex flex-col gap-2 hover:bg-white/50 transition-colors flex-1 min-w-[120px]"
    >
      <Hourglass className="mb-2 h-6 w-6 text-red-600" />
      <div className="flex flex-col gap-1">
        <p className="text-2xl md:text-3xl font-bold text-slate-900">{data?.pending_applications}</p>
        <h2 className="text-xs md:text-sm text-muted-foreground leading-tight">
          Pending Applications
        </h2>
      </div>
    </Link>
  );
}

function InterviewScheduled({ data }: any) {
  return (
    <div className="p-4 rounded-xl flex flex-col gap-2 flex-1 min-w-[120px]">
      <Handshake className="mb-2 h-6 w-6 text-red-600" />
      <div className="flex flex-col gap-1">
        <p className="text-2xl md:text-3xl font-bold text-slate-900">{data?.upcoming_interviews}</p>
        <h2 className="text-xs md:text-sm text-muted-foreground leading-tight">
          Interviews Scheduled
        </h2>
      </div>
    </div>
  );
}

export default function OverviewCard() {
  const { overview, loading, error } = useOverview();
  
  if (loading) return <p className="p-4 animate-pulse">Loading overview...</p>;
  if (error) return <p className="p-4 text-red-600">Error loading overview: {error}</p>;
  
  return (
    <div className="p-4 md:p-6 rounded-xl bg-gray-50 border border-slate-200 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Overview</h2>
      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch justify-between">
        <TotalSubmittedApplications data={overview} />
        
        <Separator orientation="vertical" className="hidden sm:block h-auto" />
        <Separator orientation="horizontal" className="sm:hidden w-full" />
        
        <PendingApplications data={overview} />
        
        <Separator orientation="vertical" className="hidden sm:block h-auto" />
        <Separator orientation="horizontal" className="sm:hidden w-full" />
        
        <InterviewScheduled data={overview} />
      </div>
    </div>
  );
}