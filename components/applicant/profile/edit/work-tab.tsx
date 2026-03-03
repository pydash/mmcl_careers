"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Applicant } from "@/models/User";
import AddWorkDialog from "./add-work-dialog";

type WorkItem = Applicant["work_experience"][number];
type WorkFormItem = Omit<
  WorkItem,
  "id" | "profile_id" | "created_at" | "updated_at"
>;

interface WorkTabProps {
  workExperience: WorkItem[];
}

export default function WorkTab({ workExperience }: WorkTabProps) {
  const [formData, setFormData] = useState<WorkFormItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (workExperience) {
      setFormData(
        workExperience.map((item) => ({
          company: item.company,
          position: item.position,
          department: item.department || "",
          salary: item.salary ?? null,
          date_started: item.date_started,
          date_ended: item.date_ended,
          courses_handled: item.courses_handled || [],
        })),
      );
    }
  }, [workExperience]);

  const handleUpdateWork = (
    index: number,
    field: keyof WorkFormItem,
    value: WorkFormItem[keyof WorkFormItem],
  ) => {
    setFormData((prev) =>
      prev.map((job, i) => (i === index ? { ...job, [field]: value } : job)),
    );
  };

  const handleRemoveWork = async (index: number) => {
    try {
      setSaving(true);
      setSaveError("");
      setSaveSuccess(false);

      const workId = workExperience[index]?.id;

      if (!workId) {
        setSaveError("Unable to delete record");
        setSaving(false);
        return;
      }

      const response = await fetch(`/api/applicant/profile/work/${workId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete work record");
      }

      setFormData((prev) => prev.filter((_, i) => i !== index));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err?.message || "Failed to delete record");
    } finally {
      setSaving(false);
    }
  };

  const handleRefreshWork = () => {
    // Refresh the work list by re-syncing with the prop
    if (workExperience) {
      setFormData(
        workExperience.map((item) => ({
          company: item.company,
          position: item.position,
          department: item.department || "",
          salary: item.salary ?? null,
          date_started: item.date_started,
          date_ended: item.date_ended,
          courses_handled: item.courses_handled || [],
        })),
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const response = await fetch("/api/applicant/profile/work", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ work_experience: formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update work experience");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err?.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {saveSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
          Work experience updated successfully!
        </div>
      )}

      {/* Error Message */}
      {saveError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {saveError}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Work Experience
          </h2>
          <AddWorkDialog onSuccess={handleRefreshWork} />
        </div>
        <div className="space-y-4">
          {formData.map((job, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <Input
                    type="text"
                    value={job.company || ""}
                    onChange={(e) =>
                      handleUpdateWork(index, "company", e.target.value)
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Position
                  </label>
                  <Input
                    type="text"
                    value={job.position || ""}
                    onChange={(e) =>
                      handleUpdateWork(index, "position", e.target.value)
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <Input
                    type="text"
                    value={job.department || ""}
                    onChange={(e) =>
                      handleUpdateWork(index, "department", e.target.value)
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Salary
                  </label>
                  <Input
                    type="number"
                    value={job.salary ?? ""}
                    onChange={(e) =>
                      handleUpdateWork(
                        index,
                        "salary",
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    placeholder="e.g., 50000"
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Date Started
                  </label>
                  <Input
                    type="text"
                    value={job.date_started || ""}
                    onChange={(e) =>
                      handleUpdateWork(index, "date_started", e.target.value)
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Date Ended
                  </label>
                  <Input
                    type="text"
                    value={job.date_ended || ""}
                    onChange={(e) =>
                      handleUpdateWork(index, "date_ended", e.target.value)
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Courses Handled (comma-separated)
                  </label>
                  <Input
                    type="text"
                    value={(job.courses_handled || []).join(", ")}
                    onChange={(e) =>
                      handleUpdateWork(
                        index,
                        "courses_handled",
                        e.target.value
                          .split(",")
                          .map((c) => c.trim())
                          .filter((c) => c),
                      )
                    }
                    placeholder="e.g., Math, Science, English"
                    className="border-gray-300"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-start">
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  disabled={saving}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  onClick={() => handleRemoveWork(index)}
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-600 hover:bg-red-100 hover:text-red-600"
                >
                  Delete Record
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}
