import { useState } from "react";
import NavBar from "../navbar/NavBar";

const TopNav = () => {
  const [active, setActive] = useState<boolean>(false);

  function handleClick() {
    setActive((p) => !p);
  }

  return (
    <>
      <div
        className={`z-60 bg-blue-200 fixed top-0 left-0 w-full h-auto flex flex-start items-center py-5 pl-3`}
      >
        <button onClick={() => handleClick()}>
          <span className="material-symbols-outlined text-3xl!">menu</span>
        </button>
        <span className="text-3xl ml-3 font-semibold">Dashboard</span>
      </div>
      <NavBar active={active} setActive={handleClick}></NavBar>
    </>
  );
};

export default TopNav;
