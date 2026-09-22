const StatisticCard = () => {
  return (
    <div className={`w-full h-auto flex flex-col bg-red-300 p-5 rounded-2xl`}>
      <div className={`flex justify-between items-center`}>
        <span className="material-symbols-outlined p-2 bg-blue-200 rounded-[10px] text-[1.2rem]!">
          account_balance_wallet
        </span>
        <div className={`flex`}>
          <span className="material-symbols-outlined">trending_up</span>
          8%
        </div>
      </div>
      <span className={`mt-5`}>Total balance</span>
      <span className={`text-2xl font-semibold`}>$23,293.03</span>
    </div>
  );
};

export default StatisticCard;
