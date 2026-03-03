"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Applicant } from "@/models/User";
import AddMediaDialog from "./add-media-dialog";

type MediaAccountItem = Applicant["media_accounts"][number];
type MediaAccountFormItem = Omit<
  MediaAccountItem,
  "id" | "profile_id" | "created_at" | "updated_at"
>;

interface MediaTabProps {
  mediaAccounts: MediaAccountItem[];
}

export default function MediaTab({ mediaAccounts }: MediaTabProps) {
  const [formData, setFormData] = useState<MediaAccountFormItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (mediaAccounts) {
      setFormData(
        mediaAccounts.map((item) => ({
          platform: item.platform,
          link: item.link,
        })),
      );
    }
  }, [mediaAccounts]);

  const handleUpdateMediaAccount = (
    index: number,
    field: keyof MediaAccountFormItem,
    value: MediaAccountFormItem[keyof MediaAccountFormItem],
  ) => {
    setFormData((prev) =>
      prev.map((account, i) =>
        i === index ? { ...account, [field]: value } : account,
      ),
    );
  };

  const handleRemoveMediaAccount = async (index: number) => {
    try {
      setSaving(true);
      setSaveError("");
      setSaveSuccess(false);

      const mediaId = mediaAccounts[index]?.id;

      if (!mediaId) {
        setSaveError("Unable to delete record");
        setSaving(false);
        return;
      }

      const response = await fetch(`/api/applicant/profile/media/${mediaId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete media account");
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

  const handleRefreshMediaAccounts = () => {
    // Refresh the media accounts list by re-syncing with the prop
    if (mediaAccounts) {
      setFormData(
        mediaAccounts.map((item) => ({
          platform: item.platform,
          link: item.link,
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
      const response = await fetch("/api/applicant/profile/media", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ media_accounts: formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update social media accounts");
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
          Social media accounts updated successfully!
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
            Social Media Accounts
          </h2>
          <AddMediaDialog onSuccess={handleRefreshMediaAccounts} />
        </div>
        <div className="space-y-4">
          {formData.map((account, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-gray-50 space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Platform
                  </label>
                  <Input
                    type="text"
                    value={account.platform || ""}
                    onChange={(e) =>
                      handleUpdateMediaAccount(
                        index,
                        "platform",
                        e.target.value,
                      )
                    }
                    placeholder="e.g., Facebook, LinkedIn, Twitter"
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Profile Link
                  </label>
                  <Input
                    type="url"
                    value={account.link || ""}
                    onChange={(e) =>
                      handleUpdateMediaAccount(index, "link", e.target.value)
                    }
                    placeholder="https://..."
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
                  onClick={() => handleRemoveMediaAccount(index)}
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
