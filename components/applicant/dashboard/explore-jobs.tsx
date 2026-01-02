import Job from "@/models/Job";
import IntextEmpty from "@/components/intext-empty";
import { useJobs } from "@/hooks/applicant/dashboard/useJobs";
import { getDate } from "@/utils/formatDate";

export default function ExploreJobs() {
  const { jobs, loading, error } = useJobs();
  if (loading) return <p className="p-4">Loading jobs...</p>;
  if (error) return <p className="p-4">Error loading jobs: {error}</p>;
  return (
    <div className="p-4 rounded-xl bg-gray-50">
      <h1 className="text-xl font-semibold mb-4">Explore Jobs</h1>
      {jobs.length === 0 ? (
        <IntextEmpty message="No jobs available at the moment." />
      ) : (
        jobs.map((job) => (
          <div
            key={job.id}
            className="mb-4 p-4 border rounded-lg hover:bg-gray-100"
          >
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-sm text-muted-foreground">
              Valid until {getDate(job.expiry_date)}
            </p>
            <p className="mt-2">{job.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
