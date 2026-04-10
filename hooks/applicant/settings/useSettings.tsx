"use client";

import { useEffect, useState } from "react";
import { fetchSettings } from "@/services/applicant/settings/settings.service";

export function useSettings() {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetchSettings()
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.message || "An error occurred");
        setLoading(false);
      });
  }, []);

  return { settings, loading, error };
}
