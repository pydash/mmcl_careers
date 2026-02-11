"use client";

import { useEffect, useState } from "react";
import { fetchAnalytics } from "@/services/admin/analytics/analytics.service";

export interface AdminAnalytics {
  totalApplications: {
    this_month: number;
    last_month: number;
    percentage_change: number | null;
  } | null;
  totalHires: {
    this_month: number;
    last_month: number;
    absolute_change: number;
    percentage_change: number | null;
  } | null;
  totalOpenPositions: {
    this_month: number;
    last_month: number;
    absolute_change: number;
    percentage_change: number | null;
  } | null;
  offerAcceptanceRate: {
    accepted: number;
    rejected: number;
    acceptance_rate: number | null;
  } | null;
  applicationTrend: {
    month: string;
    applications: number;
    hired: number;
  }[];
  applicationsByDepartment: {
    name: string;
    value: number;
    color: string;
  }[];
}

export function useAnalytics() {
  const [analytics, setAnalytics] = useState<AdminAnalytics | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAnalytics()
      .then((data) => {
        const toNumber = (value: unknown) =>
          value == null || value === "" ? null : Number(value);

        const normalized: AdminAnalytics = {
          totalApplications: data?.totalApplications
            ? {
                this_month: Number(data.totalApplications.this_month ?? 0),
                last_month: Number(data.totalApplications.last_month ?? 0),
                percentage_change: toNumber(
                  data.totalApplications.percentage_change,
                ),
              }
            : null,
          totalHires: data?.totalHires
            ? {
                this_month: Number(data.totalHires.this_month ?? 0),
                last_month: Number(data.totalHires.last_month ?? 0),
                absolute_change: Number(data.totalHires.absolute_change ?? 0),
                percentage_change: toNumber(data.totalHires.percentage_change),
              }
            : null,
          totalOpenPositions: data?.totalOpenPositions
            ? {
                this_month: Number(data.totalOpenPositions.this_month ?? 0),
                last_month: Number(data.totalOpenPositions.last_month ?? 0),
                absolute_change: Number(
                  data.totalOpenPositions.absolute_change ?? 0,
                ),
                percentage_change: toNumber(
                  data.totalOpenPositions.percentage_change,
                ),
              }
            : null,
          offerAcceptanceRate: data?.offerAcceptanceRate
            ? {
                accepted: Number(data.offerAcceptanceRate.accepted ?? 0),
                rejected: Number(data.offerAcceptanceRate.rejected ?? 0),
                acceptance_rate: toNumber(
                  data.offerAcceptanceRate.acceptance_rate,
                ),
              }
            : null,
          applicationTrend: Array.isArray(data?.applicationTrend)
            ? data.applicationTrend.map((item: any) => ({
                month: item.month,
                applications: Number(item.applications ?? 0),
                hired: Number(item.hired ?? 0),
              }))
            : [],
          applicationsByDepartment: Array.isArray(
            data?.applicationsByDepartment,
          )
            ? data.applicationsByDepartment.map((item: any, index: number) => {
                const colors = [
                  "#3b82f6",
                  "#ef4444",
                  "#10b981",
                  "#f59e0b",
                  "#8b5cf6",
                  "#ec4899",
                  "#14b8a6",
                  "#f97316",
                ];
                return {
                  name: item.name || "Unknown",
                  value: Number(item.value ?? 0),
                  color: colors[index % colors.length],
                };
              })
            : [],
        };

        setAnalytics(normalized);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);

  return { analytics, loading, error };
}
