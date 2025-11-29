"use client";

import { useGetDashboardStatisticsQuery } from "@/redux/api/adminApi";
import StatsCard from "./StatsCard";

const StatsGrid = () => {
  const { data: statsData } = useGetDashboardStatisticsQuery(undefined);
  const api = statsData?.data;

  // helper function to format earnings
  const formatCurrency = (num: number) => {
    if (!num) return "$0";
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num}`;
  };

  const statsDataModel = [
    {
      title: "Total Earnings",
      value: formatCurrency(api?.totalEarnings),
    },
    {
      title: "Total Employers",
      value: api?.totalEmployee ?? 0,
    },
    {
      title: "Total Helpers",
      value: api?.totalHelper ?? 0,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
      {statsDataModel?.map((item, index) => (
        <StatsCard key={index} data={item} />
      ))}
    </div>
  );
};

export default StatsGrid;
