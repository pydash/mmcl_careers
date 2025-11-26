import { Separator } from "@/components/ui/separator";
import { type LucideIcon } from "lucide-react";

type OverviewCardProps = {
  title: string;
  content: string;
  icon: LucideIcon;
}[];

export default function OverviewCard({ data }: { data: OverviewCardProps }) {
  return (
    <>
      <div className="overview-card bg-gray-200 rounded-xl p-6">
        <h2 className="overview-card-title text-xl font-semibold">Overview</h2>
        <div className="overview-content flex flex-row my-4">
          {data.map((item, index) => (
            <div
              key={item.title}
              className="flex flex-row items-stretch w-full mt-4"
            >
              <div className="overview-item flex-1 px-2">
                <item.icon className="overview-item-icon mb-2 size-6" />
                <h3 className="overview-item-title">{item.title}</h3>
                <p className="overview-item-content">{item.content}</p>
              </div>
              {index < data.length - 1 && (
                <Separator
                  orientation="vertical"
                  className="bg-gray-300 mx-4"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
