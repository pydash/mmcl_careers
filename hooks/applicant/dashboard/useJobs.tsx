import { useState, useEffect } from "react";
import { fetchDashboardJobs } from "@/services/applicant/dashboard/jobs.service";
import { JobPost } from "@/models/Job";

export function useJobs() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchDashboardJobs()
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);

  return { jobs, loading, error };
}
