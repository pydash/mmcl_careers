"use client";

import { createJobApplication } from "@/services/applicant/jobs.service";
import { useState } from "react";

export function useApplyJob(id: string) {
  const [pitch, setPitch] = useState<string>("");
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  const submitApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;

    try {
      setLoading(true);
      await createJobApplication(id, { pitch: pitch });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Someting went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    pitch,
    setPitch,
    confirmed,
    setConfirmed,
    loading,
    error,
    submitApplication,
  };
}
