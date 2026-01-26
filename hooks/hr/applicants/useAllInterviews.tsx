"use client";

import { useState, useEffect } from "react";
import { fetchAllInterviews } from "@/services/hr/applicants/allInterviews";

export function useAllInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAllInterviews()
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
