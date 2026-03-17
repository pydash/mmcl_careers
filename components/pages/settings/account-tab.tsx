import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { userData } from "@/app/sample-data";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export default function AccountTab() {
  return (
    <>
      <div className="flex flex-col gap-6 mt-6">
        <div className="flex flex-col">
          <label htmlFor="">Email Address</label>
          <Input
            type="email"
            defaultValue={userData.basic.email}
            className="max-w-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Password</label>
          <Input
            type="password"
            defaultValue={userData.basic.email}
            className="max-w-md"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Phone Number</label>
          <Input
            type="tel"
            defaultValue={userData.basic.phone}
            className="max-w-md"
          />
        </div>
        <div className="flex gap-2">
          <Button className="max-w-md">Save Changes</Button>
          <Button
            className="max-w-md border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600 transition"
            variant={"outline"}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </>
  );
}
