"use client";

import { useState, useEffect } from "react";
import { fetchAllApplications } from "@/services/hr/applicants/allApplications";

export function useAllApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAllApplications()
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
