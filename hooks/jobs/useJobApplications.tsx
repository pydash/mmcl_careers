"use client";

import { useEffect, useState } from "react";

interface JobApplication {
  id: number;
  status: string;
  name: string;
  email_address: string;
  mobile_number: string;
  applied_at: string;
}

export default function useJobApplications(publicId: string) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      if (!publicId) {
        setApplications([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/jobs/${encodeURIComponent(publicId)}/applications`,
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch applications: ${response.status}`);
        }

        const data = await response.json();
        setApplications(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch applications"),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [publicId]);

  return {
    applications,
    loading,
    error,
  };
}
