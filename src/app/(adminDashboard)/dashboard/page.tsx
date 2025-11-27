import EarningSummaryChart from "./_components/EarningSummeryChart";
import LatestUser from "./_components/LatestUser";
import StatsGrid from "./_components/Stats/StatsGrid";
import UserRatioChart from "./_components/UserRatioChart";

const statsData = [
  {
    title: "Total Earnings",
    value: "$24.88 K",
  },
  {
    title: "Total Employers",
    value: "6500",
  },
  {
    title: "Total Helpers",
    value: "4502",
  },
];

const DashboardPage = () => {
  return (
    <div className="lg:space-y-7 space-y-5 ">
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="lg:w-2/3 2xl:w-3/4">
          <EarningSummaryChart />
        </div>
        <div className="lg:w-1/3 2xl:w-1/4">
          <StatsGrid data={statsData} />
        </div>
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        <div className="lg:col-span-2 2xl:col-span-3">
          <LatestUser />
        </div>
        <div className="lg:col-span-1">
          <UserRatioChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
