"use client";

import { Applicant } from "@/models/User";
import { fetchProfileGetter } from "@/services/applicant/profile/profile.service";
import { useEffect, useState } from "react";

export function useProfile() {
  const [profile, setProfile] = useState<Applicant>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetchProfileGetter()
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);
  return { profile, loading, error };
}
