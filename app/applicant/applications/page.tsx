import { Button } from "@/components/ui/button";
import { Search, Funnel, ArrowDownNarrowWide} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ApplicationDialog } from "@/components/ApplicationDialog";
import { getApplications, getProfile } from "./server-actions";

export default async function ApplicationsPage() {
  const applications = await getApplications();
  const profile = await getProfile();

  return (
    <div className="p-6">
      <div className="mb-6 flex gap-3">
        <Button className="w-80 justify-start rounded-full bg-white text-black hover:bg-gray-100">
          <Search className="w-4 h-4 mr-1" />
          Search
        </Button>
        <Button className="w-23 justify-start rounded-full bg-white text-black hover:bg-gray-100">
          Filter
           <Funnel className="w-4 h-4 mr-1" /> 
        </Button>
        <Button className="w-23 justify-start rounded-full bg-white text-black hover:bg-gray-100">
          View
          <ArrowDownNarrowWide className="w-4 h-4 mr-1" /> 
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {applications.length === 0 && (
          <p className="text-center text-gray-500">No applications found.</p>
        )}

        {applications.map((app) => (
          <Card key={app.id} className="p-4">
            <div className="flex justify-between">
              <small className="text-xs">App Number: {app.app_number}</small>
              <small className="text-xs flex items-center gap-2">
                <span
                  className={`inline-block w-3 h-3 rounded-full ${
                    app.status?.toLowerCase().includes('pending') ? 'bg-yellow-500' :
                    app.status?.toLowerCase().includes('for interview') ? 'bg-green-500' :
                    app.status?.toLowerCase().includes('deferred') || app.status?.toLowerCase().includes('deffered') ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}
                ></span>
                {app.status}
              </small>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <label className="font-semibold text-lg">{app.position}</label>
                <small className="text-xs text-muted-foreground">
                  {app.description}
                </small>
              </div>

              <div className="flex flex-col items-end gap-2">
                <small className="text-xs text-muted-foreground">
                  Applied: {new Date(app.applied_date).toLocaleDateString()}
                </small>
                <ApplicationDialog app={app} profile={profile} />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
