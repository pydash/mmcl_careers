"use client";

import { useState, useEffect } from "react";
import { fetchJobPostItemList } from "@/services/applicant/jobs/jobPostItemList.service";
import { JobPostApplication } from "@/models/Job";

export function useJobPostItemList() {
  const [jobs, setJobs] = useState<JobPostApplication[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchJobPostItemList()
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
