import Ratio from "../shared/Ratio";
const BudgetCard = ({ category }: { category: string }) => {
  return (
    <div className={`w-full min-h-45 h-auto bg-blue-200 p-8`}>
      <div className={`flex justify-between text-2xl`}>
        {category}
        <div className={``}>
          <button className={`mr-5 p-1`}>
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button className={`p-1`}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>

      <Ratio></Ratio>

      <div className={`mt-2 text-[1rem]`}>47% used</div>
    </div>
  );
};

export default BudgetCard;
