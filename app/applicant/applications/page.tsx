"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useApplicationsList } from "@/hooks/applicant/applications/useApplicationsList";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ApplicationsSearchbar } from "@/components/applicant/applications/applications-searchbar";
import { toTitleCase } from "@/utils/formatText";

export default function ApplicationsPage() {
  const { applications, loading, error } = useApplicationsList();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApplications = useMemo(() => {
    const query = searchQuery.toLowerCase();
    let filtered = applications.filter(
      (application) =>
        application.position.toLowerCase().includes(query) ||
        application.department.toLowerCase().includes(query),
    );

    return filtered;
  }, [applications, searchQuery]);

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
            <div className="flex flex-wrap gap-2 mb-3 items-center">
              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                {application.department}
              </Badge>
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 capitalize">
                {application.status}
              </Badge>
            </div>
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                {toTitleCase(application.position)}
              </h3>
            </div>
            <Separator className="my-2" />
            <div className="text-sm text-muted-foreground">
              <p>
                Applied on:{" "}
                {new Date(application.created_at).toLocaleDateString()}
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
