"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toTitleCase } from "@/utils/formatText";

interface InterviewResponse {
  id: string;
  scheduled_at: string;
  position: string;
  applicant_name: string;
}

export default function UpcomingInterviews() {
  const [interviews, setInterviews] = useState<InterviewResponse[] | null>(
    null,
  );
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
        setInterviews(data?.upcoming_interviews?.interviews || []);
      } catch (err: any) {
        setError(err?.message || "Failed to load upcoming interviews");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const interviewsList = interviews || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <p className="text-sm text-destructive">{error}</p>
      </div>
    );
  }
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Upcoming interviews</p>
          <h3 className="text-lg font-semibold">Today</h3>
        </div>
        <Button size="sm" variant="default">
          Schedule
        </Button>
      </div>
      <Separator className="my-4" />
      <ul className="space-y-3">
        {interviewsList.map((interview) => (
          <li
            key={interview.id}
            className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">
                  {new Date(interview.scheduled_at).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {interview.applicant_name}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {toTitleCase(interview.position)}
              </p>
            </div>
            <Button size="sm" variant="ghost">
              Details
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
