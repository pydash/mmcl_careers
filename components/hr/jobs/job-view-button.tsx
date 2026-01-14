"use client";

import { useEffect, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export function JobViewButton({ jobId }: { jobId: number | string }) {
  const { jobDetails, loading, error, saving, save } = useJobDetails(jobId);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    is_active: true,
  });

  useEffect(() => {
    if (jobDetails) {
      setForm({
        title: jobDetails.title ?? "",
        description: jobDetails.description ?? "",
        is_active: jobDetails.is_active,
      });
    }
  }, [jobDetails, open]);

  const onSave = async () => {
    await save(form);
    setOpen(false);
  };

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
            Edit the job and save your changes.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="text-muted-foreground">Loading…</div>
        ) : error ? (
          <div className="text-destructive">Error: {error}</div>
        ) : jobDetails ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`title-${jobDetails.id}`}>Title</Label>
              <Input
                id={`title-${jobDetails.id}`}
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`desc-${jobDetails.id}`}>Description</Label>
              <Input
                id={`desc-${jobDetails.id}`}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id={`active-${jobDetails.id}`}
                checked={form.is_active}
                onCheckedChange={(v: boolean) =>
                  setForm((f) => ({ ...f, is_active: Boolean(v) }))
                }
              />
              <Label htmlFor={`active-${jobDetails.id}`}>Active</Label>
            </div>
            <Separator />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={onSave} disabled={saving}>
                {saving ? "Saving…" : "Save changes"}
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
