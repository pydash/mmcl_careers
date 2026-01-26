"use client";

import { Profile } from "@/models/applicant/Profile";
import { fetchProfileGetter } from "@/services/applicant/profile/profileGetter.service";
import { useEffect, useState } from "react";

export function useProfileGetter() {
  const [profile, setProfile] = useState<Profile>();
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
