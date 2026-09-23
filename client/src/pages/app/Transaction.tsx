import TopNav from "../../components/app/shared/TopNav";
import TransactionPage from "../../components/app/transactions/TransactionPage";

const Transaction = () => {
  return (
    <div className={`w-full min-h-dvh pt-20 relative flex flex-col`}>
      <TopNav title="Transactions"></TopNav>
      <TransactionPage></TransactionPage>
    </div>
  );
};

export default Transaction;
