import { useEffect, useState } from "react";
import { fetchDashboardResume } from "@/services/applicant/dashboard/resume.service";

export function useResume() {
  const [resume, setResume] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchDashboardResume()
      .then((data) => {
        setResume(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);

  return { resume, loading, error };
}
