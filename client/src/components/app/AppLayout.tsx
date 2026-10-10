import { Outlet } from "react-router-dom";
import { useTransactionStore } from "../../stores/TransactionStore.ts";
import { useEffect } from "react";
import { useBudgetStore } from "../../stores/BudgetStore.ts";
import { useGoalStore } from "../../stores/GoalStore.ts";

// If I'm on any page nested inside this route,
// render that page inside <Outlet />
const AppLayout = () => {
  const loadTransactions = useTransactionStore(
    (state) => state.loadStoreTransactions,
  );

  const loadBudgets = useBudgetStore((s) => s.loadBudgets);
  const loadGoals = useGoalStore((s) => s.loadStoreGoals);

  useEffect(() => {
    loadTransactions();
    loadBudgets();
    loadGoals();
  }, [loadTransactions, loadBudgets, loadGoals]);

  return <Outlet />;
};

export default AppLayout;
