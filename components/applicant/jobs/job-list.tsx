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
        job.tags?.some((tag) => selectedTags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [jobs, searchQuery, selectedTags]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 text-sm font-medium text-slate-500 animate-pulse">
        Loading jobs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
        Error loading jobs: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter: Stacked on mobile, row on desktop */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <JobSearchbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <div className="w-full sm:w-auto">
          <JobFilter selectedTags={selectedTags} onTagsChange={setSelectedTags} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl text-slate-500 font-medium">
            No jobs available matching your criteria.
          </div>
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
                className={`w-full border border-slate-200 p-5 md:p-6 rounded-2xl transition-all block bg-white shadow-sm ${
                  isActive
                    ? "hover:border-red-300 hover:shadow-md cursor-pointer active:scale-[0.99]"
                    : "opacity-60 cursor-not-allowed pointer-events-none"
                }`}
                aria-disabled={!isActive}
                tabIndex={isActive ? 0 : -1}
                prefetch
              >
                <div className="flex mb-3 flex-wrap gap-2">
                  {job.tags?.map((tag, index) => {
                    if (typeof tag === "boolean") {
                      return tag ? (
                        <span
                          key={`applied-${index}`}
                          className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-700"
                        >
                          Applied
                        </span>
                      ) : null;
                    }
                    return (
                      <span
                        key={tag}
                        className="inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 capitalize"
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                <h3 className="text-lg md:text-xl font-black text-slate-900 leading-tight">
                  {job.title}
                </h3>

                <Separator className="my-4 bg-slate-100" />

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm font-medium">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <span className="text-slate-400">Apply until:</span>
                    <span className="text-slate-900">
                      {new Date(job.expiry_date).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <Separator orientation="vertical" className="hidden sm:block h-4 bg-slate-200" />
                  
                  <div className="flex items-center gap-1.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                    <span className={isActive ? "text-emerald-700" : "text-slate-500"}>
                      {isActive ? "Accepting Applications" : "Position Closed"}
                    </span>
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