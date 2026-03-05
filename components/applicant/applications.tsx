import ApplicantNavbar from "@/components/applicant/navbar";
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
    status: "Under Review",
    statusColor: "bg-yellow-100 text-yellow-800",
    icon: Clock,
  },
  {
    id: 2,
    jobTitle: "Faculty - Computer Science",
    department: "Academic Affairs",
    appliedDate: "2024-02-10",
    status: "Interview Scheduled",
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
    status: "Under Review",
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
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              My Applications
            </h1>
            <p className="text-gray-600 mt-2">
              Track the status of your job applications
            </p>
          </div>

          <div className="mb-6 flex gap-2">
            <Button variant="outline" className="bg-white">
              All Applications
            </Button>
            <Button variant="outline">Under Review</Button>
            <Button variant="outline">Interviews</Button>
            <Button variant="outline">Submitted</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((app) => {
              const StatusIcon = app.icon;
              return (
                <Card
                  key={app.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">
                          {app.jobTitle}
                        </CardTitle>
                        <p className="text-sm text-gray-600">
                          {app.department}
                        </p>
                      </div>
                      <StatusIcon className="h-5 w-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <Badge className={app.statusColor}>{app.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Applied</span>
                        <span className="text-sm font-medium">
                          {new Date(app.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                      {app.interviewDate && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Interview
                          </span>
                          <span className="text-sm font-medium text-blue-600">
                            {new Date(app.interviewDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      View Details
                    </Button>
                    {app.status === "Under Review" && (
                      <Button
                        variant="outline"
                        className="flex-1 text-red-600 hover:text-red-700"
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
