import { useState, useMemo } from "react";
import JobCard from "./job-card";
import JobSearchbar from "./job-searchbar";
import JobFilter from "./job-filter";
import { useJobPostItemList } from "@/hooks/applicant/jobs/useJobPostItemList";

export default function JobList() {
  const { jobs, loading, error } = useJobPostItemList();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState({ min: 0, max: 1000000 });

  // Get all unique tags from jobs (must be before conditional returns)
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    jobs.forEach((job) => {
      job.tags?.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [jobs]);

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

      // Filter by salary range
      const jobSalaryMax = Number(job.salary_max);
      const matchesSalary =
        jobSalaryMax >= salaryRange.min && jobSalaryMax <= salaryRange.max;

      return matchesSearch && matchesTags && matchesSalary;
    });
  }, [jobs, searchQuery, selectedTags, salaryRange]);

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error}</div>;
  }

  return (
    <div>
      <div className="flex gap-4 mb-6">
        <div className="flex-1">
          <JobSearchbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <JobFilter
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          salaryRange={salaryRange}
          onSalaryRangeChange={setSalaryRange}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {filteredJobs.length === 0 ? (
          <div>No jobs available.</div>
        ) : (
          filteredJobs.map((job) => <JobCard key={job.id} data={job} />)
        )}
      </div>
    </div>
  );
}
