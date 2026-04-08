import Link from "next/link";
import { useState, useMemo } from "react";
import JobSearchbar from "./job-searchbar";
import JobFilter from "./job-filter";
import { useJobPostItemList } from "@/hooks/applicant/jobs/useJobPostItemList";
import { Separator } from "@/components/ui/separator";

export default function JobList() {
  const { jobs, loading, error } = useJobPostItemList();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        job.tags?.some(
          (tag: unknown) =>
            typeof tag === "string" && selectedTags.includes(tag),
        );

      return matchesSearch && matchesTags;
    });
  }, [jobs, searchQuery, selectedTags]);

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <JobSearchbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="w-full sm:w-auto">
          <JobFilter
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filteredJobs.length === 0 ? (
          <div>No jobs found.</div>
        ) : (
          filteredJobs.map((job) => {
            const isActive = job.is_active === true;
            const hasApplied = Array.isArray(job.tags)
              ? job.tags.some((t: unknown) => typeof t === "boolean" && t)
              : false;
            const href = hasApplied
              ? `/applicant/applications/${job.public_id}`
              : `/applicant/jobs/${job.public_id}`;

            return (
              <Link
                key={job.id}
                href={href}
                className={`w-full border border-gray-200 p-6 hover:border-gray-400 transition-colors cursor-pointer block ${
                  isActive
                    ? ""
                    : "opacity-60 cursor-not-allowed pointer-events-none"
                }`}
                aria-disabled={!isActive}
                tabIndex={isActive ? 0 : -1}
                prefetch
              >
                <div className="flex mb-3 flex-wrap gap-2">
                  {job.tags?.map((tag: unknown, index: number) => {
                    if (typeof tag === "boolean") {
                      return tag ? (
                        <span
                          key={`applied-${index}`}
                          className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700"
                        >
                          Applied
                        </span>
                      ) : null;
                    }
                    return (
                      <span
                        key={`${String(tag)}-${index}`}
                        className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700"
                      >
                        {String(tag)}
                      </span>
                    );
                  })}
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h3>

                <Separator className="my-2" />

                <div className="flex flex-wrap justify-between items-center gap-3 text-sm text-muted-foreground">
                  <p>
                    Apply until:{" "}
                    <span className="text-gray-900">
                      {new Date(job.expiry_date).toLocaleDateString()}
                    </span>
                  </p>
                  <div className="flex gap-2">
                    <p
                      className={`text-sm font-medium ${isActive ? "text-green-600" : "text-red-600"}`}
                    >
                      {isActive ? "Open" : "Closed"}
                    </p>
                    <p>
                      {job.applications_count ?? 0}/{job.open_vacancies ?? 0}{" "}
                      applications received
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
