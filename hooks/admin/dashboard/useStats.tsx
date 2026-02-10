"use client";

import { useEffect, useState } from "react";
import { fetchStats } from "@/services/admin/dashboard/stats.service";
import { DashboardStats } from "@/models/admin/DashboardStats";

export function useStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    setLoading(true);
    fetchStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);
  return { stats, loading, error };
}
