import TopNav from "../../components/app/shared/TopNav";
import Header from "../../components/app/dashboard/Header";
import Statistics from "../../components/app/dashboard/Statistics";
import SpendingGraph from "../../components/app/dashboard/SpendingGraph";
import CurrencyConverter from "../../components/app/dashboard/CurrencyConverter";
import RecentTransactions from "../../components/app/dashboard/RecentTransactions";
import InvestmentCalculator from "../../components/app/dashboard/InvestmentCalculator";
import { useState } from "react";
import type { Transaction } from "../../models/Transaction";
import { getTransactions } from "../../services/transactionApi";

const Dashboard = () => {
  const [, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    try {
      const { transactions } = await getTransactions();
      setTransactions(transactions);
      console.log(transactions);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className={`w-full min-h-dvh pt-20 lg:pt-18 relative lg:ml-70 lg:w-[calc(100%-17.5rem)] bg-(--primary) lg:px-5`}
    >
      <TopNav title="Dashboard"></TopNav>
      <Header loadTransactions={loadTransactions}></Header>
      <Statistics></Statistics>
      <div
        className={`hidden lg:grid grid-cols-3 grid-rows-2 gap-10 mx-5 mt-5`}
      >
        <SpendingGraph loadTransactions={loadTransactions}></SpendingGraph>
        <CurrencyConverter></CurrencyConverter>
        <RecentTransactions></RecentTransactions>
        <InvestmentCalculator></InvestmentCalculator>
      </div>

      <div className={`block lg:hidden`}>
        <SpendingGraph loadTransactions={loadTransactions}></SpendingGraph>
        <CurrencyConverter></CurrencyConverter>
        <RecentTransactions></RecentTransactions>
        <InvestmentCalculator></InvestmentCalculator>
      </div>
    </div>
  );
};

export default Dashboard;
