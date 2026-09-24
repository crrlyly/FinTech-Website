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
        className={`w-full h-auto bg-pink-200 p-5 flex items-center justify-between`}
      >
        <span>Track progess toward the things you're saving for.</span>
        <button onClick={handleClick} className={`bg-green-400`}>
          <span className="material-symbols-outlined">add</span>
          New goal
        </button>
      </div>
      <AddSavings active={active} handleClick={handleClick}></AddSavings>
    </>
  );
};

export default SavingsHeader;
