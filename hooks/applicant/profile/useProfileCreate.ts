"use client";

import { createProfile } from "@/services/applicant/profile/profile.service";
import { useState } from "react";

export function useProfileCreate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const createUserProfile = async (payload: any) => {
    setLoading(true);
    setError("");
    try {
      const result = await createProfile(payload);
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
      throw err;
    }
  };

  return { createUserProfile, loading, error };
}
