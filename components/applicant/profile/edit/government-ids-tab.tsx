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
import AddGovIdDialog from "./add-gov-id-dialog";

type GovernmentIDItem = Applicant["government_ids"][number];
type GovernmentIDFormItem = Omit<
  GovernmentIDItem,
  "id" | "profile_id" | "created_at" | "updated_at"
>;

interface GovernmentIdsTabProps {
  governmentIds: GovernmentIDItem[];
}

export default function GovernmentIdsTab({
  governmentIds,
}: GovernmentIdsTabProps) {
  const [formData, setFormData] = useState<GovernmentIDFormItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (governmentIds) {
      setFormData(
        governmentIds.map((item) => ({
          id_type: item.id_type,
          id_number: item.id_number,
        })),
      );
    }
  }, [governmentIds]);

  const handleUpdateGovernmentID = (
    index: number,
    field: keyof GovernmentIDFormItem,
    value: GovernmentIDFormItem[keyof GovernmentIDFormItem],
  ) => {
    setFormData((prev) =>
      prev.map((id, i) => (i === index ? { ...id, [field]: value } : id)),
    );
  };

  const handleRemoveGovernmentID = async (index: number) => {
    try {
      setSaving(true);
      setSaveError("");
      setSaveSuccess(false);

      const govIdId = governmentIds[index]?.id;

      if (!govIdId) {
        setSaveError("Unable to delete record");
        setSaving(false);
        return;
      }

      const response = await fetch(`/api/applicant/profile/gov-id/${govIdId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete government ID");
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

  const handleRefreshGovernmentIds = () => {
    // Refresh the government IDs list by re-syncing with the prop
    if (governmentIds) {
      setFormData(
        governmentIds.map((item) => ({
          id_type: item.id_type,
          id_number: item.id_number,
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
      const response = await fetch("/api/applicant/profile/gov-id", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ government_ids: formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update government IDs");
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
      {saveSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
          Government IDs updated successfully!
        </div>
      )}

      {saveError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {saveError}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Government IDs
          </h2>
          <AddGovIdDialog onSuccess={handleRefreshGovernmentIds} />
        </div>
        <div className="space-y-4">
          {formData.map((id, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    ID Type
                  </label>
                  <Select
                    value={id.id_type || ""}
                    onValueChange={(value) =>
                      handleUpdateGovernmentID(
                        index,
                        "id_type",
                        value as GovernmentIDFormItem["id_type"],
                      )
                    }
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SSS">SSS</SelectItem>
                      <SelectItem value="TIN">TIN</SelectItem>
                      <SelectItem value="PHILHEALTH">PhilHealth</SelectItem>
                      <SelectItem value="PAGIBIG">Pag-ibig</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    ID Number
                  </label>
                  <Input
                    type="text"
                    value={id.id_number || ""}
                    onChange={(e) =>
                      handleUpdateGovernmentID(
                        index,
                        "id_number",
                        e.target.value,
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
                  onClick={() => handleRemoveGovernmentID(index)}
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
