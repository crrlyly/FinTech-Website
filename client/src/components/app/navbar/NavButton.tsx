import { Link, useNavigate, useLocation } from "react-router-dom";
import type { NavButtonProps } from "./NavBar";
import { logout } from "../../../services/authApi";

type LinkProps = {
  icon: string;
  header: string;
  nav: NavButtonProps;
};

const NavButton = ({ icon, header, nav }: LinkProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const link = header === "sign out" ? "/" : `/${header.toLowerCase()}`;

  const isActive = location.pathname === link;

  async function handleClickLogout(e: React.MouseEvent<HTMLAnchorElement>) {
    nav.setActive();

    if (header === "sign out") {
      e.preventDefault();
      try {
        const res = await logout();
        console.log("logout successful", res);
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Unable to log out:", error);
      }
    }
  }

  return (
    <Link
      onClick={handleClickLogout}
      to={header === "sign out" ? `/` : `/${header.toLowerCase()}`}
      className={`
    mx-3 rounded-2xl p-2 flex justify-start items-center pl-3
    transition-colors duration-150 ease-in
    ${
      isActive
        ? "bg-[rgb(33,5,94)]/60 text-(--purple)"
        : "bg-(--card) text-white/50 hover:text-white hover:bg-white/10"
    }
  `}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className={`capitalize inline-block ml-3 `}>{header}</span>
    </Link>
  );
};

export default NavButton;
