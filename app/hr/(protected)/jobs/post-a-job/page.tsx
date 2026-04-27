"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
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
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { usePostJob } from "@/hooks/hr/jobs/usePostJob";

export default function PostJobPage() {
  const router = useRouter();
  const [isCompensationEnabled, setIsCompensationEnabled] = useState(false);
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
    if (isCompensationEnabled) {
      if (!formData.salary) return false;
    }

    return (
      // Fields that are required
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.status !== null
    );
  };

  const requiredFieldsFilled = areRequiredFieldsFilled();
  const isSubmitDisabled = isLoading || !requiredFieldsFilled;

  return (
    <>
      <div className="px-4 py-8 md:p-2">
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

              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <Field className="col-span-2">
                  <FieldLabel>
                    <Label htmlFor="title">
                      Job Title
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                  </FieldLabel>
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="rounded-none shadow-none"
                  />
                </Field>

                <Field>
                  <FieldLabel>
                    <Label htmlFor="department">Department</Label>
                  </FieldLabel>
                  <Input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department ?? undefined}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="rounded-none shadow-none"
                  />
                </Field>

                <Field>
                  <FieldLabel>
                    <Label htmlFor="employment_type">Employment Type</Label>
                  </FieldLabel>
                  <Select
                    value={formData.employment_type ?? undefined}
                    onValueChange={(value) =>
                      handleSelectChange("employment_type", value)
                    }
                  >
                    <SelectTrigger className="rounded-none shadow-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full time">Full time</SelectItem>
                      <SelectItem value="Part time">Part time</SelectItem>
                      <SelectItem value="-">-</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>
                    <Label htmlFor="teaching_type">Teaching Type</Label>
                  </FieldLabel>
                  <Select
                    value={formData.teaching_type ?? undefined}
                    onValueChange={(value) =>
                      handleSelectChange("teaching_type", value)
                    }
                  >
                    <SelectTrigger className="rounded-none shadow-none">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Teaching">Teaching</SelectItem>
                      <SelectItem value="Non-Teaching">Non-Teaching</SelectItem>
                      <SelectItem value="-">-</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel className="flex items-center gap-2">
                    <Label htmlFor="salary">Salary</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="size-3.5" />
                      </TooltipTrigger>
                      <TooltipContent>
                        - Specified amount or range {"(20000 - 30000 or 20000)"}{" "}
                        <br />- Optional. Leave blank if not applicable
                      </TooltipContent>
                    </Tooltip>
                  </FieldLabel>
                  <Input
                    type="text"
                    id="salary"
                    name="salary"
                    value={formData.salary ?? undefined}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="rounded-none shadow-none"
                  />
                </Field>

                <Field>
                  <FieldLabel>
                    <Label htmlFor="expiry_date">Expiration Date</Label>
                  </FieldLabel>
                  <Input
                    type="date"
                    id="expiry_date"
                    name="expiry_date"
                    value={formData.expiry_date ?? undefined}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="rounded-none shadow-none"
                  />
                </Field>

                <Field>
                  <FieldLabel>
                    <Label htmlFor="status">
                      Status
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                  </FieldLabel>
                  <div className="flex items-center space-x-3 border px-2 py-1">
                    <Checkbox
                      id="status"
                      className="rounded-none shadow-none"
                      checked={formData.status === "Open"}
                      onCheckedChange={(checked) =>
                        handleSelectChange(
                          "status",
                          checked === true ? "Open" : "Closed",
                        )
                      }
                      disabled={isLoading}
                    />
                    <div>
                      <Label htmlFor="status">
                        Set as "Open" after posting
                      </Label>
                    </div>
                  </div>
                </Field>
              </div>
            </FieldSet>
          </FieldGroup>

          <Separator className="my-8" />

          <FieldGroup>
            <FieldSet>
              <Field>
                <FieldLabel>
                  <Label htmlFor="description">
                    Description<span className="text-red-500 ml-1">*</span>
                  </Label>
                </FieldLabel>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  rows={6}
                  className="border p-2 text-sm focus-visible:outline-1 resize-none"
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label htmlFor="responsibilities">Responsibilities</Label>
                </FieldLabel>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  value={formData.responsibilities ?? undefined}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  rows={6}
                  className="border p-2 text-sm focus-visible:outline-1 resize-none"
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label htmlFor="requirements">Requirements</Label>
                </FieldLabel>
                <textarea
                  id="requirements"
                  name="requirements"
                  value={formData.requirements ?? undefined}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  rows={6}
                  className="border p-2 text-sm focus-visible:outline-1 resize-none"
                />
              </Field>
            </FieldSet>
          </FieldGroup>

          <Separator className="my-8" />

          <div className="flex items-center justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-none shadow-none"
              disabled={isLoading}
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitDisabled}
              className="rounded-none shadow-none bg-blue-500 hover:bg-blue-600"
            >
              {isLoading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
