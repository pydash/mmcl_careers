import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Calendar, Video, MapPin } from "lucide-react";

export default function InterviewPrompt({
  open,
  setOpen,
  appId,
  save,
  setStatus,
}) {
  const [formData, setFormData] = useState({
    app_id: appId || "",
    title: "",
    scheduled_at: "",
    interview_mode: "",
    meeting_link: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/hr/applicants/interviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to save interview");
      }

      const data = await res.json();
      console.log("Saved:", data);

      await save({ status: "For interview" });
      setStatus(appId, "For interview");

      setOpen(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={loading ? () => {} : setOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
        <div className="bg-slate-900 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-black tracking-tight flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-500" />
              Schedule Interview
            </DialogTitle>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-widest mt-1">
              Applicant ID: {appId}
            </p>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
              Interview Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g. Technical Assessment - Round 1"
              className="h-11 rounded-lg border-slate-200 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduled_at" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                Date & Time
              </Label>
              <Input
                id="scheduled_at"
                name="scheduled_at"
                type="datetime-local"
                className="h-11 rounded-lg border-slate-200 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium"
                value={formData.scheduled_at}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interview_mode" className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                Mode
              </Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, interview_mode: value }))
                }
                value={formData.interview_mode}
                required
              >
                <SelectTrigger className="h-11 rounded-lg border-slate-200 focus:ring-red-600/20 focus:border-red-600 transition-all font-medium">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200">
                  <SelectItem value="ONLINE" className="font-medium focus:bg-red-50 focus:text-red-700">ONLINE</SelectItem>
                  <SelectItem value="ONSITE" className="font-medium focus:bg-red-50 focus:text-red-700">ONSITE</SelectItem>
                  <SelectItem value="HYBRID" className="font-medium focus:bg-red-50 focus:text-red-700">HYBRID</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meeting_link" className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <Video className="h-3 w-3" /> Meeting Link
            </Label>
            <Input
              id="meeting_link"
              name="meeting_link"
              placeholder="https://zoom.us/j/..."
              className="h-11 rounded-lg border-slate-200 focus:ring-red-600/20 focus:border-red-600 transition-all"
              value={formData.meeting_link}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
              <MapPin className="h-3 w-3" /> Physical Location
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g. Conference Room B, 4th Floor"
              className="h-11 rounded-lg border-slate-200 focus:ring-red-600/20 focus:border-red-600 transition-all"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="ghost"
              className="font-bold text-slate-500 hover:text-slate-900"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-red-600 hover:bg-red-700 text-white px-8 font-black transition-all active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                "Save Schedule"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}