// import type { Transaction } from "../../../models/Transaction";
import {
  getMonthlyExpenses,
  getMonthlyIncome,
  getTotalBalance,
} from "../../../helpers/dashboardHelpers";
import { useTransactionStore } from "../../../stores/TransactionStore";

type StatisticCardProps = {
  job: string;
};

type StatResult = {
  value: number;
  percentage?: number;
};

const StatisticCard = ({ job }: StatisticCardProps) => {
  const transactions = useTransactionStore((s) => s.transactions);
  function jobAction(): StatResult {
    if (job === "total balance") {
      return {
        value: getTotalBalance(transactions),
      };
    }

    if (job === "monthly income") {
      const [current, percentage] = getMonthlyIncome(transactions);

      return {
        value: current,
        percentage,
      };
    }

    if (job === "monthly expenses") {
      const [current, percentage] = getMonthlyExpenses(transactions);

      return {
        value: current,
        percentage,
      };
    }

    return {
      value: transactions.length,
    };
  }

  return (
    <div
      className={`w-full h-auto flex flex-col bg-(--card) border border-white/10 p-5 rounded-2xl`}
    >
      <div className={`flex justify-between items-center`}>
        <span className="material-symbols-outlined p-2 bg-blue-200 rounded-[10px] text-[1.2rem]!">
          account_balance_wallet
        </span>
        <div className={`flex text-green-500`}>
          <span className="material-symbols-outlined text-green-500 mr-2">
            trending_up
          </span>
          {job === "transactions" || job === "total balance"
            ? ""
            : `${jobAction().percentage?.toFixed(0)}%`}
        </div>
      </div>
      <span className={`mt-5 text-(--greyText) capitalize`}>{job}</span>
      <span className={`text-3xl font-semibold text-white`}>
        {job === "transactions"
          ? jobAction().value
          : `$${jobAction().value.toFixed(2)}`}
      </span>
    </div>
  );
};

export default StatisticCard;
