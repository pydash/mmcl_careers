"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApplicationDetails } from "@/hooks/applicant/applications/useApplicationDetails";
import { formatCurrency } from "@/utils/formatCurrency";
import { getDateString } from "@/utils/formatDate";

export default function ApplicationDetailsPage({ app_id }: { app_id: string }) {
  const {
    application: details,
    loading,
    error,
  } = useApplicationDetails(app_id);

  if (loading) {
    return <div>Loading application details...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!details) {
    return <div>Application not found.</div>;
  }

  const { application, interview, offer } = details;
  const hasInterview = Boolean(interview && interview.id);
  const hasOffer = Boolean(offer && offer.id);

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue="application">
        <TabsList className="bg-gray-50 p-1 rounded-lg border border-gray-200 mb-6 inline-flex">
          <TabsTrigger
            value="application"
            className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
          >
            Application
          </TabsTrigger>
          {hasInterview && (
            <TabsTrigger
              value="interview"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
            >
              Interview
            </TabsTrigger>
          )}
          {hasOffer && (
            <TabsTrigger
              value="offer"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-700 data-[state=active]:font-medium rounded-md px-4 py-1 text-sm transition-all"
            >
              Offer
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="application">
          <div className="flex flex-col gap-6">
            {/* Job Details Section */}
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b">
                Job Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Position
                  </p>
                  <p className="font-semibold mt-1">{application.position}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Department
                  </p>
                  <p className="font-semibold mt-1">{application.department}</p>
                </div>
              </div>
              {application.description && (
                <div className="flex flex-col gap-2 mt-6">
                  <p className="text-xs text-muted-foreground uppercase">
                    Description
                  </p>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {application.description}
                  </p>
                </div>
              )}
            </div>

            {/* Application Details Section */}
            <div className="border rounded-lg p-6 bg-white">
              <h3 className="text-base font-semibold text-gray-900 mb-4 pb-2 border-b">
                Application Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Status
                  </p>
                  <div className="mt-1">
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 capitalize">
                      {application.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Applied On
                  </p>
                  <p className="font-semibold">
                    {getDateString(new Date(application.created_at))}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Application ID
                  </p>
                  <p className="font-semibold">{application.id}</p>
                </div>
              </div>
            </div>

            {/* Pitch and Notes Section */}
            <div className="border rounded-lg p-6 bg-white">
              <div className="flex flex-col gap-4">
                {application.pitch ? (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-base font-bold">Pitch</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {application.pitch}
                    </p>
                  </div>
                ) : null}

                {application.notes ? (
                  <div className="flex flex-col gap-2">
                    <h2 className="text-base font-bold">Notes</h2>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {application.notes}
                    </p>
                  </div>
                ) : null}

                {!application.pitch && !application.notes ? (
                  <p className="text-sm text-muted-foreground">
                    No additional details provided.
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </TabsContent>

        {hasInterview && interview && (
          <TabsContent value="interview">
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Status
                  </p>
                  <div className="mt-1">
                    <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 capitalize">
                      {interview.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Mode
                  </p>
                  <p className="font-semibold capitalize">{interview.mode}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Scheduled At
                  </p>
                  <p className="font-semibold">
                    {new Date(interview.scheduled_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Interviewer
                  </p>
                  <p className="font-semibold">{interview.interviewer}</p>
                </div>
                {interview.link ? (
                  <div className="flex flex-col">
                    <p className="text-xs text-muted-foreground uppercase">
                      Meeting Link
                    </p>
                    <p className="font-semibold break-all">{interview.link}</p>
                  </div>
                ) : null}
                {interview.location ? (
                  <div className="flex flex-col">
                    <p className="text-xs text-muted-foreground uppercase">
                      Location
                    </p>
                    <p className="font-semibold">{interview.location}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </TabsContent>
        )}

        {hasOffer && offer && (
          <TabsContent value="offer">
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Status
                  </p>
                  <div className="mt-1">
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 capitalize">
                      {offer.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Offer
                  </p>
                  <p className="font-semibold">{formatCurrency(offer.offer)}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Offered On
                  </p>
                  <p className="font-semibold">
                    {new Date(offer.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Responded At
                  </p>
                  <p className="font-semibold">
                    {offer.responded_at
                      ? new Date(offer.responded_at).toLocaleDateString()
                      : "Not yet responded"}
                  </p>
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground uppercase">
                    Offer ID
                  </p>
                  <p className="font-semibold text-sm">{offer.id}</p>
                </div>
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
