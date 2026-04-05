import { GovernmentIDInfo } from "@/models/user";

export default function GovernmentIDContent({
  ids,
}: {
  ids: GovernmentIDInfo[];
}) {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {ids.map((id, index) => (
          <div
            className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm"
            key={index}
          >
            <label className="text-xs font-medium text-slate-500 block mb-1">
              {id.type}
            </label>
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-slate-900 break-all">
                {id.number}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}