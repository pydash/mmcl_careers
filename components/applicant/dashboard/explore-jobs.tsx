import { Badge } from "@/components/ui/badge";
import IntextEmpty from "@/components/intext-empty";
import { useJobs } from "@/hooks/applicant/dashboard/useJobs";
import { getDate } from "@/utils/formatDate";
import Link from "next/link";
import { toTitleCase } from "@/utils/formatText";

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
        <div className="grid grid-cols-2 gap-4">
          {jobs.map((job, index) => (
            <Link
              key={index}
              href={`/applicant/jobs/${job.public_id}`}
              className="p-4 border rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Badge
                variant="default"
                className="mb-2 bg-blue-100 text-blue-700 hover:bg-blue-600"
              >
                {job.department}
              </Badge>
              <div className="flex justify-between items-start">
                <h2 className="text-sm font-medium truncate">
                  {toTitleCase(job.position)}
                </h2>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Apply until {getDate(job.expiration_date.toString())}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
