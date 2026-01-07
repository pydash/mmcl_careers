import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function SideDetails({ jobId }: { jobId: string }) {
  return (
    <div className="flex flex-col bg-gray-100 p-4 rounded-lg gap-4">
      <div className="flex flex-col">
        <h3>$300-400</h3>
        <p className="text-muted-foreground text-sm">Salary Range</p>
      </div>
      <div className="flex flex-col">
        <h3>sample@email.com</h3>
        <p className="text-muted-foreground text-sm">Contact Email</p>
      </div>
      <div className="flex flex-col">
        <h3>Part-time</h3>
        <p className="text-muted-foreground text-sm">Job Type</p>
      </div>
      <div className="flex flex-col">
        <h3>College of Computing Science</h3>
        <p className="text-muted-foreground text-sm">Department</p>
      </div>
      <div className="flex flex-col">
        <h3>Sep 30, 2025</h3>
        <p className="text-muted-foreground text-sm">Application Deadline</p>
      </div>
      <Separator />
      <Button variant="default" className="w-full" asChild>
        <Link href={`/applicant/jobs/${jobId}/apply`}>Apply Now</Link>
      </Button>
    </div>
  );
}

export default function JobDetailsContainer({ jobId }: { jobId: string }) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Job Title</h1>
      <div className="grid grid-cols-[7fr_3fr] gap-4">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">Description</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
              officiis voluptatem recusandae vitae explicabo quia non laborum
              animi iure nesciunt dolores accusantium rem, et sed aspernatur,
              quaerat dicta dolor a obcaecati. Provident repellat ullam quasi,
              adipisci voluptas numquam nesciunt corporis fugit nihil enim
              perferendis unde odit laborum dolores. Praesentium, dolorum!
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">Responsibilities</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
              odio doloremque fuga cumque optio, quae saepe. Adipisci nemo,
              atque sed inventore optio beatae in magni accusantium perspiciatis
              sit facilis explicabo suscipit delectus blanditiis voluptate
              itaque quae autem nisi, dolores ipsam sint provident. Maxime
              dignissimos veritatis rerum nihil! Sunt laudantium obcaecati
              eveniet atque molestiae quaerat dolorem consequatur neque, aperiam
              ducimus perferendis!
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold">Requirements</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam,
              distinctio. Facilis, pariatur modi at officia consequuntur eos
              provident doloribus aliquid excepturi. Rem natus quod corrupti
              sit. Aliquam fugiat dicta labore voluptatibus temporibus numquam
              quam minus quasi. Dolorum laudantium quidem dolore odio animi,
              illum enim sint dignissimos iusto commodi porro.
            </p>
          </div>
        </div>
        <div>
          <SideDetails jobId={jobId} />
        </div>
      </div>
    </div>
  );
}
