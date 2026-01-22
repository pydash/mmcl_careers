"use client";

import { useState, useEffect } from "react";
import { fetchJobDetails } from "@/services/applicant/jobs/jobDetails.service";
import { Job } from "@/models/Job";

export function useJobDetails(job_pub_id: string) {
  const [job, setJob] = useState<Job | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!job_pub_id) return;

    setLoading(true);
    fetchJobDetails(job_pub_id)
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, [job_pub_id]);
  return { job, loading, error };
}
