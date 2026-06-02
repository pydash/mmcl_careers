"use client";

import { useEffect, useState } from "react";

import type { ApplicantJob } from "@/types/job";
import { getJob } from "@/services/applicant/jobs/job.service";

export function useJob(id: string) {
  const [job, setJob] = useState<ApplicantJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJob() {
      try {
        setLoading(true);

        const result = await getJob(id);

        setJob(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, []);

  return {
    job,
    loading,
    error,
  };
}
