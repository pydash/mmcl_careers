"use client";

import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface StatData {
  count: string;
  delta: string;
}

interface StatsResponse {
  stats?: {
    open_roles?: StatData;
    new_applicants?: StatData;
    interviews_scheduled?: StatData;
    offers_made?: StatData;
  };
  pipeline_health?: {
    applied?: string;
    interview?: string;
    offer?: string;
  };
}

export default function AnalyticsPage() {
  const [data, setData] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch("/api/hr/stats", { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to fetch analytics");
        }
        const json = await response.json();
        setData(json);
      } catch (err: any) {
        setError(err?.message || "Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const metrics = useMemo(() => {
    const stats = data?.stats;
    return [
      {
        label: "Open roles",
        value: stats?.open_roles?.count ?? "0",
        helper: `${stats?.open_roles?.delta ?? "0"} vs last period`,
      },
      {
        label: "Active applicants",
        value: stats?.new_applicants?.count ?? "0",
        helper: `${stats?.new_applicants?.delta ?? "0"} vs last period`,
      },
      {
        label: "Interviews scheduled",
        value: stats?.interviews_scheduled?.count ?? "0",
        helper: `${stats?.interviews_scheduled?.delta ?? "0"} vs last period`,
      },
      {
        label: "Offers out",
        value: stats?.offers_made?.count ?? "0",
        helper: `${stats?.offers_made?.delta ?? "0"} vs last period`,
      },
    ];
  }, [data]);

  const funnel = useMemo(() => {
    const applied = Number(data?.pipeline_health?.applied ?? 0);
    const interview = Number(data?.pipeline_health?.interview ?? 0);
    const offer = Number(data?.pipeline_health?.offer ?? 0);
    const total = applied + interview + offer;

    if (total === 0) {
      return [
        { stage: "Applied", percent: 0, helper: "No data" },
        { stage: "Interview", percent: 0, helper: "No data" },
        { stage: "Offer", percent: 0, helper: "No data" },
      ];
    }

    return [
      {
        stage: "Applied",
        percent: Math.round((applied / total) * 100),
        helper: `${applied} applicants`,
      },
      {
        stage: "Interview",
        percent: Math.round((interview / total) * 100),
        helper: `${interview} applicants`,
      },
      {
        stage: "Offer",
        percent: Math.round((offer / total) * 100),
        helper: `${offer} applicants`,
      },
    ];
  }, [data]);

  const handleDownloadReport = () => {
    const reportDate = new Date().toISOString().split("T")[0];

    const lines = [
      ["MMCL Careers - HR Analytics Report"],
      [`Generated on`, reportDate],
      [],
      ["Metrics"],
      ["Label", "Value", "Helper"],
      ...metrics.map((metric) => [metric.label, metric.value, metric.helper]),
      [],
      ["Pipeline health"],
      ["Stage", "Percent", "Details"],
      ...funnel.map((item) => [item.stage, `${item.percent}%`, item.helper]),
    ];

    const csvContent = lines
      .map((row) =>
        row
          .map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `hr-analytics-report-${reportDate}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Hiring performance</p>
          <h2 className="text-xl font-semibold">Analytics</h2>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleDownloadReport} disabled={loading}>
            Download report
          </Button>
        </div>
      </div>

      {error && (
        <section className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </section>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {(loading ? [...Array(4)] : metrics).map((metric: any, i) => (
          <div
            key={metric?.label ?? i}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            {loading ? (
              <>
                <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="mt-2 h-8 w-16 animate-pulse rounded bg-muted" />
                <div className="mt-2 h-4 w-32 animate-pulse rounded bg-muted" />
              </>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <div className="mt-2 text-3xl font-semibold">
                  {metric.value}
                </div>
                <p className="text-sm text-muted-foreground">{metric.helper}</p>
              </>
            )}
          </div>
        ))}
      </section>

      <section className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Conversion</p>
            <h3 className="text-lg font-semibold">Pipeline health</h3>
          </div>
          <Badge variant="secondary">Live</Badge>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          {(loading ? [] : funnel).map((item) => (
            <div key={item.stage} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>{item.stage}</span>
                <span className="text-muted-foreground">
                  {item.percent}% · {item.helper}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
          {loading && (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-6 animate-pulse rounded bg-muted" />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
