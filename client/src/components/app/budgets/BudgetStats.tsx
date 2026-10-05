import { useBudgetUIStore } from "../../../stores/BudgetUIStore";
import StatCard from "../shared/StatCard";

const BudgetStats = () => {
  const activateBudget = useBudgetUIStore((s) => s.activateBudget);
  const checkEveryMonthActive = useBudgetUIStore((s) => s.activateEveryMonth);

  function isEveryMonthOn() {
    return checkEveryMonthActive || activateBudget ? "grid lg:flex" : "hidden";
  }
  return (
    <div
      className={`${isEveryMonthOn()} w-full h-auto bg-(--primary) grid-cols-2 gap-3 p-5 lg:gap-5`}
    >
      <StatCard action="income"></StatCard>
      <StatCard action="total"></StatCard>
      <StatCard action="spent"></StatCard>
      <StatCard action="unallocated"></StatCard>
    </div>
  );
};

export default BudgetStats;
