import { Link } from "react-router-dom";
import type { NavButtonProps } from "./NavBar";

type LinkProps = {
  icon: string;
  header: string;
  nav: NavButtonProps;
};

const NavButton = ({ icon, header, nav}: LinkProps) => {
  return (
    <Link
      onClick={()=>nav.setActive()}
      to={`/${header.toLowerCase()}`}
      className={`bg-purple-300 mx-3 rounded-2xl p-2 flex justify-start items-center pl-3`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className={`capitalize inline-block ml-3`}>{header}</span>
    </Link>
  );
};

export default NavButton;
