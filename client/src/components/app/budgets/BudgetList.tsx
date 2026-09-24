import BudgetCard from "./BudgetCard";

const BudgetList = () => {
  return (
    <div
      className={`w-full h-auto bg-pink-200 p-5 flex flex-col items-center flex-1 gap-5`}
    >
      <BudgetCard category="Groceries" />
      <BudgetCard category="Dining" />
      <BudgetCard category="Transportation" />
      <BudgetCard category="Shopping" />
      <BudgetCard category="Entertainment" />
      <BudgetCard category="Bills" />
      <BudgetCard category="Others" />
    </div>
  );
};

export default BudgetList;
