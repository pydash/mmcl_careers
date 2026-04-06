"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { jsPDF } from "jspdf";

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

const weeklyActivity = [
  { day: "Mon", count: 18 },
  { day: "Tue", count: 24 },
  { day: "Wed", count: 31 },
  { day: "Thu", count: 22 },
  { day: "Fri", count: 28 },
  { day: "Sat", count: 12 },
  { day: "Sun", count: 9 },
];

const sampleHighlights = [
  {
    title: "Fastest role to fill",
    value: "Admin Assistant",
    helper: "18 days average",
  },
  {
    title: "Best source",
    value: "Referrals",
    helper: "38% of hires",
  },
  {
    title: "Highest drop-off",
    value: "Screening",
    helper: "19% candidate loss",
  },
];

export default function AnalyticsPage() {
  const handleDownloadReport = () => {
    const funnel = [
      { stage: "Applied", percent: 100, helper: "Baseline" },
      { stage: "Screen", percent: 62, helper: "Pass rate" },
      { stage: "Interview", percent: 35, helper: "Advancing" },
      { stage: "Offer", percent: 18, helper: "Sent" },
    ];

    const doc = new jsPDF();
    let y = 16;

    doc.setFontSize(18);
    doc.text("HR Analytics Report", 14, y);
    y += 8;

    doc.setFontSize(11);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, y);
    y += 10;

    doc.setFontSize(13);
    doc.text("Key Metrics", 14, y);
    y += 7;
    doc.setFontSize(11);
    metrics.forEach((metric) => {
      doc.text(`- ${metric.label}: ${metric.value} (${metric.helper})`, 14, y);
      y += 6;
    });

    y += 4;
    doc.setFontSize(13);
    doc.text("Funnel", 14, y);
    y += 7;
    doc.setFontSize(11);
    funnel.forEach((item) => {
      doc.text(`- ${item.stage}: ${item.percent}% (${item.helper})`, 14, y);
      y += 6;
    });

    y += 4;
    doc.setFontSize(13);
    doc.text("Top Sources", 14, y);
    y += 7;
    doc.setFontSize(11);
    sources.forEach((source) => {
      doc.text(
        `- ${source.name}: ${source.count} applicants (${source.percent}%)`,
        14,
        y,
      );
      y += 6;
    });

    y += 4;
    doc.setFontSize(13);
    doc.text("Weekly Activity", 14, y);
    y += 7;
    doc.setFontSize(11);
    weeklyActivity.forEach((item) => {
      doc.text(`- ${item.day}: ${item.count} applications`, 14, y);
      y += 6;
    });

    doc.save(`analytics-report-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-linear-to-r from-slate-50 via-white to-blue-50 p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-blue-700">Hiring performance</p>
            <h2 className="text-2xl font-semibold text-slate-900">Analytics</h2>
            <p className="mt-1 text-sm text-slate-600">
              Sample view of recruitment metrics, trends, and sources.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleDownloadReport}
            >
              Download report
            </Button>
          </div>
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className={`rounded-xl border p-4 shadow-sm transition-shadow hover:shadow-md ${
              index === 0
                ? "border-blue-100 bg-blue-50/70"
                : index === 1
                  ? "border-emerald-100 bg-emerald-50/70"
                  : index === 2
                    ? "border-amber-100 bg-amber-50/70"
                    : "border-violet-100 bg-violet-50/70"
            }`}
          >
            <p className="text-sm text-slate-600">{metric.label}</p>
            <div className="mt-2 text-3xl font-semibold text-slate-900">
              {metric.value}
            </div>
            <p className="text-sm text-slate-600">{metric.helper}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {sampleHighlights.map((item) => (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-sm text-muted-foreground">{item.title}</p>
            <div className="mt-2 text-xl font-semibold text-slate-900">
              {item.value}
            </div>
            <p className="text-sm text-slate-600">{item.helper}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-4 shadow-sm">
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
                    className={`h-2 rounded-full ${
                      item.stage === "Applied"
                        ? "bg-blue-500"
                        : item.stage === "Screen"
                          ? "bg-emerald-500"
                          : item.stage === "Interview"
                            ? "bg-amber-500"
                            : "bg-violet-500"
                    }`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Weekly activity</p>
              <h3 className="text-lg font-semibold">Sample applications</h3>
            </div>
            <Badge variant="secondary">This week</Badge>
          </div>
          <Separator className="my-4" />
          <div className="flex h-56 items-end gap-3 rounded-lg bg-slate-50 p-4">
            {weeklyActivity.map((item) => (
              <div
                key={item.day}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div className="flex h-40 w-full items-end justify-center">
                  <div
                    className="w-full max-w-10 rounded-t-lg bg-linear-to-t from-blue-600 to-sky-400"
                    style={{ height: `${item.count * 4}px` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-card p-4 shadow-sm">
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
          {sources.map((source, index) => (
            <div key={source.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>{source.name}</span>
                <span className="text-muted-foreground">
                  {source.count} applicants
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted">
                <div
                  className={`h-2 rounded-full ${
                    index === 0
                      ? "bg-blue-500"
                      : index === 1
                        ? "bg-emerald-500"
                        : index === 2
                          ? "bg-amber-500"
                          : "bg-violet-500"
                  }`}
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
