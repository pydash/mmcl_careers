"use client";

import { useState, useEffect } from "react";
import { fetchApplications } from "@/services/applicant/applications/applicationsList.service";
import { Application } from "@/models/Application";

export function useApplicationsList() {
  const [applications, setApplications] = useState<Application[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchApplications()
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
