"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

interface StatData {
  count: string;
  delta: string;
}

interface StatsResponse {
  open_roles: StatData;
  new_applicants: StatData;
  interviews_scheduled: StatData;
  offers_made: StatData;
}

export default function Stats() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/hr/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data?.stats ?? data);
      } catch (err: any) {
        setError(err?.message || "Failed to load statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-card p-4 shadow-sm animate-pulse"
          >
            <div className="h-4 w-20 bg-muted rounded mb-2"></div>
            <div className="h-8 w-12 bg-muted rounded"></div>
          </div>
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <section className="rounded-lg border bg-red-50 p-4">
        <p className="text-sm text-red-600">{error}</p>
      </section>
    );
  }

  if (
    !stats ||
    !stats.open_roles ||
    !stats.new_applicants ||
    !stats.interviews_scheduled ||
    !stats.offers_made
  ) {
    return null;
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">Open roles</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-semibold">
            {stats.open_roles.count}
          </span>
          <Badge variant="secondary">
            {stats.open_roles.delta} vs last week
          </Badge>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">Active applicants</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-semibold">
            {stats.new_applicants.count}
          </span>
          <Badge variant="secondary">{stats.new_applicants.delta} today</Badge>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">Interviews scheduled</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-semibold">
            {stats.interviews_scheduled.count}
          </span>
          <Badge variant="secondary">
            {stats.interviews_scheduled.delta} today
          </Badge>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <p className="text-sm text-muted-foreground">Offers out</p>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-semibold">
            {stats.offers_made.count}
          </span>
          <Badge variant="secondary">
            {stats.offers_made.delta} waiting for response
          </Badge>
        </div>
      </div>
    </section>
  );
}
