import NavButton from "./NavButton";

type NavButtonProps = {
  setActive: () => void;
  active: boolean;
};

const NavBar = ({ setActive, active }: NavButtonProps) => {
  return (
    <div
      className={`
        ${active ? "fixed" : "hidden"}
        z-70 w-70 h-dvh bg-green-400 top-0 left-0 flex flex-col
        `}
    >
      <div className={`relative w-full h-auto bg-blue-300 py-5 pl-3`}>
        <div
          className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-200 mr-2`}
        >
          V
        </div>
        <span>ault</span>
        <button
          onClick={() => setActive()}
          className={`absolute right-3 top-5 cursor-pointer`}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>
      <div
        className={`w-full h-[80%] bg-yellow-200 flex flex-col gap-2 pt-5 flex-1`}
      >
        <NavButton icon="dashboard" header="dashboard"></NavButton>
        <NavButton
          icon="arrows_left_right_circle"
          header="transaction"
        ></NavButton>
        <NavButton icon="account_balance_wallet" header="budgets"></NavButton>
        <NavButton icon="savings" header="savings goals"></NavButton>
        <NavButton icon="analytics" header="analytics"></NavButton>
        <NavButton icon="settings" header="settings"></NavButton>
      </div>
      <div className={`bg-pink-200 w-full h-30`}>
        <div
          className={`w-full h-[60%] bg-green-200 flex justify-center items-center`}
        >
          <div
            className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-200 mr-5`}
          >
            C
          </div>
          <div className={`flex flex-col`}>
            <span>Carly Chick</span>
            <span>carlyfrances118@gmail.com</span>
          </div>
        </div>
        <NavButton icon="logout" header="sign out"></NavButton>
      </div>
    </div>
  );
};

export default NavBar;
