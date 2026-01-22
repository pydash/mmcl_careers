"use client";

import { useState, useEffect } from "react";
import { fetchApplicationDetails } from "@/services/applicant/applications/applicationDetails.service";
import { Application } from "@/models/Application";

export function useApplicationDetails(pub_id: string) {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchApplicationDetails(pub_id)
      .then((data) => {
        setApplication(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, [pub_id]);
  return { application, loading, error };
}
