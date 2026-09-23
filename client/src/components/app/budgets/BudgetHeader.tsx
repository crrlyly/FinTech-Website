const BudgetHeader = () => {
  return (
    <div className={`w-full h-auto bg-pink-200 flex items-center justify-between p-5`}>
      <span>Monthly budgets for September 2026 </span>
      <button className={`ml-20 bg-yellow-200`}>
        <span className="material-symbols-outlined">add</span>New Budget
      </button>
    </div>
  );
};

export default BudgetHeader;
