import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";

type GridCardProps = {
  imgPath: string;
  badges: string[];
  title: string;
  description: string;
  salaryRange: string;
};
export default function GridCard({ data }: { data: GridCardProps }) {
  return (
    <>
      <Card className="!pt-0">
        <AspectRatio ratio={2.35}>
          <Image
            src={data.imgPath || "/placeholder.png"}
            alt="Job Image"
            fill
            className="object-cover rounded-t-lg"
          />
        </AspectRatio>
        <CardHeader>
          <div className="flex flex-row gap-2">
            {data.badges.map((badge, index) => (
              <Badge key={index} className="">
                {badge}
              </Badge>
            ))}
          </div>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <Separator />
        <CardFooter className="flex justify-between items-center">
          <CardDescription>{data.salaryRange}</CardDescription>
          <Button variant="default" size="sm">
            Action
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
