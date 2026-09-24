import TopNav from "../../components/app/shared/TopNav";
import BudgetHeader from "../../components/app/budgets/BudgetHeader";
import BudgetStats from "../../components/app/budgets/BudgetStats";
import Tip from "../../components/app/shared/Tip";
import BudgetList from "../../components/app/budgets/BudgetList";

const Budgets = () => {
  return (
    <div className={`w-full min-h-dvh pt-20 relative flex flex-col`}>
      <TopNav title="Budgets"></TopNav>
      <BudgetHeader></BudgetHeader>
      <BudgetStats></BudgetStats>
      <Tip tipString="Tip: a common guideline is 50% needs, 30% wants, 20% savings. Your category limits should add up to less than your monthly income — the unallocated amount is your buffer."></Tip>
      <BudgetList></BudgetList>
    </div>
  );
};

export default Budgets;
