import { useEffect, useState } from "react";
import { getDashboard } from "@/services/applicant/dashboard.service";
import type { ApplicantDashboardResponse } from "@/types/dashboard";

export function useDashboard() {
  const [data, setData] = useState<ApplicantDashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const result = await getDashboard();

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
