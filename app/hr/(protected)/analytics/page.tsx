import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const metrics = [
  { label: "Time to fill", value: "32 days", helper: "-4 vs last month" },
  { label: "Offer acceptance", value: "78%", helper: "+6% vs last month" },
  { label: "Pipeline pass-through", value: "41%", helper: "Applied → Screen" },
  { label: "Hiring satisfaction", value: "4.6 / 5", helper: "HM surveys" },
];

const sources = [
  { name: "Referrals", percent: 38, count: 142 },
  { name: "Job boards", percent: 27, count: 101 },
  { name: "Careers site", percent: 22, count: 83 },
  { name: "Agencies", percent: 13, count: 49 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Hiring performance</p>
          <h2 className="text-xl font-semibold">Analytics</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Last 30 days</Button>
          <Button>Download report</Button>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <div className="mt-2 text-3xl font-semibold">{metric.value}</div>
            <p className="text-sm text-muted-foreground">{metric.helper}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Conversion</p>
            <h3 className="text-lg font-semibold">Funnel snapshot</h3>
          </div>
          <Badge variant="secondary">Live</Badge>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          {[
            {
              stage: "Applied",
              percent: 100,
              helper: "Baseline",
            },
            {
              stage: "Screen",
              percent: 62,
              helper: "Pass rate",
            },
            {
              stage: "Interview",
              percent: 35,
              helper: "Advancing",
            },
            {
              stage: "Offer",
              percent: 18,
              helper: "Sent",
            },
          ].map((item) => (
            <div key={item.stage} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>{item.stage}</span>
                <span className="text-muted-foreground">
                  {item.percent}% · {item.helper}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${item.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Top sources</p>
            <h3 className="text-lg font-semibold">Applicant origins</h3>
          </div>
          <Button variant="outline" size="sm">
            Manage sources
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-3">
          {sources.map((source) => (
            <div key={source.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>{source.name}</span>
                <span className="text-muted-foreground">
                  {source.count} applicants
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-primary"
                  style={{ width: `${source.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
