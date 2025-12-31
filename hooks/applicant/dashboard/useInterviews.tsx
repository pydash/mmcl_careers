import { useState, useEffect } from "react";
import { fetchDashboardInterviews } from "@/services/applicant/dashboard/interview.service";
import Interview from "@/models/Interview";

export function useInterviews() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchDashboardInterviews()
      .then((data) => {
        setInterviews(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);

  return { interviews, loading, error };
}
