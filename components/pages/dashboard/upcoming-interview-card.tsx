import { Separator } from "@/components/ui/separator";
import { Ellipsis } from "lucide-react";

type InterviewCardProps = {
  position: string;
  time: string;
  date: string;
};

export default function UpcomingInterviewCard({
  data,
}: {
  data: InterviewCardProps[];
}) {
  return (
    <div className="bg-gray-200 rounded-lg p-6 h-fit">
      <h2 className="text-xl font-semibold mb-4">Upcoming Interview</h2>

      {data.map((interview, index) => (
        <div key={index}>
          <div className="flex flex-row justify-between items-center p-4">
            <div className="flex flex-col">
              <div className="mb-2">{interview.position}</div>
              <div className="flex flex-row items-center">
                <div>{interview.time}</div>
                <Separator
                  orientation="vertical"
                  className="bg-gray-400 mx-2 !w-px !h-5"
                />
                <div>{interview.date}</div>
              </div>
            </div>
            <Ellipsis className="size-5" />
          </div>
          {index < data.length - 1 && <Separator className="bg-gray-300" />}
        </div>
      ))}
    </div>
  );
}
