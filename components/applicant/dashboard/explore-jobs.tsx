import { use, useState } from "react";

import Job from "@/models/Job";
import IntextEmpty from "@/components/intext-empty";

export default function ExploreJobs() {
  const [jobs, setJobs] = useState<Job[]>([]); // Placeholder for fetched jobs data
  return (
    <div className="p-4 roundex-xl bg-gray-50">
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
              Posted on {job.postedDate}
            </p>
            <p className="mt-2">{job.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
