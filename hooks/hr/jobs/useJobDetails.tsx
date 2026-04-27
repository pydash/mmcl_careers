"use client";

import { useState, useEffect } from "react";
import { fetchJobDetails } from "@/services/hr/jobs/jobDetails.service";

export type JobDetails = {
  id: number;
  title: string;
  description: string;
  department?: string | null;
  employment_type: string;
  responsibilities?: string | null;
  requirements?: string | null;
  salary?: string | null;
  expiry_date?: string | null;
  posted_by: string;
  status: string;
  created_at: string;
  application_count: number;
};

export function useJobDetails(jobId: string) {
  const [details, setDetails] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchJobDetails(String(jobId))
      .then((data) => setDetails(data))
      .catch((e: any) => setError(e?.message ?? "Failed to load job"))
      .finally(() => setLoading(false));
  }, [jobId]);

  return { details, loading, error };
}
