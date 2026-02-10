"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchJobDetails,
  updateJobDetails,
} from "@/services/hr/jobs/jobDetails.service";

export type JobDetails = {
  id: number;
  title: string;
  description: string | null;
  department?: string | null;
  employment_type?: string | null;
  responsibilities?: string | null;
  requirements?: string | null;
  salary_min?: string | null;
  salary_max?: string | null;
  posted_by?: string | null;
  is_active: boolean;
  created_at: string;
};

export function useJobDetails(jobId: string | number) {
  const [jobDetails, setJobDetails] = useState<JobDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (jobId === undefined || jobId === null) return;
    setLoading(true);
    setError(null);
    fetchJobDetails(String(jobId))
      .then((data) => setJobDetails(data))
      .catch((e: any) => setError(e?.message ?? "Failed to load job"))
      .finally(() => setLoading(false));
  }, [jobId]);

  const save = useCallback(
    async (updates: Partial<JobDetails>) => {
      setSaving(true);
      setError(null);
      try {
        const updated = await updateJobDetails(String(jobId), updates);
        setJobDetails(updated);
        return updated;
      } catch (e: any) {
        setError(e?.message ?? "Failed to save job");
        throw e;
      } finally {
        setSaving(false);
      }
    },
    [jobId],
  );

  return { jobDetails, loading, error, saving, save };
}
