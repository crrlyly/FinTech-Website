const StatisticCard = () => {
  return (
    <div className={`w-full h-auto flex flex-col bg-(--card) border border-white/10 p-5 rounded-2xl`}>
      <div className={`flex justify-between items-center`}>
        <span className="material-symbols-outlined p-2 bg-blue-200 rounded-[10px] text-[1.2rem]!">
          account_balance_wallet
        </span>
        <div className={`flex text-green-500`}>
          <span className="material-symbols-outlined text-green-500 mr-2">trending_up</span>
          8%
        </div>
      </div>
      <span className={`mt-5 text-(--greyText)`}>Total balance</span>
      <span className={`text-3xl font-semibold text-white`}>$23,293.03</span>
    </div>
  );
};

export default StatisticCard;
