import type { Transaction } from "../../../models/Transaction";
const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  return (
    <div
      className={`w-[90%] h-auto bg-(--card) hover:bg-white/5 flex justify-between items-center text-white p-2 rounded-md lg:w-full`}
    >
      <div className={`flex items-center`}>
        <span
          className={`mr-3 ${transaction.type === "expense" ? "bg-red-500/20 text-red-500" : "bg-green-500/20  text-green-500"} material-symbols-outlined w-12 h-12 rounded-full bg-green-200 inline-flex! justify-center items-center`}
        >
          {transaction.type === "expense" ? "trending_down" : "trending_up"}
        </span>
        <div className={`inline-flex flex-col`}>
          <span>{transaction.name}</span>
          <span>
            {transaction.category} * {transaction.date.split("T")[0]}
          </span>
        </div>
      </div>
      <span>
        {transaction.type === "expense" ? "-" : "+"}${transaction.amount}
      </span>
    </div>
  );
};

export default TransactionCard;
