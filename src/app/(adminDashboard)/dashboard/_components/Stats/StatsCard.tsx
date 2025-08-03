import { Card } from "@/components/ui/card";

export interface StatsData {
  title: string;
  value: string;
}

interface StatsCardProps {
  data: StatsData;
}

const StatsCard = ({ data }: StatsCardProps) => {
  return (
    <Card className="p-6 bg-[#E6F4EA] border-none">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[#333]">
          {data.title}
        </h3>
        <p className="text-2xl font-bold text-[#009429]">
          {data.value}
        </p>
      </div>
    </Card>
  );
};

export default StatsCard;