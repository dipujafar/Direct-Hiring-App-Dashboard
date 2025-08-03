import StatsCard, { StatsData } from "./StatsCard";

interface StatsGridProps {
  data: StatsData[];
}

const StatsGrid = ({ data }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
      {data.map((item, index) => (
        <StatsCard key={index} data={item} />
      ))}
    </div>
  );
};

export default StatsGrid;