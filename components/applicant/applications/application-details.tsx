"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useApplicationDetails } from "@/hooks/applicant/applications/useApplicationDetails";

export default function ApplicationDetailsPage({ id }: { id: string }) {
  const { application, loading, error } = useApplicationDetails(id);

  if (loading) {
    return <div>Loading application details...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!application) {
    return <div>Application not found.</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Title Section */}
      <h1 className="text-3xl font-bold">{application.title}</h1>

      {/* Key Details */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground uppercase">Status</p>
          <p className="font-semibold">{application.status}</p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground uppercase">Applied On</p>
          <p className="font-semibold">
            {new Date(application.applied_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs text-muted-foreground uppercase">
            Application ID
          </p>
          <p className="font-semibold text-sm">{application.public_id ?? id}</p>
        </div>
      </div>

      <Separator />

      {/* Main Content */}
      <div className="flex flex-col gap-4">
        {application.pitch ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Pitch</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {application.pitch}
            </p>
          </div>
        ) : null}

        {application.notes ? (
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">Notes</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {application.notes}
            </p>
          </div>
        ) : null}

        {!application.pitch && !application.notes ? (
          <p className="text-sm text-muted-foreground">
            No additional details provided.
          </p>
        ) : null}
      </div>
    </div>
  );
}
