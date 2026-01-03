import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";

import { JobPostItemList } from "@/models/job-posts/job-post.list";
import { formatCurrency } from "@/utils/formatCurrency";
import { Separator } from "@/components/ui/separator";

export default function JobCard({ data }: { data: JobPostItemList }) {
  return (
    <div className="flex flex-col bg-gray-50 rounded-b-xl">
      <AspectRatio ratio={21 / 9} className="mb-4 rounded-t-xl bg-muted">
        <Image
          src="https://placehold.co/2100x900.png"
          alt={`Background image`}
          fill
          className="object-cover rounded-t-xl"
        />
      </AspectRatio>
      <div className="p-4 pt-0 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            {data.tags?.map((tag, index) => (
              <Badge key={index} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="font-semibold text-xl">{data.title}</h1>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {data.description}
          </p>
        </div>
        <Separator />
        <footer>
          <div className="flex justify-between items-center">
            <p className="text-muted-foreground text-sm">
              {formatCurrency(Number(data.salary_max))}/month
            </p>
            <Button variant="default">
              <Link href={`/applicant/jobs/${data.id}`}>View Details</Link>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
