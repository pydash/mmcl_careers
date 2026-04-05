"use client";

import { useState, useEffect } from "react";
import { fetchDashboardOverview } from "@/services/applicant/dashboard/overview.service";

interface ApplicantOverview {
  total_applications: number;
  pending_applications: number;
  upcoming_interviews: number;
}

export function useOverview() {
  const [overview, setOverview] = useState<ApplicantOverview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchDashboardOverview()
      .then((data: ApplicantOverview) => {
        setOverview(data);
        setLoading(false);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        setLoading(false);
      });
  }, []);

  return { overview, loading, error };
}
