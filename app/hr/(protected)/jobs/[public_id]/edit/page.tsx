"use client";

// -------------------- Imports --------------------
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

// UI components
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Hooks & services
import { useJobDetails } from "@/hooks/hr/jobs/useJobDetails";
import { editJobDetails } from "@/services/hr/jobs/editJobDetails.service";

// Helpers
import { getYYYYMMDD } from "@/lib/datetime.helpers";

// -------------------- Types --------------------
type JobFormState = {
  title: string;
  department: string;
  employment_type: string;
  teaching_type: string;
  salary: string;
  expiry_date: string;
  status: string;
  description: string;
  responsibilities: string;
  requirements: string;
};

// -------------------- Initial State --------------------
const initialState: JobFormState = {
  title: "",
  department: "",
  employment_type: "",
  teaching_type: "",
  salary: "",
  expiry_date: "",
  status: "",
  description: "",
  responsibilities: "",
  requirements: "",
};

// -------------------- Component --------------------
export default function EditJobPage() {
  const { public_id } = useParams<{ public_id: string }>();
  const router = useRouter();

  const { details, loading } = useJobDetails(public_id);

  const [formData, setFormData] = useState<JobFormState>(initialState);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // -------------------- Generic Handlers --------------------

  // Handles input & textarea changes
  const handleChange =
    (field: keyof JobFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  // Handles select changes
  const handleSelectChange = (field: keyof JobFormState) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // -------------------- Submit --------------------
  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        salary: formData.salary ? Number(formData.salary) : null,
        expiry_date: formData.expiry_date
          ? new Date(formData.expiry_date).toISOString()
          : null,
      };

      const result = await editJobDetails(public_id, payload);

      if (result) {
        setSuccessMessage("Job updated successfully!");

        // Auto hide alert
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2500);

        // Redirect after a bit longer
        setTimeout(() => {
          router.push(`/hr/jobs/${public_id}`);
        }, 3000);
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  // -------------------- Populate Form --------------------
  useEffect(() => {
    if (!details) return;

    setFormData({
      title: details.title ?? "",
      department: details.department ?? "",
      employment_type: details.employment_type ?? "",
      teaching_type: details.teaching_type ?? "",
      salary:
        details.salary === null || details.salary === undefined
          ? ""
          : String(details.salary),
      expiry_date: getYYYYMMDD(details.expiry_date) ?? "",
      status: details.status ?? "",
      description: details.description ?? "",
      responsibilities: details.responsibilities ?? "",
      requirements: details.requirements ?? "",
    });
  }, [details]);

  // -------------------- Render --------------------
  return (
    <main className="p-2">
      {/* Success Alert */}
      <div
        className={`transition-all duration-300 ${
          successMessage
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"
        }`}
      >
        {successMessage && (
          <div className="rounded-none border border-green-500 bg-green-50 px-4 py-2 text-sm text-green-700 shadow-none">
            {successMessage}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Back */}
        <Link
          href={`/hr/jobs/${public_id}`}
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <h1 className="text-lg font-semibold">Edit Job</h1>

        <Separator />

        <form onSubmit={(e) => e.preventDefault()}>
          {/* Grid fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Field className="col-span-2">
              <FieldLabel>Position</FieldLabel>
              <Input
                className="rounded-none shadow-none"
                value={formData.title}
                onChange={handleChange("title")}
              />
            </Field>

            <Field>
              <FieldLabel>Department</FieldLabel>
              <Input
                className="rounded-none shadow-none"
                value={formData.department}
                onChange={handleChange("department")}
              />
            </Field>

            <Field>
              <FieldLabel>Employment Type</FieldLabel>
              <Select
                value={formData.employment_type}
                onValueChange={handleSelectChange("employment_type")}
              >
                <SelectTrigger className="w-full rounded-none shadow-none">
                  <SelectValue placeholder="Select employment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full time">Full time</SelectItem>
                  <SelectItem value="Part time">Part time</SelectItem>
                  <SelectItem value=" ">-</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Teaching Type</FieldLabel>
              <Select
                value={formData.teaching_type}
                onValueChange={handleSelectChange("teaching_type")}
              >
                <SelectTrigger className="w-full rounded-none shadow-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Teaching">Teaching</SelectItem>
                  <SelectItem value="Non Teaching">Non Teaching</SelectItem>
                  <SelectItem value=" ">-</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel>Salary</FieldLabel>
              <Input
                className="rounded-none shadow-none"
                value={formData.salary}
                onChange={handleChange("salary")}
              />
            </Field>

            <Field>
              <FieldLabel>Expiration Date</FieldLabel>
              <Input
                type="date"
                className="rounded-none shadow-none"
                value={formData.expiry_date}
                onChange={handleChange("expiry_date")}
              />
            </Field>

            <Field>
              <FieldLabel>Status</FieldLabel>
              <Select
                value={formData.status}
                onValueChange={handleSelectChange("status")}
              >
                <SelectTrigger className="w-full rounded-none shadow-none">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Separator className="my-4" />

          {/* Textareas */}
          <div className="grid gap-4">
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                rows={6}
                className="rounded-none shadow-none resize-none"
                value={formData.description}
                onChange={handleChange("description")}
              />
            </Field>

            <Field>
              <FieldLabel>Responsibilities</FieldLabel>
              <Textarea
                rows={6}
                className="rounded-none shadow-none resize-none"
                value={formData.responsibilities}
                onChange={handleChange("responsibilities")}
              />
            </Field>

            <Field>
              <FieldLabel>Requirements</FieldLabel>
              <Textarea
                rows={6}
                className="rounded-none shadow-none resize-none"
                value={formData.requirements}
                onChange={handleChange("requirements")}
              />
            </Field>
          </div>
        </form>

        <Separator className="my-4" />

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Button
            className="rounded-none shadow-none"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            className="rounded-none shadow-none bg-blue-500 hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </main>
  );
}
