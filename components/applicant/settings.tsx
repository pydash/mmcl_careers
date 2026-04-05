import ApplicantNavbar from "./navbar";

export default function ApplicantSettings() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ApplicantNavbar />
      
  
      <main className="flex-1 lg:ml-64 p-4 md:p-8 lg:p-10">
        <div className="max-w-4xl mx-auto">
       
          <div className="mb-8 mt-12 lg:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Settings
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your account preferences and system configurations.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <p className="text-sm text-gray-600 leading-relaxed">
              Here you can update your settings and preferences.
            </p>
            
     
            <div className="mt-8 space-y-6">
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Account Notifications</h3>
                <p className="text-xs text-gray-500">Configure how you receive updates about your applications.</p>
              </div>
              
              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Privacy & Security</h3>
                <p className="text-xs text-gray-500">Manage your password and account visibility settings.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}