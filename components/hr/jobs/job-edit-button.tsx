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

export function JobEditButton({ jobId }: { jobId: number | string }) {
  const { jobDetails, loading, error, saving, save } = useJobDetails(jobId);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    position: "",
    description: "",
    is_open: true,
  });

  useEffect(() => {
    if (jobDetails) {
      setForm({
        position: jobDetails.position ?? "",
        description: jobDetails.description ?? "",
        is_open: jobDetails.is_open,
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
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl sm:max-w-3xl lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Job</DialogTitle>
          <DialogDescription>
            Update job information and save your changes.
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
              <div className="space-y-2">
                <Label htmlFor={`title-${jobDetails.id}`}>Job Title</Label>
                <Input
                  id={`title-${jobDetails.id}`}
                  value={form.position}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, position: e.target.value }))
                  }
                  placeholder="Enter job title"
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
                  placeholder="Enter job description"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id={`active-${jobDetails.id}`}
                  checked={form.is_open}
                  onCheckedChange={(v: boolean) =>
                    setForm((f) => ({ ...f, is_open: Boolean(v) }))
                  }
                />
                <Label htmlFor={`active-${jobDetails.id}`}>Active</Label>
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={onSave} disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
