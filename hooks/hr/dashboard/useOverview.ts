"use client";

import { useEffect, useState } from "react";
import { fetchOverviewData } from "@/services/hr/dashboard/dashboard.service";

interface DashboardStats {
  total_jobs: number;
  total_applications: number;
  open_jobs: number;
  pending_applications: number;
}

interface PipelineHealth {
  applied_count: number;
  interview_count: number;
  offer_count: number;
}

interface OverviewData {
  stats: DashboardStats;
  pipeline: {
    pipeline_health: PipelineHealth;
  };
  interviews: Array<{
    application_id: string | number;
    status: string;
    name: string;
    scheduled_at: string;
  }>;
  recent_applicants: Array<{
    id: string | number;
    status: string;
    name: string;
    title: string;
    applied_at: string;
  }>;
}

const useOverview = () => {
  const [overviewData, setOverviewData] = useState<OverviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getOverviewData = async () => {
      try {
        const data = await fetchOverviewData();
        setOverviewData(data);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to load overview data"),
        );
      } finally {
        setLoading(false);
      }
    };

    getOverviewData();
  }, []);

  return { overviewData, loading, error };
};

export default useOverview;
