import { useState, useEffect } from "react";
import { fetchDashboardRecentApplications } from "@/services/applicant/dashboard/recent-applications.service";
import Application from "@/models/Application";

export function useRecentApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
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
