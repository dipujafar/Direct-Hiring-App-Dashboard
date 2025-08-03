"use client";

import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartData = [
  { month: "Jan", earnings: 42 },
  { month: "Feb", earnings: 32 },
  { month: "Mar", earnings: 50 },
  { month: "Apr", earnings: 38 },
  { month: "May", earnings: 35 },
  { month: "Jun", earnings: 47 },
  { month: "Jul", earnings: 49 },
  { month: "Aug", earnings: 48 },
  { month: "Sep", earnings: 32 },
  { month: "Oct", earnings: 49 },
  { month: "Nov", earnings: 45 },
  { month: "Dec", earnings: 50 },
];

const chartConfig = {
  earnings: {
    label: "Earnings",
  },
};

export default function EarningSummaryChart() {
  return (
    <div className="w-full py-4 px-3 bg-[#E6F4EA] rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-700">Earning Summary</h2>
        <Select defaultValue="2025">
          <SelectTrigger className="w-20 h-8 bg-green-400 border-green-400 text-white text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">2023</SelectItem>
            <SelectItem value="2024">2024</SelectItem>
            <SelectItem value="2025">2025</SelectItem>
            <SelectItem value="2026">2026</SelectItem>
            <SelectItem value="2027">2027</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ChartContainer config={chartConfig} className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
            />
            <YAxis
              domain={[0, 50]}
              ticks={[0, 15, 35, 50]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => value.toString().padStart(2, "0")}
            />
            <Bar
              dataKey="earnings"
              radius={[2, 2, 0, 0]}
              //   @ts-ignore
              shape={(props) => {
                const { x, y, width, height } = props;
                // Create segmented bars with deeper green colors
                const segments = 4;
                const segmentHeight = height / segments;
                return (
                  <g>
                    {Array.from({ length: segments }, (_, i) => {
                      const segmentY = y + i * segmentHeight;
                      // Using deeper green colors with more saturation
                      const segmentFill = `hsl(142, ${85 - i * 8}%, ${
                        45 - i * 5
                      }%)`;
                      return (
                        <rect
                          key={i}
                          x={x}
                          y={segmentY}
                          width={width}
                          height={segmentHeight}
                          fill={segmentFill}
                          rx={i === 0 ? 2 : 0}
                          ry={i === 0 ? 2 : 0}
                          className="hover:brightness-110 transition-all duration-200 "
                        />
                      );
                    })}
                  </g>
                );
              }}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: "rgba(34, 197, 94, 0.1)" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
