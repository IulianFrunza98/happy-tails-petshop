import { NavLink } from "react-router-dom";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import Logo from "./Logo";
import { IoMenuSharp } from "react-icons/io5";

export default function Navbar() {
  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Shop", href: "#shop" },
    { label: "Contact", href: "#contact" },
  ];

  const icons = [
    { icon: <CiSearch size="1.5em" />, key: "search" },
    { icon: <CiShoppingCart size="1.5em" />, key: "cart" },
    {
      icon: <CiUser size="1.5em" />,
      key: "user",
      to: "/login",
    },
  ];

  return (
    <header className="absolute top-0 left-0 w-full px-10 py-6 flex justify-between items-center z-50">
      <Logo />
      <IoMenuSharp size="1.6em" className="block sm:hidden" />
      <ul className="hidden sm:flex gap-6 items-center text-white font-medium">
        {navLinks.map(({ label, href }) => (
          <li key={label} className="relative group">
            <a
              href={href}
              className="inline-block relative z-10 transition-colors"
            >
              {label}
            </a>
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-500"></span>
          </li>
        ))}

        {icons.map(({ icon, key, to }) => (
          <li key={key}>
            {to ? (
              <NavLink to={to}>{icon}</NavLink>
            ) : (
              <span className="cursor-pointer hover:scale-110 transition">
                {icon}
              </span>
            )}
          </li>
        ))}
      </ul>
    </header>
  );
}
