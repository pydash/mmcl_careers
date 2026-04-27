"use client";

import { useEffect, useState } from "react";
import { fetchJobApplications } from "@/services/hr/jobs/jobApplications.service";
import { JobApplication } from "@/models/Job";

export function useJobApplications(publicId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchJobApplications(publicId)
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch job applications"),
        );
        setLoading(false);
      });
  }, [publicId]);

  return { applications, loading, error };
}
