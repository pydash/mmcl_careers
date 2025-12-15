import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PreferenceTab() {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <label htmlFor="">Theme</label>
          <span className="text-sm text-muted-foreground">
            Select your preferred theme.
          </span>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
