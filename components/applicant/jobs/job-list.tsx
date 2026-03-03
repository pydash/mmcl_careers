import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { JobListProps } from "@/models/Job";
import { toTitleCase } from "@/utils/formatText";

export default function JobList({ jobs }: JobListProps) {
  return (
    <div className="flex flex-col gap-4">
      {jobs.length === 0 ? (
        <div>No jobs available.</div>
      ) : (
        jobs.map((job) => {
          const hasApplied = job.has_applied;
          const href = hasApplied
            ? `/applicant/applications/${job.app_id}`
            : `/applicant/jobs/${job.public_id}`;
          return (
            <Link
              key={job.public_id}
              href={href}
              className="w-full border border-gray-200 p-6 transition-colors block hover:border-gray-400 cursor-pointer"
            >
              <div className="flex flex-wrap gap-2 mb-3 items-center">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  {job.department}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 capitalize">
                  {job.employment_type}
                </Badge>
                {hasApplied && (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    Applied
                  </Badge>
                )}
              </div>
              <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {toTitleCase(job.position)}
                </h3>
              </div>
              <Separator className="my-2" />
              <div className="text-sm text-muted-foreground">
                <p>
                  Apply until:{" "}
                  {new Date(job.expiration_date).toLocaleDateString()}
                </p>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
}
