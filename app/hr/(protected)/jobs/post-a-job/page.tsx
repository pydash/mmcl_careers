"use client";

import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import {
  Field,
  FieldGroup,
  FieldSet,
  FieldLegend,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePostJob } from "@/hooks/hr/jobs/usePostJob";

export default function PostJobPage() {
  const router = useRouter();
  const {
    formData,
    isLoading,
    error,
    success,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
  } = usePostJob();

  const areRequiredFieldsFilled = () => {
    return (
      formData.position.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.expiration_date !== "" &&
      formData.employment_type !== "" &&
      formData.department !== "" &&
      formData.is_open !== ""
    );
  };

  const requiredFieldsFilled = areRequiredFieldsFilled();
  const isSubmitDisabled = isLoading || !requiredFieldsFilled;

  return (
    <>
      <main className="container w-full py-4">
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight">Post a Job</h1>
          <p className="text-muted-foreground mt-2">Create a new job posting</p>
        </div>
        <Separator className="mb-8" />

        {error && (
          <div className="mb-6">
            <Alert variant="destructive">
              <p>{error}</p>
            </Alert>
          </div>
        )}

        {success && (
          <div className="mb-6">
            <Alert>
              <p className="text-green-700">
                Job posted successfully! Redirecting...
              </p>
            </Alert>
          </div>
        )}

        <form className="space-y-8" onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Job Details</FieldLegend>
              <FieldDescription>
                Enter the basic information about the job position
              </FieldDescription>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <Field>
                  <FieldLabel>
                    <Label htmlFor="is_open">Job Status</Label>
                  </FieldLabel>
                  <Select
                    value={formData.is_open}
                    onValueChange={(value) =>
                      handleSelectChange("is_open", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field className="lg:col-span-2">
                  <FieldLabel>
                    <Label htmlFor="position">Job Position</Label>
                  </FieldLabel>
                  <Input
                    type="text"
                    id="position"
                    name="position"
                    placeholder="e.g. Senior Software Engineer"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </Field>

                <Field>
                  <FieldLabel>
                    <Label htmlFor="employment_type">Employment Type</Label>
                  </FieldLabel>
                  <Select
                    value={formData.employment_type}
                    onValueChange={(value) =>
                      handleSelectChange("employment_type", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full Time</SelectItem>
                      <SelectItem value="Part-time">Part Time</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>
                    <Label htmlFor="department">Department</Label>
                  </FieldLabel>
                  <Input
                    type="text"
                    id="department"
                    name="department"
                    placeholder="e.g. CCIS"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </Field>

                <Field>
                  <FieldLabel>
                    <Label htmlFor="expiration_date">
                      Application Deadline
                    </Label>
                  </FieldLabel>
                  <Input
                    type="date"
                    id="expiration_date"
                    name="expiration_date"
                    value={formData.expiration_date}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </Field>
              </div>
            </FieldSet>
          </FieldGroup>

          <FieldGroup>
            <FieldSet>
              <FieldLegend>Job Description</FieldLegend>
              <FieldDescription>
                Provide detailed information about the position
              </FieldDescription>

              <Field>
                <FieldLabel>
                  <Label htmlFor="description">Description</Label>
                </FieldLabel>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Provide a comprehensive description of the role..."
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  rows={6}
                  className="flex min-h-30 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Field>
            </FieldSet>
          </FieldGroup>

          <FieldGroup>
            <FieldSet>
              <FieldLegend>Compensation</FieldLegend>
              <FieldDescription>
                Set the salary for this position
              </FieldDescription>

              <Field>
                <FieldLabel>
                  <Label htmlFor="salary">Salary</Label>
                </FieldLabel>
                <Input
                  type="number"
                  id="salary"
                  name="salary"
                  placeholder="e.g. 60000"
                  value={formData.salary}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </Field>
            </FieldSet>
          </FieldGroup>

          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className="bg-blue-600"
            >
              {isLoading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
