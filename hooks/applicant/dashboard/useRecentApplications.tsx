import { useState, useEffect } from "react";
import { fetchDashboardRecentApplications } from "@/services/applicant/dashboard/recentApplications.service";
import { DashboardRecentApplication } from "@/models/Application";

export function useRecentApplications() {
  const [applications, setApplications] = useState<
    DashboardRecentApplication[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchDashboardRecentApplications()
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);

  return { applications, loading, error };
}
