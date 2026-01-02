"use client";

import { useState, useEffect } from "react";
import { fetchJobs } from "@/services/applicant/jobs/jobs.service";
import Job from "@/models/Job";

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchJobs()
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
