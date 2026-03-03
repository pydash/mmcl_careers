"use client";

import { useState, useEffect } from "react";
import { fetchProfileDetails } from "@/services/applicant/jobs/profileDetails.service";
import { Applicant } from "@/models/User";

export function useProfileDetails() {
  const [profile, setProfile] = useState<Applicant>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProfileDetails()
      .then((data: any) => {
        setProfile(data[0].applicant);
        setLoading(false);
      })
      .catch((err: any) => {
        console.error("Error fetching profile:", err);
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);

  return { profile, loading, error };
}
