"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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

const pipelineData = [
  { stage: "Applied", count: 340, percentage: 100 },
  { stage: "Screen", count: 190, percentage: 56 },
  { stage: "Interview", count: 88, percentage: 26 },
  { stage: "Offer", count: 22, percentage: 6 },
  { stage: "Hired", count: 18, percentage: 5 },
];

const applicationTrend = [
  { month: "Jan", applications: 45, hired: 3 },
  { month: "Feb", applications: 62, hired: 5 },
  { month: "Mar", applications: 78, hired: 6 },
  { month: "Apr", applications: 92, hired: 8 },
  { month: "May", applications: 110, hired: 9 },
  { month: "Jun", applications: 135, hired: 11 },
];

const departmentData = [
  { name: "Engineering", value: 145, color: "#3b82f6" },
  { name: "Marketing", value: 78, color: "#ef4444" },
  { name: "HR", value: 45, color: "#10b981" },
  { name: "Sales", value: 72, color: "#f59e0b" },
];

const jobPerformance = [
  { title: "Senior Software Engineer", applications: 125, conversion: 8.8 },
  { title: "Product Manager", applications: 98, conversion: 6.1 },
  { title: "Data Analyst", applications: 87, conversion: 5.7 },
  { title: "UX Designer", applications: 76, conversion: 7.9 },
  { title: "Backend Engineer", applications: 65, conversion: 6.2 },
];

const metrics = [
  { label: "Total Applications", value: "340", change: "+12%" },
  { label: "Total Hired", value: "18", change: "+2" },
  { label: "Avg Time to Hire", value: "32 days", change: "-3 days" },
  { label: "Offer Acceptance", value: "82%", change: "+5%" },
];

export default function AnalyticsPage() {
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
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </section>

      <Separator />

      {/* Pipeline Breakdown */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Hiring Pipeline</h2>
        <Card className="p-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pipelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="stage" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="Count" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
            {pipelineData.map((stage) => (
              <div key={stage.stage} className="text-center">
                <p className="text-sm text-muted-foreground">{stage.stage}</p>
                <p className="text-2xl font-bold">{stage.count}</p>
                <p className="text-xs text-muted-foreground">
                  {stage.percentage}%
                </p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Separator />

      {/* Top Performing Jobs */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Top Performing Jobs</h2>
        <Card className="p-6">
          <div className="space-y-4">
            {jobPerformance.map((job, index) => (
              <div
                key={index}
                className="flex items-center justify-between pb-4 border-b last:border-b-0"
              >
                <div className="flex-1">
                  <p className="font-semibold">{job.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {job.applications} applications
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">
                    {job.conversion}%
                  </p>
                  <p className="text-xs text-muted-foreground">conversion</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
