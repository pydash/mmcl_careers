import { PersonalInfo } from "@/models/user";

export default function PersonalContent({
  personal,
}: {
  personal: PersonalInfo;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-1 bg-white border border-slate-200 rounded-lg p-4">
        <label className="text-xs font-medium text-slate-600">Name</label>
        <p className="text-sm font-semibold text-slate-900">
          {personal.first_name} {personal.last_name}
        </p>
      </div>
      <div className="space-y-1 bg-white border border-slate-200 rounded-lg p-4">
        <label className="text-xs font-medium text-slate-600">Email</label>
        <p className="text-sm font-semibold text-slate-900">{personal.email}</p>
      </div>

      <div className="space-y-1 bg-white border border-slate-200 rounded-lg p-4">
        <label className="text-xs font-medium text-slate-600">Mobile</label>
        <p className="text-sm font-semibold text-slate-900">
          {personal.mobile}
        </p>
      </div>

      <div className="space-y-1 bg-white border border-slate-200 rounded-lg p-4">
        <label className="text-xs font-medium text-slate-600">Landline</label>
        <p className="text-sm font-semibold text-slate-900">
          {personal.landline}
        </p>
      </div>

      <div className="space-y-1 bg-white border border-slate-200 rounded-lg p-4">
        <label className="text-xs font-medium text-slate-600">Gender</label>
        <p className="text-sm font-semibold text-slate-900">
          {personal.gender}
        </p>
      </div>

      <div className="space-y-1 bg-white border border-slate-200 rounded-lg p-4 md:col-span-2">
        <label className="text-xs font-medium text-slate-600">Address</label>
        <p className="text-sm font-semibold text-slate-900">
          {personal.address}
        </p>
      </div>

      <div className="space-y-1 bg-white border border-slate-200 rounded-lg p-4">
        <label className="text-xs font-medium text-slate-600">Birthplace</label>
        <p className="text-sm font-semibold text-slate-900">
          {personal.birthplace}
        </p>
      </div>

      <div className="space-y-1 bg-white border border-slate-200 rounded-lg p-4">
        <label className="text-xs font-medium text-slate-600">
          Civil Status
        </label>
        <p className="text-sm font-semibold text-slate-900">
          {personal.civil_status}
        </p>
      </div>

      <div className="space-y-1 bg-white border border-slate-200 rounded-lg p-4">
        <label className="text-xs font-medium text-slate-600">Religion</label>
        <p className="text-sm font-semibold text-slate-900">
          {personal.religion}
        </p>
      </div>

      <div className="space-y-1 bg-white border border-slate-200 rounded-lg p-4">
        <label className="text-xs font-medium text-slate-600">
          Citizenship
        </label>
        <p className="text-sm font-semibold text-slate-900">
          {personal.citizenship}
        </p>
      </div>
    </div>
  );
}
