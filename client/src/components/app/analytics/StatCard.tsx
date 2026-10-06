type StatCardProps = {
  action: string;
  value: number;
};
const StatCard = ({ action, value }:StatCardProps) => {
  return (
    <div className={`w-full h-auto bg-(--card) text-white p-5 border border-white/10 rounded-[20px]`}>
      <div className={`capitalize`}>{action}</div>
      <div className={`text-3xl`}>${value}</div>
    </div>
  );
};

export default StatCard;
