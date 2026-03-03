"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface PipelineResponse {
  applied: string;
  interview: string;
  offer: string;
}

export default function PipelineHealth() {
  const [pipeline, setPipeline] = useState<PipelineResponse | null>(null);
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
        setPipeline(data?.pipeline_health ?? null);
      } catch (err: any) {
        setError(err?.message || "Failed to load pipeline data");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm animate-pulse">
        <div className="h-4 w-32 bg-muted rounded mb-4"></div>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-24 bg-muted rounded"></div>
            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: "50%" }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-red-50 p-4">
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (!pipeline) {
    return null;
  }

  const appliedCount = Number(pipeline.applied || 0);
  const interviewCount = Number(pipeline.interview || 0);
  const offerCount = Number(pipeline.offer || 0);
  const total = appliedCount + interviewCount + offerCount;

  const appliedPercent = total > 0 ? (appliedCount / total) * 100 : 0;
  const interviewPercent = total > 0 ? (interviewCount / total) * 100 : 0;
  const offerPercent = total > 0 ? (offerCount / total) * 100 : 0;

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Pipeline health</p>
          <h3 className="text-lg font-semibold">Last 7 Days</h3>
        </div>
        <Button size="sm" variant="outline">
          Export
        </Button>
      </div>
      <Separator className="my-4" />
      <div className="space-y-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Applied</span>
            <span className="text-muted-foreground">{appliedCount}</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${appliedPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Interview</span>
            <span className="text-muted-foreground">{interviewCount}</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${interviewPercent}%` }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Offer</span>
            <span className="text-muted-foreground">{offerCount}</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary"
              style={{ width: `${offerPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
