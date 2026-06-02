"use client";

import { useEffect, useState } from "react";
import { getJob } from "@/services/public/job.service";
import type { PublicJob } from "@/types/job";

export function useJob(id: string) {
  const [data, setData] = useState<PublicJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadJob() {
      try {
        setLoading(true);

        const result = await getJob(id);

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, []);

  return { data, loading, error };
}
