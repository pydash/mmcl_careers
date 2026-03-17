import HRNavbar from "@/components/hr/ui/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BriefcaseIcon, Users, Clock, CheckCircle } from "lucide-react";

export default function HrDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <HRNavbar />
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage job postings, applicants, and recruitment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <BriefcaseIcon className="h-4 w-4 text-red-600" />
                  Open Positions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">8</div>
                <p className="text-xs text-gray-500 mt-1">
                  Active job postings
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Users className="h-4 w-4 text-red-600" />
                  Total Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">124</div>
                <p className="text-xs text-gray-500 mt-1">
                  Received this month
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-red-600" />
                  Pending Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">34</div>
                <p className="text-xs text-gray-500 mt-1">Awaiting screening</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-red-600" />
                  Interviews Scheduled
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">12</div>
                <p className="text-xs text-gray-500 mt-1">Next 2 weeks</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>
                  Latest applicants for open positions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Sarah Johnson",
                      position: "Software Engineer",
                      date: "Today",
                      status: "New",
                    },
                    {
                      name: "Michael Chen",
                      position: "Faculty - CS",
                      date: "Yesterday",
                      status: "Under Review",
                    },
                    {
                      name: "Emma Davis",
                      position: "Guidance Counselor",
                      date: "2 days ago",
                      status: "Shortlisted",
                    },
                    {
                      name: "James Wilson",
                      position: "Research Assistant",
                      date: "3 days ago",
                      status: "Interview",
                    },
                  ].map((app, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{app.name}</p>
                        <p className="text-sm text-gray-600">{app.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{app.date}</p>
                        <p
                          className={`text-xs font-medium mt-1 ${
                            app.status === "New"
                              ? "text-blue-600"
                              : app.status === "Interview"
                                ? "text-green-600"
                                : "text-yellow-600"
                          }`}
                        >
                          {app.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common HR tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Post New Job
                </Button>
                <Button variant="outline" className="w-full">
                  Review Applications
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Interview
                </Button>
                <Button variant="outline" className="w-full">
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
