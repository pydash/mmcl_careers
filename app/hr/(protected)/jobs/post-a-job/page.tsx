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

  const calculateTotalPoints = () => {
    const fields = [
      formData.bachelor_degree_points,
      formData.master_degree_points,
      formData.phd_points,
      formData.work_exp_1,
      formData.work_exp_2,
      formData.work_exp_3,
      formData.published_paper_points,
      formData.research_project_points,
    ];
    return fields.reduce((sum, val) => sum + (parseInt(val) || 0), 0);
  };

  const areRequiredFieldsFilled = () => {
    return (
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.responsibilities.trim() !== "" &&
      formData.requirements.trim() !== "" &&
      formData.deadline_date !== "" &&
      formData.salary_min !== "" &&
      formData.salary_max !== "" &&
      formData.job_type !== "" &&
      formData.department !== "" &&
      formData.is_active !== ""
    );
  };

  const totalPoints = calculateTotalPoints();
  const pointsExceeded = totalPoints > 100;
  const pointsNotComplete = totalPoints !== 100;
  const requiredFieldsFilled = areRequiredFieldsFilled();
  const isSubmitDisabled = isLoading || !requiredFieldsFilled || pointsNotComplete;

  return (
    <>
      <main className="container max-w-4xl py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">Post a Job</h1>
          <p className="text-muted-foreground mt-2">
            Create a new job posting for your organization
          </p>
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

              <Field>
                <FieldLabel>
                  <Label htmlFor="is_active">Job Status on Save</Label>
                </FieldLabel>
                <Select
                  value={formData.is_active}
                  onValueChange={(value) =>
                    handleSelectChange("is_active", value)
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

              <Field>
                <FieldLabel>
                  <Label htmlFor="title">Job Title</Label>
                </FieldLabel>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="e.g. Senior Software Engineer"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label htmlFor="job_type">Job Type</Label>
                </FieldLabel>
                <Select
                  value={formData.job_type}
                  onValueChange={(value) =>
                    handleSelectChange("job_type", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">Full Time</SelectItem>
                    <SelectItem value="part_time">Part Time</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>
                  <Label htmlFor="department">Department</Label>
                </FieldLabel>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    handleSelectChange("department", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-">-</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <FieldLabel>
                  <Label htmlFor="deadline_date">Application Deadline</Label>
                </FieldLabel>
                <Input
                  type="date"
                  id="deadline_date"
                  name="deadline_date"
                  value={formData.deadline_date}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                />
              </Field>
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
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label htmlFor="responsibilities">Responsibilities</Label>
                </FieldLabel>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  placeholder="List the key responsibilities..."
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  rows={6}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Field>

              <Field>
                <FieldLabel>
                  <Label htmlFor="requirements">Requirements</Label>
                </FieldLabel>
                <textarea
                  id="requirements"
                  name="requirements"
                  placeholder="Specify the qualifications and skills required..."
                  value={formData.requirements}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  rows={6}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                />
              </Field>
            </FieldSet>
          </FieldGroup>

          <FieldGroup>
            <FieldSet>
              <FieldLegend>Compensation</FieldLegend>
              <FieldDescription>
                Set the salary range for this position
              </FieldDescription>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field>
                  <FieldLabel>
                    <Label htmlFor="salary_min">Minimum Salary</Label>
                  </FieldLabel>
                  <Input
                    type="number"
                    id="salary_min"
                    name="salary_min"
                    placeholder="e.g. 50000"
                    value={formData.salary_min}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                  />
                </Field>

                <Field>
                  <FieldLabel>
                    <Label htmlFor="salary_max">Maximum Salary</Label>
                  </FieldLabel>
                  <Input
                    type="number"
                    id="salary_max"
                    name="salary_max"
                    placeholder="e.g. 80000"
                    value={formData.salary_max}
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
          <FieldLegend>Pointing System</FieldLegend>
          <FieldDescription>
            Define the criteria and point values for evaluating applicants
          </FieldDescription>

          <div className="mt-1 flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Total Points:</span>
            <span className={`px-2 py-0.5 rounded-md border font-semibold ${
              pointsNotComplete ? 'border-red-500 bg-red-50 text-red-700' : 'border-green-500 bg-green-50 text-green-700'
            }`}>
              {totalPoints}/100
            </span>
          </div>

          <Field>
            <div className="border border-gray-300 rounded-lg p-6 bg-white space-y-6">

              <div>
                <div className="mb-2 text-base font-semibold">
                  Educational Background
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="w-40">Bachelor's Degree</Label>
                    <Input
                      type="text"
                      placeholder="Enter points e.g. 10"
                      value={formData.bachelor_degree_points || ""}
                      onChange={(e) =>
                        handleInputChange("bachelor_degree_points", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Label className="w-40">Master's Degree</Label>
                    <Input
                      type="text"
                      placeholder="Enter points e.g. 10"
                      value={formData.master_degree_points || ""}
                      onChange={(e) =>
                        handleInputChange("master_degree_points", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Label className="w-40">PhD</Label>
                    <Input
                      type="text"
                      placeholder="Enter points e.g. 10"
                      value={formData.phd_points || ""}
                      onChange={(e) =>
                        handleInputChange("phd_points", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-base font-semibold">Work Experience</div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="w-40">1–2 Years</Label>
                    <Input
                      type="text"
                      placeholder="Enter points e.g. 10"
                      value={formData.work_exp_1 || ""}
                      onChange={(e) =>
                        handleInputChange("work_exp_1", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Label className="w-40">3–5 Years</Label>
                    <Input
                      type="text"
                      placeholder="Enter points e.g. 10"
                      value={formData.work_exp_2 || ""}
                      onChange={(e) =>
                        handleInputChange("work_exp_2", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Label className="w-40">6+ Years</Label>
                    <Input
                      type="text"
                      placeholder="Enter points e.g. 10"
                      value={formData.work_exp_3 || ""}
                      onChange={(e) =>
                        handleInputChange("work_exp_3", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-2 text-base font-semibold">Extracurricular</div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <Label className="w-40">Published Paper</Label>
                    <Input
                      type="text"
                      placeholder="Enter points e.g. 10"
                      value={formData.published_paper_points || ""}
                      onChange={(e) =>
                        handleInputChange("published_paper_points", e.target.value)
                      }
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <Label className="w-40">Research Project</Label>
                    <Input
                      type="text"
                      placeholder="Enter points e.g. 10"
                      value={formData.research_project_points || ""}
                      onChange={(e) =>
                        handleInputChange("research_project_points", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-2 text-base font-semibold">Others</div>

                {(formData.other_points || []).map((item: string, index: number) => (
                  <div key={index} className="flex items-center gap-4 mt-2">
                    <Input
                      type="text"
                      placeholder="Criteria name"
                      value={item}
                      onChange={(e) => {
                        const updated = [...formData.other_points];
                        updated[index] = e.target.value;
                        handleInputChange("other_points", updated);
                      }}
                    />
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  className="mt-3"
                  onClick={() =>
                    handleInputChange("other_points", [
                      ...(formData.other_points || []),
                      "",
                    ])
                  }
                >
                  + Add Criteria
                </Button>
              </div>

            </div>
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
            <Button type="submit" disabled={isSubmitDisabled}>
              {isLoading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </main>
    </>
  );
}
