"use client";

import { useState, useEffect } from "react";
import { fetchJobPostItemList } from "@/services/applicant/jobs/jobPostItemList.service";
import { JobPostItemList } from "@/models/job-posts/job-post.list";

export function useJobPostItemList() {
  const [jobs, setJobs] = useState<JobPostItemList[]>([]);
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
