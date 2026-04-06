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
    department: "",
    employment_type: "",
    description: "",
    responsibilities: "",
    requirements: "",
    salary_min: "",
    salary_max: "",
    posted_by: "",
    created_at: "",
    is_active: true,
  });

  useEffect(() => {
    if (jobDetails) {
      setForm({
        title: jobDetails.title ?? "",
        department: jobDetails.department ?? "",
        employment_type: jobDetails.employment_type ?? "",
        description: jobDetails.description ?? "",
        responsibilities: jobDetails.responsibilities ?? "",
        requirements: jobDetails.requirements ?? "",
        salary_min: jobDetails.salary_min ?? "",
        salary_max: jobDetails.salary_max ?? "",
        posted_by: jobDetails.posted_by ?? "",
        created_at: jobDetails.created_at ?? "",
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
      <DialogContent className="max-w-[92vw] sm:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto">
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
            <div className="grid gap-2 rounded-lg border bg-muted/30 p-3 sm:grid-cols-2 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Title</p>
                <p className="font-medium wrap-break-word">
                  {jobDetails.title}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Department</p>
                <p className="font-medium capitalize wrap-break-word">
                  {jobDetails.department}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Employment Type</p>
                <p className="font-medium capitalize wrap-break-word">
                  {jobDetails.employment_type}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active</p>
                <p className="font-medium">
                  {jobDetails.is_active ? "Yes" : "No"}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">Description</p>
                <p className="font-medium wrap-break-word leading-relaxed">
                  {jobDetails.description}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">
                  Responsibilities
                </p>
                <p className="font-medium wrap-break-word leading-relaxed">
                  {jobDetails.responsibilities}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-muted-foreground">Requirements</p>
                <p className="font-medium wrap-break-word leading-relaxed">
                  {jobDetails.requirements}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Salary Min</p>
                <p className="font-medium">{jobDetails.salary_min ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Salary Max</p>
                <p className="font-medium">{jobDetails.salary_max ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Posted By</p>
                <p className="font-medium">{jobDetails.posted_by ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Created At</p>
                <p className="font-medium">{jobDetails.created_at}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                <Label htmlFor={`dept-${jobDetails.id}`}>Department</Label>
                <Input
                  id={`dept-${jobDetails.id}`}
                  value={form.department}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, department: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`type-${jobDetails.id}`}>Employment Type</Label>
                <Input
                  id={`type-${jobDetails.id}`}
                  value={form.employment_type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, employment_type: e.target.value }))
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
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`resp-${jobDetails.id}`}>
                  Responsibilities
                </Label>
                <Input
                  id={`resp-${jobDetails.id}`}
                  value={form.responsibilities}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, responsibilities: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`req-${jobDetails.id}`}>Requirements</Label>
                <Input
                  id={`req-${jobDetails.id}`}
                  value={form.requirements}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, requirements: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`salary-min-${jobDetails.id}`}>
                  Salary Min
                </Label>
                <Input
                  id={`salary-min-${jobDetails.id}`}
                  value={form.salary_min}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, salary_min: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`salary-max-${jobDetails.id}`}>
                  Salary Max
                </Label>
                <Input
                  id={`salary-max-${jobDetails.id}`}
                  value={form.salary_max}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, salary_max: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor={`posted-${jobDetails.id}`}>Posted By</Label>
                <Input
                  id={`posted-${jobDetails.id}`}
                  value={form.posted_by}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, posted_by: e.target.value }))
                  }
                />
              </div>
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
