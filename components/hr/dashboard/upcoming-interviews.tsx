import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const interviewSlots = [
  "10:00 AM · Product Designer",
  "1:00 PM · Backend Engineer",
  "3:30 PM · Data Analyst",
];

export default function UpcomingInterviews() {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Upcoming interviews</p>
          <h3 className="text-lg font-semibold">Today</h3>
        </div>
        <Button size="sm" variant="default">
          Schedule
        </Button>
      </div>
      <Separator className="my-4" />
      <ul className="space-y-3">
        {interviewSlots.map((slot) => (
          <li
            key={slot}
            className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2"
          >
            <span className="text-sm">{slot}</span>
            <Button size="sm" variant="ghost">
              Details
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
