"use client";

import { useState, useEffect } from "react";
import { fetchJobDetails } from "@/services/applicant/jobs/jobDetails.service";
import { JobPost } from "@/models/Job";

export function useJobDetails(pub_id: string) {
  const [job, setJob] = useState<JobPost>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pub_id) return;

    setLoading(true);
    fetchJobDetails(pub_id)
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, [pub_id]);
  return { job, loading, error };
}
