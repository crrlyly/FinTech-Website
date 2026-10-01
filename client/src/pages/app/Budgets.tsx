import TopNav from "../../components/app/shared/TopNav";
import BudgetHeader from "../../components/app/budgets/BudgetHeader";
import BudgetStats from "../../components/app/budgets/BudgetStats";
import Tip from "../../components/app/shared/Tip";
import BudgetList from "../../components/app/budgets/BudgetList";
import BudgetActivate from "../../components/app/budgets/BudgetActivate";
import { useState } from "react";

export type ActivateBudgetProps = {
  activateBudget: boolean;
  handleClick: () => void;
};

export type GetActivationProp = {
  activateBudget: boolean;
};

const Budgets = () => {
  const [activateBudget, setActivateBudget] = useState<boolean>(false);

  function handleClick() {
    setActivateBudget((p) => !p);
  }

  return (
    <div className={`bg-(--primary) w-full min-h-dvh pt-20 relative flex flex-col`}>
      <TopNav title="Budgets"></TopNav>
      <BudgetActivate
        activateBudget={activateBudget}
        handleClick={handleClick}
      ></BudgetActivate>
      <BudgetHeader
        activateBudget={activateBudget}
        handleClick={handleClick}
      ></BudgetHeader>
      <BudgetStats activateBudget={activateBudget}></BudgetStats>
      <Tip
        activateBudget={activateBudget}
        tipString="Tip: a common guideline is 50% needs, 30% wants, 20% savings. Your category limits should add up to less than your monthly income — the unallocated amount is your buffer."
      ></Tip>
      <BudgetList activateBudget={activateBudget}></BudgetList>
    </div>
  );
};

export default Budgets;
