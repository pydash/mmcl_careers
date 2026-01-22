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

  // Filter jobs by title, tags, and salary range
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // Search by title
      const matchesSearch = job.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      // Filter by tags (if any selected, job must have at least one selected tag)
      const matchesTags =
        selectedTags.length === 0 ||
        job.tags?.some((tag) => selectedTags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [jobs, searchQuery, selectedTags]);

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error}</div>;
  }

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <JobSearchbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <JobFilter selectedTags={selectedTags} onTagsChange={setSelectedTags} />
      </div>
      <div className="flex flex-col gap-4">
        {filteredJobs.length === 0 ? (
          <div>No jobs available.</div>
        ) : (
          filteredJobs.map((job) => {
            const isActive = job.is_active === true;
            const hasApplied = Array.isArray(job.tags)
              ? job.tags.some((t) => typeof t === "boolean" && t)
              : false;
            const href = hasApplied
              ? `/applicant/applications/${job.public_id}`
              : `/applicant/jobs/${job.public_id}`;
            return (
              <Link
                key={job.id}
                href={href}
                className={`w-full border border-gray-200 p-6 transition-colors block ${
                  isActive
                    ? "hover:border-gray-400 cursor-pointer"
                    : "opacity-60 cursor-not-allowed pointer-events-none"
                }`}
                aria-disabled={!isActive}
                tabIndex={isActive ? 0 : -1}
                prefetch
              >
                <div className="flex mb-2 flex-wrap gap-2">
                  {job.tags?.map((tag, index) => {
                    // If tag is boolean (has_applied), only render if true
                    if (typeof tag === "boolean") {
                      return tag ? (
                        <span
                          key={`applied-${index}`}
                          className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-700"
                        >
                          Applied
                        </span>
                      ) : null;
                    }
                    // For string tags (department, employment_type)
                    return (
                      <span
                        key={tag}
                        className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700"
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {job.title}
                </h3>
                <Separator className="my-2" />
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <p>
                    Apply until:{" "}
                    {new Date(job.expiry_date).toLocaleDateString()}
                  </p>
                  <Separator orientation="vertical" className="h-4" />
                  <p>{isActive ? "Open" : "Closed"}</p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
