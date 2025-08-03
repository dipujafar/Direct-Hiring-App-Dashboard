"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function UserRatioChart() {
  const [selectedMonth, setSelectedMonth] = useState("August")

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const data = [
    { name: "Employers User", value: 40, color: "#22c55e" },
    { name: "Helpers User", value: 60, color: "#374151" },
  ]

  const chartConfig = {
    employers: {
      label: "Employers User",
      color: "#22c55e",
    },
    helpers: {
      label: "Helpers User",
      color: "#374151",
    },
  }

  return (
    <div className="h-full bg-[#E6F4EA] rounded-xl">
      <div className=" rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-semibold text-gray-900">User Ratio</h2>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-32 bg-white border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chart */}
        <div className="mb-8">
          <ChartContainer config={chartConfig} className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={0}
                  dataKey="value"
                  startAngle={90}
                  endAngle={450}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Legend */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span className="text-gray-900 font-medium">Employers User (40%)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gray-700 rounded-sm"></div>
            <span className="text-gray-900 font-medium">Helpers User (60%)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
