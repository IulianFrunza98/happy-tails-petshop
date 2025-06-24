import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <NavLink to="/" className="text-2xl font-bold hover:scale-[1.1] transition">
      Happy Tails
    </NavLink>
  );
}

export default Logo;
