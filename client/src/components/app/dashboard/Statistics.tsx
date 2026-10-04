import StatisticCard from "./StatisticCard";
// import type { Transaction } from "../../../models/Transaction";

// export type StatisticsProps = {
//   transactions: Transaction[];
// };

const Statistics = () => {
  return (
    <div
      className={`bg-(--primary) w-full h-auto flex flex-col p-5 gap-5 md:grid md:grid-cols-2 lg:flex lg:flex-row`}
    >
      <StatisticCard job="total balance"></StatisticCard>
      <StatisticCard job="monthly income"></StatisticCard>
      <StatisticCard job="monthly expenses"></StatisticCard>
      <StatisticCard job="transactions"></StatisticCard>
    </div>
  );
};

export default Statistics;
