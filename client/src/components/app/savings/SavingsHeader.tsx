import { useState } from "react";
import AddSavings from "./AddSavings";

const SavingsHeader = () => {
  const [active, setActive] = useState<boolean>(false);

  const handleClick = () => {
    setActive((p) => !p);
  };

  return (
    <>
      <div
        className={`w-full h-auto bg-(--primary) p-5 flex items-center justify-between`}
      >
        <span className={`text-(--greyText)`}>
          Track progess toward the things you're saving for.
        </span>
        <button
          onClick={handleClick}
          className={`bg-(--purple) cursor-pointer rounded-full text-white flex items-center p-1 lg:p-2 lg:px-5`}
        >
          <span className="material-symbols-outlined">add</span>
          New goal
        </button>
      </div>
      <AddSavings
        active={active}
        handleClick={handleClick}
      ></AddSavings>
    </>
  );
};

export default SavingsHeader;
