import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { UserPlus, Hourglass, Handshake } from "lucide-react";

function TotalSubmittedApplications() {
  const [totalApplications, setTotalApplications] = useState(0); // Placeholder value

  return (
    <div className="p-4 rounded-xl flex flex-col gap-2">
      <UserPlus className="mb-2 h-6 w-6 text-primary" />
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-bold">{totalApplications}</p>
        <h2 className="text-sm text-muted-foreground mb-2">
          Submitted Applications
        </h2>
      </div>
    </div>
  );
}

function PendingApplications() {
  const [pendingApplications, setPendingApplications] = useState(0); // Placeholder value

  return (
    <div className="p-4 rounded-xl flex flex-col gap-2">
      <Hourglass className="mb-2 h-6 w-6 text-primary" />
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-bold">{pendingApplications}</p>
        <h2 className="text-sm text-muted-foreground mb-2">
          Pending Applications
        </h2>
      </div>
    </div>
  );
}

function InterviewScheduled() {
  const [interviewsScheduled, setInterviewsScheduled] = useState(0); // Placeholder value
  return (
    <div className="p-4 rounded-xl flex flex-col gap-2">
      <Handshake className="mb-2 h-6 w-6 text-primary" />
      <div className="flex flex-col gap-1">
        <p className="text-3xl font-bold">{interviewsScheduled}</p>
        <h2 className="text-sm text-muted-foreground mb-2">
          Interviews Scheduled
        </h2>
      </div>
    </div>
  );
}

export default function OverviewCard() {
  return (
    <div className="p-4 rounded-xl bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Overview</h2>
      <div className="flex gap-4 items-stretch justify-between">
        <TotalSubmittedApplications />
        <Separator orientation="vertical" className="h-auto" />
        <PendingApplications />
        <Separator orientation="vertical" className="h-auto" />
        <InterviewScheduled />
      </div>
    </div>
  );
}
