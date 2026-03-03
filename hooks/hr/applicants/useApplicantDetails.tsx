"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchApplicantDetails,
  updateApplicationDetails,
} from "@/services/hr/applicants/applicantDetails";

export type ApplicationDetails = {
  id: number;
  status: string;
  notes: string | null;
};

export function useApplicantDetails(
  applicantId: string | number,
  applicationId: string | number,
) {
  const [applicantDetails, setApplicantDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (applicantId === undefined || applicantId === null) return;
    setLoading(true);
    setError(null);
    fetchApplicantDetails(String(applicantId))
      .then((data) => setApplicantDetails(data))
      .catch((e: any) =>
        setError(e?.message ?? "Failed to load applicant details"),
      )
      .finally(() => setLoading(false));
  }, [applicantId]);

  const save = useCallback(
    async (updates: Partial<ApplicationDetails>) => {
      setSaving(true);
      setError(null);
      try {
        await updateApplicationDetails(String(applicationId), updates);
      } catch (e: any) {
        setError(e?.message ?? "Failed to save applicant details");
        throw e;
      } finally {
        setSaving(false);
      }
    },
    [applicationId],
  );

  return { applicantDetails, loading, error, saving, save };
}
