"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useApplicationsList } from "@/hooks/applicant/applications/useApplicationsList";
import { Separator } from "@/components/ui/separator";
import { ApplicationsSearchbar } from "@/components/applicant/applications/applications-searchbar";

export default function ApplicationsPage() {
  const searchParams = useSearchParams();
  const statusFilter = searchParams.get("status");
  const { applications, loading, error } = useApplicationsList();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApplications = useMemo(() => {
    const query = searchQuery.toLowerCase();
    let filtered = (applications || []).filter((application) =>
      application.title.toLowerCase().includes(query),
    );

    if (statusFilter) {
      filtered = filtered.filter(
        (application) => application.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    return filtered;
  }, [applications, searchQuery, statusFilter]);

  if (loading) {
    return <div>Loading applications...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <ApplicationsSearchbar value={searchQuery} onChange={setSearchQuery} />

      {filteredApplications && filteredApplications.length > 0 ? (
        filteredApplications.map((application) => (
          <Link
            key={application.id}
            href={`/applicant/applications/${application.id}`}
            className="w-full border border-gray-200 p-6 hover:border-gray-400 transition-colors cursor-pointer block"
            prefetch
          >
            <div className="flex mb-2 flex-wrap gap-2">
              <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700">
                Status: {application.status}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {application.title}
            </h3>
            <Separator className="my-2" />
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <p>
                Applied on:{" "}
                {new Date(application.applied_at).toLocaleDateString()}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <div>No applications found.</div>
      )}
    </div>
  );
}
