import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import Job from "@/models/Job";
import { getDate } from "@/utils/formatDate";

export default function JobCard({ data }: { data: Job }) {
  return (
    <Item variant={"outline"}>
      <ItemHeader>
        <ItemTitle>{data.title}</ItemTitle>
      </ItemHeader>
      <ItemContent>
        <ItemDescription>{data.description}</ItemDescription>
        <ItemDescription>{data.department}</ItemDescription>
        <ItemDescription>
          {data.salary_min} - {data.salary_max}
        </ItemDescription>
      </ItemContent>
      <ItemFooter>
        <span>Expires at: {getDate(data.expiry_date)}</span>
      </ItemFooter>
    </Item>
  );
}
