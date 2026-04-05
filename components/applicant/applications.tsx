import ApplicantNavbar from "@/components/applicant/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, Calendar } from "lucide-react";

const applications = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    department: "Information Technology",
    appliedDate: "2024-02-15",
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  {
    id: 2,
    jobTitle: "Faculty - Computer Science",
    department: "Academic Affairs",
    appliedDate: "2024-02-10",
    status: "Interview",
    statusColor: "bg-blue-100 text-blue-800",
    icon: Calendar,
    interviewDate: "2024-02-28",
  },
  {
    id: 3,
    jobTitle: "Guidance Counselor",
    department: "Student Services",
    appliedDate: "2024-02-05",
    status: "Submitted",
    statusColor: "bg-gray-100 text-gray-800",
    icon: CheckCircle,
  },
  {
    id: 4,
    jobTitle: "Research Assistant",
    department: "Research & Development",
    appliedDate: "2024-01-28",
    status: "Rejected",
    statusColor: "bg-red-100 text-red-800",
    icon: XCircle,
  },
  {
    id: 5,
    jobTitle: "Marketing Coordinator",
    department: "Marketing & Communications",
    appliedDate: "2024-01-20",
    status: "Pending",
    statusColor: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  {
    id: 6,
    jobTitle: "Library Assistant",
    department: "Library Services",
    appliedDate: "2024-01-15",
    status: "Submitted",
    statusColor: "bg-gray-100 text-gray-800",
    icon: CheckCircle,
  },
];

export default function ApplicantApplications() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <ApplicantNavbar />
      
  
      <div className="flex-1 lg:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 mt-16 lg:mt-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              My Applications
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Track the status of your job applications
            </p>
          </div>

          
          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["All Applications", "Pending", "Interviews", "Submitted"].map(
              (filter) => (
                <button
                  key={filter}
                  className="text-xs whitespace-nowrap px-4 py-1.5 rounded-full border border-gray-200 bg-white text-gray-600 hover:border-red-400 hover:text-red-700 transition-colors shrink-0"
                >
                  {filter}
                </button>
              ),
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => {
              const StatusIcon = app.icon;
              return (
                <Card
                  key={app.id}
                  className="hover:shadow-lg transition-shadow flex flex-col"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-base mb-1 leading-tight">
                          {app.jobTitle}
                        </CardTitle>
                        <p className="text-xs text-gray-500">
                          {app.department}
                        </p>
                      </div>
                      <StatusIcon className="h-5 w-5 text-gray-400 shrink-0" />
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Status</span>
                        <Badge className={`${app.statusColor} text-[10px] sm:text-xs font-semibold`}>
                          {app.status}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Applied</span>
                        <span className="text-xs font-medium text-gray-700">
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {app.interviewDate && (
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Interview</span>
                          <span className="text-xs font-bold text-blue-600">
                            {new Date(app.interviewDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col sm:flex-row gap-2">
                    <Button asChild variant="outline" size="sm" className="w-full sm:flex-1">
                      <Link href={`/applications/${app.id}`}>View Details</Link>
                    </Button>
                    {app.status === "Pending" && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:flex-1 text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                      >
                        Withdraw
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}