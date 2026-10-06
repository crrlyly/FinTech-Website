import Statistics from "../../components/app/analytics/Statistics";
import TopNav from "../../components/app/shared/TopNav";
import IncomevsExpenses from "../../components/app/analytics/IncomevsExpenses";
const Analytics = () => {
  return (
    <div
      className={`w-full min-h-dvh pt-20 lg:pt-18 relative lg:ml-70 lg:w-[calc(100%-17.5rem)] bg-(--primary) lg:px-5`}
    >
      <Statistics></Statistics>
      <TopNav title="Analytics"></TopNav>
      <IncomevsExpenses></IncomevsExpenses>
    </div>
  );
};

export default Analytics;
