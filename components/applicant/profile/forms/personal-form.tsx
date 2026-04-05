import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PersonalForm() {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="first_name">First Name</Label>
          <Input id="first_name" name="first_name" placeholder="John" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Last Name</Label>
          <Input id="last_name" name="last_name" placeholder="Doe" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="johndoe@mail.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile</Label>
          <Input id="mobile" name="mobile" placeholder="+1 234 567 890" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="landline">Landline</Label>
          <Input id="landline" name="landline" placeholder="+1 234 567 891" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="birthplace">Birthplace</Label>
          <Input id="birthplace" name="birthplace" placeholder="Anytown, USA" />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Address</Label>
          <textarea
            id="address"
            name="address"
            placeholder="123 Main St, Anytown, USA"
            className="w-full min-h-24 rounded-md border border-slate-200 px-3 py-2 text-sm shadow-xs outline-none transition focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="civil_status">Civil Status</Label>
          <Input id="civil_status" name="civil_status" placeholder="Single" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Input id="gender" name="gender" placeholder="Male" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="religion">Religion</Label>
          <Input id="religion" name="religion" placeholder="None" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="citizenship">Citizenship</Label>
          <Input id="citizenship" name="citizenship" placeholder="Filipino" />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" className="bg-red-600 hover:bg-red-700">
          Save Personal Information
        </Button>
      </div>
    </form>
  );
}
