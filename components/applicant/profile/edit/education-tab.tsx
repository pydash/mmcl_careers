"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Applicant } from "@/models/User";
import AddEducDialog from "./add-educ-dialog";

type EducationItem = Applicant["education_background"][number];
type EducationFormItem = Omit<
  EducationItem,
  "id" | "profile_id" | "created_at" | "updated_at"
>;

interface EducationTabProps {
  education: EducationItem[];
}

export default function EducationTab({ education }: EducationTabProps) {
  const [formData, setFormData] = useState<EducationFormItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (education) {
      setFormData(
        education.map((item) => ({
          school_name: item.school_name,
          degree: item.degree,
          level: item.level,
          status: item.status,
          units_earned: item.units_earned ?? null,
          year_graduated: item.year_graduated ?? null,
        })),
      );
    }
  }, [education]);

  const handleUpdateEducation = (
    index: number,
    field: keyof EducationFormItem,
    value: EducationFormItem[keyof EducationFormItem],
  ) => {
    setFormData((prev) =>
      prev.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu)),
    );
  };

  const handleRemoveEducation = async (index: number) => {
    try {
      setSaving(true);
      setSaveError("");
      setSaveSuccess(false);

      const educationId = education[index]?.id;

      if (!educationId) {
        setSaveError("Unable to delete record");
        setSaving(false);
        return;
      }

      const response = await fetch(
        `/api/applicant/profile/education/${educationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete education record");
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

  const handleRefreshEducation = () => {
    // Refresh the education list by re-syncing with the prop
    if (education) {
      setFormData(
        education.map((item) => ({
          school_name: item.school_name,
          degree: item.degree,
          level: item.level,
          status: item.status,
          units_earned: item.units_earned ?? null,
          year_graduated: item.year_graduated ?? null,
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
      const response = await fetch("/api/applicant/profile/education", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ education: formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update education background");
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
          Education background updated successfully!
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
            Education Background
          </h2>
          <AddEducDialog onSuccess={handleRefreshEducation} />
        </div>
        <div className="space-y-4">
          {formData.map((edu, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    School Name
                  </label>
                  <Input
                    type="text"
                    value={edu.school_name || ""}
                    onChange={(e) =>
                      handleUpdateEducation(
                        index,
                        "school_name",
                        e.target.value,
                      )
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Degree
                  </label>
                  <Input
                    type="text"
                    value={edu.degree || ""}
                    onChange={(e) =>
                      handleUpdateEducation(index, "degree", e.target.value)
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Level
                  </label>
                  <Select
                    value={edu.level || ""}
                    onValueChange={(value) =>
                      handleUpdateEducation(index, "level", value)
                    }
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SECONDARY">Secondary</SelectItem>
                      <SelectItem value="VOCATIONAL">Vocational</SelectItem>
                      <SelectItem value="TERTIARY">Tertiary</SelectItem>
                      <SelectItem value="GRADUATE">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <Select
                    value={edu.status || ""}
                    onValueChange={(value) =>
                      handleUpdateEducation(index, "status", value)
                    }
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ONGOING">Ongoing</SelectItem>
                      <SelectItem value="COMPLETED">Completed</SelectItem>
                      <SelectItem value="DROPPED">Dropped</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Units Earned
                  </label>
                  <Input
                    type="number"
                    value={edu.units_earned ?? ""}
                    onChange={(e) =>
                      handleUpdateEducation(
                        index,
                        "units_earned",
                        e.target.value ? parseInt(e.target.value, 10) : null,
                      )
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Year Graduated
                  </label>
                  <Input
                    type="number"
                    value={edu.year_graduated ?? ""}
                    onChange={(e) =>
                      handleUpdateEducation(
                        index,
                        "year_graduated",
                        e.target.value ? parseInt(e.target.value, 10) : null,
                      )
                    }
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
                  onClick={() => handleRemoveEducation(index)}
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
