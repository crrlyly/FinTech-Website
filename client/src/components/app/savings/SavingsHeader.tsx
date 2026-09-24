const SavingsHeader = () => {
  return (
    <div
      className={`w-full h-auto bg-pink-200 p-5 flex items-center justify-between`}
    >
      <span>Track progess toward the things you're saving for.</span>
      <button className={`bg-green-400`}>
        <span className="material-symbols-outlined">add</span>
        New goal
      </button>
    </div>
  );
};

export default SavingsHeader;
