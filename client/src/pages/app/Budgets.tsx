import TopNav from "../../components/app/shared/TopNav";
import BudgetHeader from "../../components/app/budgets/BudgetHeader";

const Budgets = () => {
  return (
    <div className={`w-full min-h-dvh pt-20 relative flex flex-col`}>
      <TopNav title="Budgets"></TopNav>
      <BudgetHeader></BudgetHeader>
    </div>
  );
};

export default Budgets;
 