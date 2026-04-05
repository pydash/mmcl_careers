"use client";

import { useState, useEffect } from "react";
import {
  fetchDashboardData,
  DashboardData,
} from "@/services/dashboard.service";

interface UseDashboardDataReturn {
  loading: boolean;
  error: Error | null;
  data: DashboardData | null;
}

export function useDashboardData(): UseDashboardDataReturn {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const dashboardData = await fetchDashboardData();

        if (mounted) {
          setData(dashboardData);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to load dashboard data"),
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    return () => {
      mounted = false;
    };
  }, []);

  return { loading, error, data };
}
