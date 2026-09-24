interface StatCardProps {
  area?: "balance" | "saved" | "available";
}
const StatCard = ({ area }: StatCardProps) => {
  return (
    <div
      style={{ gridArea: area }}
      className={`w-full h-auto bg-pink-200 border p-3`}
    >
      <div>Income this month</div>
      <div>$5000.00</div>
    </div>
  );
};

export default StatCard;
