import type { Transaction } from "../../../models/Transaction";
const TransactionCard = ({ transaction }: { transaction: Transaction }) => {
  return (
    <div
      className={`w-[90%] h-auto bg-green-200 flex justify-between items-center`}
    >
      <div className={`flex items-center`}>
        <span className="material-symbols-outlined w-12 h-12 rounded-full bg-yellow-200 inline-flex! justify-center items-center">
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
