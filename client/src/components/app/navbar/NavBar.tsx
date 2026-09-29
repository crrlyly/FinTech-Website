import NavButton from "./NavButton";
import { useUser } from "../../../context/UserContext";

export type NavButtonProps = {
  setActive: () => void;
  active: boolean;
};

const NavBar = ({ setActive, active }: NavButtonProps) => {
  const { user } = useUser();

  const navStates = {
    setActive: setActive,
    active: active,
  };

  return (
    <div
      className={`
        ${active ? "fixed" : "hidden"}
        z-70 w-70 h-dvh bg-(--card) top-0 left-0 flex flex-col
        `}
    >
      <div
        className={`relative w-full h-auto bg-(--card) py-5 pl-5 border-r-2 border-white/10`}
      >
        <div
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-(--purple) mr-2 text-white font-bold text-2xl`}
        >
          V
        </div>
        <span className={`text-white font-semibold text-[1.2rem]`}>ault</span>
        <button
          onClick={() => setActive()}
          className={`absolute right-3 top-5 cursor-pointer text-white/60`}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <div
        className={`w-full h-[80%] bg-(--card) flex flex-col gap-2 pt-5 flex-1 border-b-2 border-r-2 border-white/10`}
      >
        <NavButton
          nav={navStates}
          icon="dashboard"
          header="dashboard"
        ></NavButton>
        <NavButton
          nav={navStates}
          icon="arrows_left_right_circle"
          header="transactions"
        ></NavButton>
        <NavButton
          nav={navStates}
          icon="account_balance_wallet"
          header="budgets"
        ></NavButton>
        <NavButton nav={navStates} icon="savings" header="savings"></NavButton>
        <NavButton
          nav={navStates}
          icon="analytics"
          header="analytics"
        ></NavButton>
        <NavButton
          nav={navStates}
          icon="settings"
          header="settings"
        ></NavButton>
      </div>
      <div className={`bg-(--card) w-full h-30`}>
        <div
          className={`w-full h-[60%] bg-(--card) flex justify-start items-center pl-5`}
        >
          <div
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-[rgb(33,5,94)]/60 mr-5 uppercase text-(--purple) font-bold`}
          >
            {user?.name.slice(0, 1)}
          </div>
          <div className={`flex flex-col text-white`}>
            <span className={`font-bold text-[1rem] capitalize`}>
              {user?.name}
            </span>
            <span className={`text-white/50 text-[.9rem]`}>{user?.email}</span>
          </div>
        </div>
        <NavButton nav={navStates} icon="logout" header="sign out"></NavButton>
      </div>
    </div>
  );
};

export default NavBar;
