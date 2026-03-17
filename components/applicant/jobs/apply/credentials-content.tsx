import { getDateFromShortDate } from "@/lib/datetime.helpers";
import { CredentialInfo } from "@/models/user";

export default function CredentialsContent({
  credentials,
}: {
  credentials: CredentialInfo[];
}) {
  return (
    <div className="space-y-6">
      {credentials.map((credential, index) => (
        <div key={index} className="border rounded-lg p-4 bg-white">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">
                Title
              </label>
              <p className="text-sm font-semibold text-slate-900">
                {credential.title}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">
                Authority
              </label>
              <p className="text-sm font-semibold text-slate-900">
                {credential.authority}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">
                Number
              </label>
              <p className="text-sm font-semibold text-slate-900">
                {credential.number}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">
                Date Issued
              </label>
              <p className="text-sm font-semibold text-slate-900">
                {getDateFromShortDate(credential.date_issued)}
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-600">
                Date Expired
              </label>
              <p className="text-sm font-semibold text-slate-900">
                {getDateFromShortDate(credential.date_expired)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
