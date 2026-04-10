"use client";

// React
import { useMemo, useState } from "react";

// Next.js
import Link from "next/link";
import { useSearchParams } from "next/navigation";

// Hooks
import { useApplicationsList } from "@/hooks/applicant/applications/useApplicationsList";

// UI components
import { Separator } from "@/components/ui/separator";

// Local components
import { ApplicationsSearchbar } from "@/components/applicant/applications/applications-searchbar";

// Utilities
import { getDate } from "@/lib/datetime.helpers";

export default function ApplicationsPage() {
  // URL filter state (e.g. ?status=pending)
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status");

  // Data + local search query
  const { applications, loading, error } = useApplicationsList();
  const [searchQuery, setSearchQuery] = useState("");

  // Derived list after applying search + status filters
  const filteredApplications = useMemo(() => {
    const query = searchQuery.toLowerCase();
    let filtered = (applications || []).filter((application) =>
      application.title.toLowerCase().includes(query),
    );

    if (statusFilter) {
      filtered = filtered.filter(
        (application) =>
          application.status.toLowerCase() === statusFilter.toLowerCase(),
      );
    }

    return filtered;
  }, [applications, searchQuery, statusFilter]);

  const hasFilteredApplications = filteredApplications.length > 0;

  // Loading/error states
  if (loading) {
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    // Main applications list content
    <div className="flex flex-col gap-4">
      <ApplicationsSearchbar value={searchQuery} onChange={setSearchQuery} />

      {hasFilteredApplications ? (
        filteredApplications.map((application) => (
          <Link
            key={application.id}
            href={`/applicant/applications/${application.id}`}
            className="w-full border border-gray-200 p-6 hover:border-gray-400 transition-colors cursor-pointer block"
            prefetch
          >
            <div className="flex mb-2 flex-wrap gap-2">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700">
                {application.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {application.title}
            </h3>
            <Separator className="my-2" />
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <p>Applied on: {getDate(application.applied_at)}</p>
            </div>
          </Link>
        ))
      ) : (
        <div>No applications found.</div>
      )}
    </div>
  );
}
