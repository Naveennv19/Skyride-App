import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  icon: JSX.Element;
  label: string;
  value: number;
  bg: string; // e.g. "blue", "green", "yellow"
}

const StatCard = ({ icon, label, value, bg }: StatCardProps) => {
  return (
    <Card className="skeuomorphic-card">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className={`bg-${bg}-100 p-3 rounded-full`}>
            {icon}
          </div>
          <div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-gray-600">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
