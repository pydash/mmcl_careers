import { Item, ItemTitle, ItemDescription } from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ExploreJobsCardProps = {
  jobTitle: string;
  tags: string[];
}[];
export default function ExploreJobsCard({
  data,
}: {
  data: ExploreJobsCardProps;
}) {
  return (
    <div className=" bg-gray-200 rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-4">Explore Jobs</h2>
      <div className="grid grid-cols-2 gap-3">
        {data.map((job, index) => (
          <Item
            key={index}
            className="mb-3 bg-gray-300 p-4 rounded-lg flex flex-col items-start"
          >
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, tagIndex) => (
                <Badge key={tagIndex}>{tag}</Badge>
              ))}
            </div>
            <ItemTitle className="text-lg font-semibold mb-5">
              {job.jobTitle}
            </ItemTitle>
            <Button variant="outline" size="sm">
              Apply Now
            </Button>
          </Item>
        ))}
      </div>
    </div>
  );
}
