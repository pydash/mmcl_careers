"use client";

import { useState, useEffect } from "react";
import { Job } from "@/models/job";
import { JobsService } from "@/services/jobs.service";

export default function useJobDetails(id: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await JobsService.getJobById(id);
        setJob(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch job details"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  return {
    loading,
    error,
    job,
  };
}
