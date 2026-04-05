import { AttachmentsInfo } from "@/models/user";
import { FileText, X } from "lucide-react";

export default function AttachmentsContent({
  attachments,
}: {
  attachments: AttachmentsInfo[];
}) {
  return (
    <div className="space-y-6">
      {attachments.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-900">
            Uploaded Documents ({attachments.length})
          </h3>
          <div className="space-y-2">
            {attachments.map((attachment, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-slate-200 bg-white p-3 gap-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium text-slate-900 truncate">
                      {attachment.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {attachment.file.size
                        ? `${(attachment.file.size / 1024).toFixed(1)} KB`
                        : "Unknown size"}
                    </span>
                  </div>
                </div>
                

                <div className="flex sm:justify-end">
                   {/* Placeholder kaSi di pa tapos */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}