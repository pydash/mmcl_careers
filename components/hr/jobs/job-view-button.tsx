"use client";

import { useState } from "react";
import { useJobDetails } from "@/hooks/hr/jobs/useJobDetails";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function JobViewButton({ jobId }: { jobId: number | string }) {
  const { jobDetails, loading, error } = useJobDetails(jobId);
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" size="sm">
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl sm:max-w-3xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Job Details</DialogTitle>
          <DialogDescription>
            View job information and details.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="rounded-lg border bg-card p-8 text-center">
            <p className="text-muted-foreground">Loading job details...</p>
          </div>
        ) : error ? (
          <div className="rounded-lg border bg-destructive/10 p-4">
            <p className="text-destructive">Error: {error}</p>
          </div>
        ) : jobDetails ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Job Title
                </h3>
                <p className="text-lg font-semibold">{jobDetails.position}</p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Description
                </h3>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {jobDetails.description}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Status
                </h3>
                <Badge variant="secondary">
                  {jobDetails.is_open ? "Open" : "Closed"}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
