import AdminNavbar from "./navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BriefcaseIcon, Users, Clock, CheckCircle } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar />
      
  
      <main className="flex-1 lg:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Manage job postings, applicants, and recruitment
            </p>
          </div>

      
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                      className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-gray-200 last:border-0 gap-2"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{app.name}</p>
                        <p className="text-sm text-gray-600">{app.position}</p>
                      </div>
                      <div className="flex sm:block justify-between items-center sm:text-right">
                        <p className="text-xs text-gray-500">{app.date}</p>
                        <p
                          className={`text-xs font-medium sm:mt-1 ${
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

        
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common admin tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 space-y-0">
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