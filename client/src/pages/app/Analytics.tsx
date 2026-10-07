import Statistics from "../../components/app/analytics/Statistics";
import TopNav from "../../components/app/shared/TopNav";
import IncomevsExpensesChart from "../../components/app/analytics/IncomevsExpensesChart";
import SpendingByCategoryChart from "../../components/app/analytics/SpendingByCategoryChart";
import MonthlySpendingTrend from "../../components/app/analytics/MonthlySpendingTrend";
const Analytics = () => {
  return (
    <div
      className={`w-full min-h-dvh pt-20 lg:pt-18 relative lg:ml-70 lg:w-[calc(100%-17.5rem)] bg-(--primary) lg:px-5`}
    >
      <Statistics></Statistics>
      <TopNav title="Analytics"></TopNav>
      <div className={`w-full h-auto lg:grid lg:grid-cols-2`}>
        <IncomevsExpensesChart></IncomevsExpensesChart>
        <SpendingByCategoryChart></SpendingByCategoryChart>
        <MonthlySpendingTrend></MonthlySpendingTrend>
      </div>
    </div>
  );
};

export default Analytics;
