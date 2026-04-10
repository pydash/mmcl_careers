"use client";

import { fetchProfileCreate } from "@/services/applicant/profile/profileCreate.service";
import { useState } from "react";

export function useProfileCreate() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const createProfile = async (payload: any) => {
    setLoading(true);
    setError("");
    try {
      const result = await fetchProfileCreate(payload);
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
      throw err;
    }
  };

  return { createProfile, loading, error };
}
