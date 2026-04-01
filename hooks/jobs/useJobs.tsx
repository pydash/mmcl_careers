"use client";

import { useState, useEffect } from "react";
import { Job } from "@/models/job";
import { JobsService } from "@/services/jobs.service";

interface UseJobsReturn {
  loading: boolean;
  error: Error | null;
  jobs: Job[];
}

export default function useJobs(): UseJobsReturn {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await JobsService.getAllJobs();
        setJobs(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch jobs"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return {
    loading,
    error,
    jobs,
  };
}
