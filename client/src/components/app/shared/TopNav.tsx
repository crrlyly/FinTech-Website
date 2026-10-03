import { useState } from "react";
import NavBar from "../navbar/NavBar";



const TopNav = ({ title }: { title: string }) => {
  const [active, setActive] = useState<boolean>(false);

  function handleClick() {
    setActive((p) => !p);
  }

  return (
    <>
      <div
        className={`z-60 bg-(--primary) border-b border-white/10 fixed top-0 left-0 w-full h-auto flex flex-start items-center py-5 pl-3 lg:ml-70`}
      >
        <button onClick={() => handleClick()} className={`block lg:hidden`}>
          <span className="material-symbols-outlined text-3xl! text-white">menu</span>
        </button>
        <span className="text-2xl ml-3 font-semibold text-white">{title}</span>
      </div>
      <NavBar active={active} setActive={handleClick}></NavBar>
    </>
  );
};

export default TopNav;
