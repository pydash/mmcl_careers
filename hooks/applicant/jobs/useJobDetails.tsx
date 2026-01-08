"use client";

import { useState, useEffect } from "react";
import { fetchJobDetails } from "@/services/applicant/jobs/jobDetails.service";
import { JobPostItemDetail } from "@/models/job-posts/job-post.detail";

export function useJobDetails(jobId: string) {
  const [job, setJob] = useState<JobPostItemDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!jobId) return;

    setLoading(true);
    fetchJobDetails(jobId)
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, [jobId]);

  return { job, loading, error };
}
