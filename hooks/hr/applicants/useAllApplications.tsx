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
        // Ensure we have an array
        if (Array.isArray(data)) {
          setApplications(data);
        } else if (data?.error) {
          setError(data.error);
          setApplications([]);
        } else {
          setApplications([]);
        }
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setApplications([]);
        setLoading(false);
      });
  }, []);

  return { applications, loading, error };
}
