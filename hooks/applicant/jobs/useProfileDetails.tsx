"use client";

import { useState, useEffect } from "react";
import { fetchProfileDetails } from "@/services/applicant/jobs/profileDetails.service";
import { Profile, ProfileResponse } from "@/models/applicant/Profile";

export function useProfileDetails() {
  const [profile, setProfile] = useState<Profile>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProfileDetails()
      .then((data: any) => {
        console.log("Profile data received:", data);
        // The API returns an array of ProfileResponse objects
        if (Array.isArray(data) && data.length > 0 && data[0]?.profile) {
          console.log("Setting profile:", data[0].profile);
          setProfile(data[0].profile);
        } else {
          console.log("No profile data found in response");
        }
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
