import { Outlet } from "react-router-dom";
import { useTransactionStore } from "../../stores/TransactionStore.ts";
import { useEffect } from "react";

// If I'm on any page nested inside this route,
// render that page inside <Outlet />
const AppLayout = () => {

  const loadTransactions = useTransactionStore(
    (state) => state.loadStoreTransactions,
  );

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return <Outlet />;
};

export default AppLayout;
