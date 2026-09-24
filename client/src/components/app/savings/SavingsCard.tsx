import Ratio from "../shared/Ratio";

const SavingsCard = () => {
  return (
    <div className={`w-full min-h-60 h-auto bg-purple-200 p-5`}>
      <div className={`flex justify-between items-center`}>
        <div className={`flex items-center`}>
          <span className="material-symbols-outlined">cyclone</span>
          Hawaii Vacation
        </div>
        <button>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
      <Ratio></Ratio>
      <div>37% saved · $3,150.00 to go</div>
      <div>Save $1,050.00/mo to hit 2026-12-15</div>
      <button className={`w-full bg-blue-600 p-3`}>Add Funds</button>
    </div>
  );
};

export default SavingsCard;
