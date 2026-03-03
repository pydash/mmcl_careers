"use client";

import { useState, useEffect } from "react";
import { DashboardStats } from "@/models/DashboardStats";

export function useStats() {
  const [stats, setStats] = useState<DashboardStats>();
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setIsLoading(true);
        const response = await fetch("/api/hr/stats");

        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading, error };
}
