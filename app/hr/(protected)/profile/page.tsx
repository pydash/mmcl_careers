"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

//placeholder palang ! kasi sa admin database kukunin!
export default function HrProfilePage() {
  const hr = {
    name: "Ashlie Argana",
    role: "HR Manager",
    department: "Human Resources",
    email: "ashlie.argana@mmcl.edu.ph",
    phone: "+63 9XX XXX XXXX",
    status: "Active",
    joined: "January 2024",
    avatar: "",
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Welcome, {hr.name}</h2>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={hr.avatar} />
              <AvatarFallback>{hr.name[0]}</AvatarFallback>
            </Avatar>

            <div className="text-center">
              <h3 className="text-lg font-semibold">{hr.name}</h3>
              <p className="text-sm text-muted-foreground">{hr.role}</p>
            </div>

            <Badge variant="secondary">{hr.status}</Badge>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Full Name</p>
                <p className="font-medium">{hr.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Department</p>
                <p className="font-medium">{hr.department}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{hr.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium">{hr.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Role</p>
                <p className="font-medium">{hr.role}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Joined</p>
                <p className="font-medium">{hr.joined}</p>
              </div>
            </div>

            <Separator />

            <div className="flex gap-2">
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
