import TopNav from "../../components/app/shared/TopNav";
import BudgetHeader from "../../components/app/budgets/BudgetHeader";
import BudgetStats from "../../components/app/budgets/BudgetStats";
import Tip from "../../components/app/shared/Tip";
import BudgetList from "../../components/app/budgets/BudgetList";
import BudgetActivate from "../../components/app/budgets/BudgetActivate";
import { useBudgetUIStore } from "../../stores/BudgetUIStore";
import { useUser } from "../../context/UserContext";
import { useEffect } from "react";

const Budgets = () => {
  const { user } = useUser();
  const setActivateEveryMonthFromUser = useBudgetUIStore(
    (s) => s.setActivateEveryMonthFromUser,
  );

  useEffect(() => {
    setActivateEveryMonthFromUser(user);
  }, [user, setActivateEveryMonthFromUser]);

  return (
    <div
      className={` w-full min-h-dvh pt-20 lg:pt-18 lg:w-[calc(100%-17.5rem)] relative flex flex-col lg:ml-70 lg:px-5 bg-(--primary)`}
    >
      <TopNav title="Budgets"></TopNav>
      <BudgetActivate></BudgetActivate>
      <BudgetHeader></BudgetHeader>
      <BudgetStats></BudgetStats>
      <Tip tipString="Tip: a common guideline is 50% needs, 30% wants, 20% savings. Your category limits should add up to less than your monthly income — the unallocated amount is your buffer."></Tip>
      <BudgetList></BudgetList>
    </div>
  );
};

export default Budgets;
