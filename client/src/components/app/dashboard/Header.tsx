import { useState } from "react";
import AddTransaction from "./AddTransaction";

const Header = () => {
  const [active, setActive] = useState<boolean>(false);

  function handleClick(){
    setActive((p) => !p)
  }

  return (
    <>
      <div
        className={`w-full h-auto bg-yellow-200 relative flex flex-col px-3 py-5 z-20`}
      >
        <span>Welcome back. Here's your financial overview.</span>
        <button
          onClick={() => handleClick()}
          className={`bg-green-200 flex mt-3 rounded-full p-2`}
        >
          <span className="material-symbols-outlined">add</span>
          Add transaction
        </button>
      </div>
      <AddTransaction active ={active}  handleClick={handleClick}></AddTransaction>
    </>
  );
};

export default Header;
