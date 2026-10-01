const AutoActivate = () => {
  return (
    <div
      className={`w-full h-auto bg-(--card) border border-white/10 rounded-[20px] px-5 py-3 flex justify-between items-center`}
    >
      <div className={`w-[70%] flex flex-col text-white`}>
        <div className={`font-bold`}>Auto-activate every month</div>
        <span className={`text-[.9rem] text-(--greyText)`}>
          Automatically create budgets for each new month.
        </span>
      </div>
      <button className={`bg-(--purple) w-13 h-6 rounded-full`}>
        <div className={`bg-white rounded-full w-[50%] h-full`}></div>
      </button>
    </div>
  );
};

export default AutoActivate;
