import TopNav from "../../components/app/shared/TopNav";
import Header from "../../components/app/dashboard/Header";
import Statistics from "../../components/app/dashboard/Statistics";
import SpendingGraph from "../../components/app/dashboard/SpendingGraph";
 import CurrencyConverter from "../../components/app/dashboard/CurrencyConverter";
 import RecentTransactions from "../../components/app/dashboard/RecentTransactions";
 import InvestmentCalculator from "../../components/app/dashboard/InvestmentCalculator";

const Dashboard = () => {
  return (
    <div className={`w-full min-h-dvh pt-20 relative`}>
      <TopNav title="Dashboard"></TopNav>
      <Header></Header>
      <Statistics></Statistics>
      <SpendingGraph></SpendingGraph>
      <CurrencyConverter></CurrencyConverter>
      <RecentTransactions></RecentTransactions>
      <InvestmentCalculator></InvestmentCalculator>
    </div>
  );
};

export default Dashboard;
