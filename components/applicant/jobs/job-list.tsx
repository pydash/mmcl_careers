import JobCard from "./job-card";
import { useJobPostItemList } from "@/hooks/applicant/jobs/useJobPostItemList";

export default function JobList() {
  const { jobs, loading, error } = useJobPostItemList();

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>Error loading jobs: {error}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {jobs.length === 0 ? (
        <div>No jobs available.</div>
      ) : (
        jobs.map((job) => <JobCard key={job.id} data={job} />)
      )}
    </div>
  );
}
