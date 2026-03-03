"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Applicant } from "@/models/User";
import AddCredentialDialog from "./add-credential-dialog";

type CredentialItem = Applicant["credentials"][number];
type CredentialFormItem = Omit<
  CredentialItem,
  "id" | "profile_id" | "created_at" | "updated_at"
>;

interface CredentialsTabProps {
  credentials: CredentialItem[];
}

export default function CredentialsTab({ credentials }: CredentialsTabProps) {
  const [formData, setFormData] = useState<CredentialFormItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (credentials) {
      setFormData(
        credentials.map((item) => ({
          title: item.title,
          authority: item.authority,
          number: item.number ?? null,
          date_taken: item.date_taken ?? "",
          valid_until: item.valid_until ?? "",
        })),
      );
    }
  }, [credentials]);

  const handleAddCredential = () => {
    setFormData((prev) => [
      ...prev,
      {
        title: "",
        authority: "",
        number: null,
        date_taken: "",
        valid_until: "",
      },
    ]);
  };

  const handleUpdateCredential = (
    index: number,
    field: keyof CredentialFormItem,
    value: CredentialFormItem[keyof CredentialFormItem],
  ) => {
    setFormData((prev) =>
      prev.map((cred, i) => (i === index ? { ...cred, [field]: value } : cred)),
    );
  };

  const handleRemoveCredential = async (index: number) => {
    try {
      setSaving(true);
      setSaveError("");
      setSaveSuccess(false);

      const credentialId = credentials[index]?.id;

      if (!credentialId) {
        setSaveError("Unable to delete record");
        setSaving(false);
        return;
      }

      const response = await fetch(
        `/api/applicant/profile/credentials/${credentialId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete credential record");
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

  const handleRefreshCredentials = () => {
    // Refresh the credentials list by re-syncing with the prop
    if (credentials) {
      setFormData(
        credentials.map((item) => ({
          title: item.title,
          authority: item.authority,
          number: item.number ?? null,
          date_taken: item.date_taken ?? "",
          valid_until: item.valid_until ?? "",
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
      const response = await fetch("/api/applicant/profile/credentials", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credentials: formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update credentials");
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
          Credentials updated successfully!
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
          <h2 className="text-lg font-semibold text-gray-900">Credentials</h2>
          <AddCredentialDialog onSuccess={handleRefreshCredentials} />
        </div>
        <div className="space-y-4">
          {formData.map((cred, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Input
                    type="text"
                    value={cred.title || ""}
                    onChange={(e) =>
                      handleUpdateCredential(index, "title", e.target.value)
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Authority
                  </label>
                  <Input
                    type="text"
                    value={cred.authority || ""}
                    onChange={(e) =>
                      handleUpdateCredential(index, "authority", e.target.value)
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Number
                  </label>
                  <Input
                    type="text"
                    value={cred.number ?? ""}
                    onChange={(e) =>
                      handleUpdateCredential(
                        index,
                        "number",
                        e.target.value ? Number(e.target.value) : null,
                      )
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Date Taken
                  </label>
                  <Input
                    type="text"
                    value={cred.date_taken || ""}
                    onChange={(e) =>
                      handleUpdateCredential(
                        index,
                        "date_taken",
                        e.target.value,
                      )
                    }
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Valid Until
                  </label>
                  <Input
                    type="text"
                    value={cred.valid_until || ""}
                    onChange={(e) =>
                      handleUpdateCredential(
                        index,
                        "valid_until",
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
                  onClick={() => handleRemoveCredential(index)}
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
