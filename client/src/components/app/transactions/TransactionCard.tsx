import type { dummyTransactionsProps } from "./TransactionPage";

const TransactionCard = ({
  transaction,
}: {
  transaction: dummyTransactionsProps;
}) => {
  // {
  //     transaction: {
  //         name: "Electricity Bill",
  //         category: "bills",
  //         type: "expense"
  //     }
  // }

  // Without destructuring:
  // const TransactionCard = (
  //     props: { transaction: dummyTransactionsProps }
  //     ) => {
  //     return (
  //         <div>
  //         <span>{props.transaction.name}</span>
  //         <span>{props.transaction.category}</span>
  //         </div>
  //     );
  // };

  return (
    <div className={`w-full h-auto bg-green-200 rounded-2xl`}>
      <div className={`flex justify-between items-center p-5`}>
        <div className={`flex flex-col`}>
          <span>{transaction.name}</span>
          <span>2026-09-14</span>
        </div>
        <div className={`flex flex-col`}>
          <span>{transaction.category}</span>
          <span>-180.00</span>
        </div>
      </div>
      <div className={`w-full h-auto flex p-5 justify-end`}>
        <button>
          <span className="material-symbols-outlined pr-5">edit</span>
        </button>
        <button>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};

export default TransactionCard;
