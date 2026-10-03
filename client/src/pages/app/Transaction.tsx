import TopNav from "../../components/app/shared/TopNav";
import TransactionPage from "../../components/app/transactions/TransactionPage";

const Transaction = () => {
  return (
    <div className={`w-full min-h-dvh pt-20 lg:pt-18 lg:w-[calc(100%-17.5rem)] relative flex flex-col lg:ml-70 lg:px-5 bg-(--primary)`}>
      <TopNav title="Transactions"></TopNav>
      <TransactionPage></TransactionPage>
    </div>
  );
};

export default Transaction;
