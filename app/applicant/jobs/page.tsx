"use client";

import { useState, useMemo } from "react";
import JobList from "@/components/applicant/jobs/job-list";
import JobSearchbar from "@/components/applicant/jobs/job-searchbar";
import JobFilter from "@/components/applicant/jobs/job-filter";
import { useJobPostItemList } from "@/hooks/applicant/jobs/useJobPostItemList";

export default function JobsPage() {
  const { jobs, loading, error } = useJobPostItemList();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch = job.position
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.includes(job.department) ||
        selectedTags.includes(job.employment_type);

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
      <JobList jobs={filteredJobs} />
    </div>
  );
}
