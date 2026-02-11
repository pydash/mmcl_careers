"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useAnalytics } from "@/hooks/admin/analytics/useAnalytics";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  const { analytics, loading } = useAnalytics();

  const totalApplications = analytics?.totalApplications;
  const totalHires = analytics?.totalHires;
  const totalOpenPositions = analytics?.totalOpenPositions;
  const offerAcceptance = analytics?.offerAcceptanceRate;
  const rawApplicationTrend = analytics?.applicationTrend ?? [];
  const departmentData = analytics?.applicationsByDepartment ?? [];
  const monthOrder = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const applicationTrend = monthOrder.map((month) => {
    const match = rawApplicationTrend.find(
      (item) => String(item.month).trim().toLowerCase() === month.toLowerCase(),
    );
    return {
      month,
      applications:
        match?.applications != null ? Number(match.applications) : 0,
      hired: match?.hired != null ? Number(match.hired) : 0,
    };
  });

  const metrics = [
    {
      label: "Total Applications",
      value: loading ? "—" : (totalApplications?.this_month?.toString() ?? "0"),
      change: loading
        ? "—"
        : totalApplications?.percentage_change != null
          ? `${totalApplications.percentage_change > 0 ? "+" : ""}${totalApplications.percentage_change}%`
          : "0%",
    },
    {
      label: "Total Hired",
      value: loading ? "—" : (totalHires?.this_month?.toString() ?? "0"),
      change: loading
        ? "—"
        : totalHires?.absolute_change != null
          ? `${totalHires.absolute_change > 0 ? "+" : ""}${totalHires.absolute_change}`
          : "0",
    },
    {
      label: "Open Positions",
      value: loading
        ? "—"
        : (totalOpenPositions?.this_month?.toString() ?? "0"),
      change: loading
        ? "—"
        : totalOpenPositions?.absolute_change != null
          ? `${totalOpenPositions.absolute_change > 0 ? "+" : ""}${totalOpenPositions.absolute_change}`
          : "0",
    },
    {
      label: "Offer Acceptance",
      value: loading
        ? "—"
        : offerAcceptance?.acceptance_rate != null
          ? `${offerAcceptance.acceptance_rate}%`
          : "0%",
      change: loading
        ? "—"
        : offerAcceptance?.accepted != null && offerAcceptance?.rejected != null
          ? `${offerAcceptance.accepted}/${offerAcceptance.accepted + offerAcceptance.rejected}`
          : "0/0",
    },
  ];

  return (
    <div className="space-y-8 py-8">
      {/* Key Metrics */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.label} className="p-6">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-bold">{metric.value}</span>
                <Badge variant="secondary" className="text-xs">
                  {metric.change}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Trend */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Application Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={applicationTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="applications"
                stroke="#3b82f6"
                name="Applications"
              />
              <Line
                type="monotone"
                dataKey="hired"
                stroke="#10b981"
                name="Hired"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Applications by Department */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">
            Applications by Department
          </h3>
          {loading ? (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              Loading...
            </div>
          ) : departmentData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color || "#8884d8"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              No department data available
            </div>
          )}
        </Card>
      </section>
    </div>
  );
}
