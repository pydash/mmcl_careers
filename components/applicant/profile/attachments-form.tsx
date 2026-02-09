"use client";

import { useRef, useState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type AttachmentFormData = {
  file_name: string;
  attachment: File | null;
};

interface AttachmentFormProps {
  attachmentsData: AttachmentFormData[];
  onAddAttachment: (data: AttachmentFormData) => void;
  onDeleteAttachment: (index: number) => void;
}

export default function AttachmentsForm({
  attachmentsData,
  onAddAttachment,
  onDeleteAttachment,
}: AttachmentFormProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentEntry, setCurrentEntry] = useState<AttachmentFormData>({
    file_name: "",
    attachment: null,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setCurrentEntry((prev) => ({
      ...prev,
      attachment: file,
      file_name: prev.file_name || file?.name || "",
    }));
  };

  const handleAdd = () => {
    if (currentEntry.attachment) {
      onAddAttachment(currentEntry);
      setCurrentEntry({ file_name: "", attachment: null });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Display saved attachments */}
      {attachmentsData.map((entry, index) => (
        <div
          key={`${entry.file_name}-${index}`}
          className="p-4 border rounded-md bg-gray-50 relative"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">File Name</p>
              <p className="font-medium break-all">{entry.file_name}</p>
            </div>
            <button
              type="button"
              onClick={() => onDeleteAttachment(index)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      {/* Input form for new attachment */}
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="file_name">File Name</FieldLabel>
            <Input
              id="file_name"
              placeholder=""
              value={currentEntry.file_name}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  file_name: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="attachment">Upload File</FieldLabel>
            <Input
              ref={fileInputRef}
              id="attachment"
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
              onChange={handleFileChange}
            />
          </Field>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!currentEntry.attachment}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm self-start"
        >
          Add Attachment
        </button>
      </FieldGroup>
    </div>
  );
}
