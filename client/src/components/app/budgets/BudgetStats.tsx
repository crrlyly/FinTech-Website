import StatCard from "../shared/StatCard";

const BudgetStats = () => {
  return (
    <div className={`w-full h-auto bg-pink-200 grid grid-cols-2 gap-3 p-5`}>
      <StatCard></StatCard>
      <StatCard></StatCard>
      <StatCard></StatCard>
      <StatCard></StatCard>
    </div>
  );
};

export default BudgetStats;