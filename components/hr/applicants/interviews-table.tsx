"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { getDate } from "@/utils/formatDate";
import { useAllInterviews } from "@/hooks/hr/applicants/useAllInterviews";

export function InterviewsTable() {
  const { interviews, loading, error, refetch } = useAllInterviews();
  const [selected, setSelected] = useState<any>(null);

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const id = selected.id;

    const payload = {
      id,
      title: form.title.value,
      scheduled_at: form.scheduled_at.value,
      interview_mode: form.interview_mode.value,
      meeting_link: form.meeting_link.value,
      location: form.location.value,
    };

    const res = await fetch("/api/hr/applicants/interviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      refetch();
      setSelected(null);
    } else {
      console.error("Update failed");
    }
  };

  return (
    <>
      {loading && (
        <div className="mt-4 text-muted-foreground">Loading interviews...</div>
      )}
      {error && <div className="mt-4 text-destructive">Error: {error}</div>}

      {!loading && !error && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Interview Date</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {interviews.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-muted-foreground"
                >
                  No interviews found
                </TableCell>
              </TableRow>
            ) : (
              interviews.map((interview: any) => (
                <TableRow key={interview.id}>
                  <TableCell>{interview.appid}</TableCell>
                  <TableCell>
                    {interview.first_name} {interview.last_name}
                  </TableCell>
                  <TableCell>{interview.title?.trim() ?? "—"}</TableCell>
                  <TableCell>{getDate(interview.scheduled_at)}</TableCell>
                  <TableCell>{interview.email_address}</TableCell>

                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelected(interview)}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>

                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Interview</DialogTitle>
                        </DialogHeader>

                        {selected && (
                          <form onSubmit={handleUpdate} className="space-y-4">
                            <div className="grid gap-2">
                              <Label>Title</Label>
                              <Input
                                name="title"
                                defaultValue={selected.title}
                                required
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label>Interview Date</Label>
                              <Input
                                type="datetime-local"
                                name="scheduled_at"
                                defaultValue={new Date(selected.scheduled_at)
                                  .toISOString()
                                  .slice(0, 16)}
                                required
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label>Interview Mode</Label>
                              <Input
                                name="interview_mode"
                                defaultValue={selected.interview_mode}
                                required
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label>Meeting Link</Label>
                              <Input
                                name="meeting_link"
                                defaultValue={selected.meeting_link || ""}
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label>Location</Label>
                              <Input
                                name="location"
                                defaultValue={selected.location || ""}
                              />
                            </div>

                            <div className="flex justify-end gap-2">
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button type="submit">Save</Button>
                            </div>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
}
