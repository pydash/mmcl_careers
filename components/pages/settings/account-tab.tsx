import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { userData } from "@/app/sample-data";

export default function AccountTab() {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3>Email: {userData.basic.email}</h3>
          <p>Your account email address.</p>
        </div>

        <div className="flex items-center gap-4">
          <Separator orientation="vertical" className="h-8" />
          <a href="#" className="underline text-blue-500">
            Edit
          </a>
        </div>
      </div>

      <Separator className="my-4" />
    </>
  );
}
