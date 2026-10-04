import StatisticCard from "./StatisticCard";
import type { Transaction } from "../../../models/Transaction";

export type StatisticsProps = {
  transactions: Transaction[];
};

const Statistics = ({ transactions }: StatisticsProps) => {
  return (
    <div
      className={`bg-(--primary) w-full h-auto flex flex-col p-5 gap-5 md:grid md:grid-cols-2 lg:flex lg:flex-row`}
    >
      <StatisticCard
        transactions={transactions}
        job="total balance"
      ></StatisticCard>
      <StatisticCard
        transactions={transactions}
        job="monthly income"
      ></StatisticCard>
      <StatisticCard
        transactions={transactions}
        job="monthly expenses"
      ></StatisticCard>
      <StatisticCard
        transactions={transactions}
        job="transactions"
      ></StatisticCard>
    </div>
  );
};

export default Statistics;
