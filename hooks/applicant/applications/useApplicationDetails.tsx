"use client";

import { useState, useEffect } from "react";
import { fetchApplicationDetails } from "@/services/applicant/applications/applicationDetails.service";
import { ApplicationDetails } from "@/models/Application";

export function useApplicationDetails(app_id: string) {
  const [application, setApplication] = useState<ApplicationDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchApplicationDetails(app_id)
      .then((data) => {
        setApplication(data.application_details);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, [app_id]);
  return { application, loading, error };
}
