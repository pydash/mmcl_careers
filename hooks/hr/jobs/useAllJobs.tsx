"use client";

import { useState, useEffect } from "react";
import { fetchAllJobs } from "@/services/hr/jobs/allJobs";

export function useAllJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAllJobs()
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
