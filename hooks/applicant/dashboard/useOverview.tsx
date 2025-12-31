import { useState, useEffect } from "react";
import { fetchDashboardOverview } from "@/services/applicant/dashboard/overview.service";

export function useOverview() {
  const [overview, setOverview] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchDashboardOverview()
      .then((data) => {
        setOverview(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);

  return { overview, loading, error };
}
