"use client";

import { useState, useEffect } from "react";
import { getJobs } from "@/services/applicant/jobs.service";
import type { ApplicantJobs } from "@/types/job";

type UseJobsProps = {
  search: string;
  department: string;
  status: string;
  page: number;
  limit?: number;
};

type JobsResponse = {
  jobs: ApplicantJobs[];
  total: number;
  totalPages: number;
  page: number;
};

export function useJobs({
  search,
  department,
  status,
  page,
  limit = 8,
}: UseJobsProps) {
  const [data, setData] = useState<JobsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadJobs() {
      try {
        setLoading(true);

        const result: JobsResponse = await getJobs({
          search,
          department,
          status,
          page,
          limit,
        });

        setData(result);
        setTotal(result.total);
        setTotalPages(result.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, [search, department, status, page, limit]);

  return {
    data,
    loading,
    error,
    total,
    totalPages,
  };
}
