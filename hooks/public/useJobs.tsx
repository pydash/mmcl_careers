"use client";

import { useEffect, useState } from "react";
import { getJobs } from "@/services/public/jobs.service";
import type { PublicJobs } from "@/types/job";

export function useJobs() {
  const [jobs, setJobs] = useState<PublicJobs[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);

        const result = await getJobs();

        setJobs(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  return { jobs, loading, error };
}
