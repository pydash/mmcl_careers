"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useJobDetails } from "@/hooks/hr/jobs/useJobDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function JobPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const jobId = params?.id;
  const { jobDetails, loading, error, saving, save } = useJobDetails(jobId);
  const [form, setForm] = useState({
    title: "",
    description: "",
    department: "",
    employment_type: "",
    responsibilities: "",
    requirements: "",
    salary_min: "",
    salary_max: "",
    posted_by: "",
    is_active: true,
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (jobDetails) {
      setForm({
        title: jobDetails.title ?? "",
        description: jobDetails.description ?? "",
        department: jobDetails.department ?? "",
        employment_type: jobDetails.employment_type ?? "",
        responsibilities: jobDetails.responsibilities ?? "",
        requirements: jobDetails.requirements ?? "",
        salary_min: jobDetails.salary_min ?? "",
        salary_max: jobDetails.salary_max ?? "",
        posted_by: jobDetails.posted_by ?? "",
        is_active: jobDetails.is_active,
      });
    }
  }, [jobDetails]);

  const onSave = async () => {
    try {
      await save({
        title: form.title,
        description: form.description,
        department: form.department,
        employment_type: form.employment_type,
        responsibilities: form.responsibilities,
        requirements: form.requirements,
        salary_min: form.salary_min,
        salary_max: form.salary_max,
        is_active: form.is_active,
      });

      setShowSuccessAlert(true);
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      successTimerRef.current = setTimeout(() => {
        setShowSuccessAlert(false);
        router.push("/admin/jobs");
      }, 2000);
    } catch {
      // keep error handling in hook-rendered state
    }
  };

  useEffect(() => {
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  return (
    <main className="container max-w-3xl">
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
          showSuccessAlert ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto mt-4 max-w-md px-4 bg-white">
          <Alert className="border-green-500 bg-green-50 text-green-900">
            <AlertTitle>Saved!</AlertTitle>
            <AlertDescription className="text-green-800">
              Job post updated successfully.
            </AlertDescription>
          </Alert>
        </div>
      </div>
      {loading ? (
        <div className="text-muted-foreground">Loading job details...</div>
      ) : error ? (
        <div className="text-destructive">Error: {error}</div>
      ) : jobDetails ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select
                value={form.department}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, department: value }))
                }
              >
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CAS">CAS</SelectItem>
                  <SelectItem value="MITL">MITL</SelectItem>
                  <SelectItem value="CCIS">CCIS</SelectItem>
                  <SelectItem value="SHS">SHS</SelectItem>
                  <SelectItem value="MIA">MIA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employment_type">Employment Type</Label>
              <Select
                value={form.employment_type}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, employment_type: value }))
                }
              >
                <SelectTrigger id="employment_type">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="salary_min">Salary Min</Label>
              <Input
                id="salary_min"
                type="number"
                value={form.salary_min}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, salary_min: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salary_max">Salary Max</Label>
              <Input
                id="salary_max"
                type="number"
                value={form.salary_max}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, salary_max: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="posted_by">Posted By</Label>
            <Input id="posted_by" value={form.posted_by} disabled />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="is_active"
              checked={form.is_active}
              onCheckedChange={(value) =>
                setForm((prev) => ({ ...prev, is_active: Boolean(value) }))
              }
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={6}
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">Responsibilities</Label>
            <Textarea
              id="responsibilities"
              rows={6}
              value={form.responsibilities}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  responsibilities: e.target.value,
                }))
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea
              id="requirements"
              rows={6}
              value={form.requirements}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, requirements: e.target.value }))
              }
            />
          </div>

          <Separator />

          <div className="flex items-center justify-start gap-2">
            <Button variant="outline" onClick={() => router.back()}>
              Back
            </Button>
            <Button onClick={onSave} disabled={saving}>
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground">Job not found.</div>
      )}
    </main>
  );
}
