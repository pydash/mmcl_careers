import { useEffect, useState } from "react";
import { getProfile } from "@/services/applicant/profile.service";
import { UserProfileResponse } from "@/types/user";

export function useProfile() {
  const [data, setData] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);

        const result = await getProfile();

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
