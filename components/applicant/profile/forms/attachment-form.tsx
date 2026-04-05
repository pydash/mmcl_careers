"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paperclip, X } from "lucide-react";

type AttachmentRecord = {
  name: string;
  file: File | null;
};

const emptyAttachmentRecord: AttachmentRecord = {
  name: "",
  file: null,
};

export default function AttachmentForm() {
  const [records, setRecords] = useState<AttachmentRecord[]>([
    { ...emptyAttachmentRecord },
  ]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const updateName = (index: number, value: string) => {
    setRecords((prev) =>
      prev.map((record, i) =>
        i === index ? { ...record, name: value } : record,
      ),
    );
  };

  const updateFile = (index: number, file: File | null) => {
    setRecords((prev) =>
      prev.map((record, i) => (i === index ? { ...record, file } : record)),
    );
  };

  const addRecord = () => {
    setRecords((prev) => [...prev, { ...emptyAttachmentRecord }]);
  };

  const removeRecord = (index: number) => {
    setRecords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form className="space-y-6">
      {records.map((record, index) => (
        <div
          key={index}
          className="space-y-4 rounded-xl border border-slate-200 p-4 bg-white"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              Attachment {index + 1}
            </h3>
            {records.length > 1 && (
              <Button
                type="button"
                variant="outline"
                className="text-red-600 hover:text-red-700"
                onClick={() => removeRecord(index)}
              >
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`name-${index}`}>Label</Label>
              <Input
                id={`name-${index}`}
                name={`attachments[${index}].name`}
                placeholder="Resume, Portfolio, Certificate..."
                value={record.name}
                onChange={(e) => updateName(index, e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`file-${index}`}>File</Label>
              <div className="flex items-center gap-2">
                <input
                  ref={(el) => {
                    fileInputRefs.current[index] = el;
                  }}
                  id={`file-${index}`}
                  name={`attachments[${index}].file`}
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    updateFile(index, e.target.files?.[0] ?? null)
                  }
                />
                <button
                  type="button"
                  onClick={() => fileInputRefs.current[index]?.click()}
                  className="flex flex-1 items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm text-slate-500 hover:bg-slate-50"
                >
                  <Paperclip className="h-4 w-4 shrink-0" />
                  <span className="truncate">
                    {record.file ? record.file.name : "Choose file..."}
                  </span>
                </button>
                {record.file && (
                  <button
                    type="button"
                    onClick={() => {
                      updateFile(index, null);
                      if (fileInputRefs.current[index]) {
                        fileInputRefs.current[index]!.value = "";
                      }
                    }}
                    className="shrink-0 rounded-md p-1 text-slate-400 hover:text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={addRecord}>
          Add Attachment
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700">
          Save Attachments
        </Button>
      </div>
    </form>
  );
}
