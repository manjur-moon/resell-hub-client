"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function SimpleLineChart({ data = [], dataKey = "value" }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -12, bottom: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 6" vertical={false} />
          <XAxis
            dataKey="name"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickMargin={12}
            stroke="var(--muted)"
          />
          <YAxis
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            stroke="var(--muted)"
          />
          <Tooltip
            cursor={{ stroke: "rgba(249,115,22,0.24)", strokeWidth: 1 }}
            contentStyle={{
              borderRadius: 14,
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--ink)",
              boxShadow: "0 18px 44px rgba(47, 34, 26, 0.14)",
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 3, fill: "#f97316", stroke: "var(--surface)", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "#f97316", stroke: "var(--surface)", strokeWidth: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
