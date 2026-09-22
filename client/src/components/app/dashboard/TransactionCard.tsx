const TransactionCard = () => {
  return (
    <div
      className={`w-[90%] h-auto bg-green-200 flex justify-between items-center`}
    >
      <div className={`flex items-center`}>
        <span className="material-symbols-outlined w-12 h-12 rounded-full bg-yellow-200 inline-flex! justify-center items-center">
          trending_down
        </span>
        <div className={`inline-flex flex-col`}>
          <span>Concert Tickets</span>
          <span>Bills * 2026-09-12</span>
        </div>
      </div>
      <span>-$50.00</span>
    </div>
  );
};

export default TransactionCard;
