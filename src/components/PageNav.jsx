import { NavLink, useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import Logo from "./Logo";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CartMenu from "./CartMenu";
import { useCartCount } from "../store/cartStore";
import { LuLogOut } from "react-icons/lu";
import useAuthStore from "../store/authStore";

export default function Navbar() {
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const navigate = useNavigate();
  const cartCount = useCartCount();
  const logout = useAuthStore((state) => state.logout);

  const icons = [
    {
      icon: (
        <span className="relative">
          <CiShoppingCart size="1.5em" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-4 bg-orange-400 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
              {cartCount}
            </span>
          )}
        </span>
      ),
      key: "cart",
      onClick: () => setCartMenuOpen(true),
    },
    {
      icon: <LuLogOut />,
      key: "logout",
      onClick: () => {
        logout();
        navigate("/", { replace: true });
      },
    },
  ];

  const navLinks = [{ label: "Products", to: "/app/products" }];

  return (
    <nav className="w-full bg-orange-500 text-white px-6 sm:px-10 py-6 flex justify-between items-center z-50">
      <Logo />
      {/* Mobile menu button */}
      <div className="flex items-center gap-4">
        {/* Mobile cart button with badge */}
        <button
          onClick={() => setCartMenuOpen(!cartMenuOpen)}
          className="block sm:hidden relative"
          aria-controls="cart-menu"
          aria-expanded={cartMenuOpen}
          aria-label="Open cart menu"
        >
          <CiShoppingCart size="1.6em" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
              {cartCount}
            </span>
          )}
        </button>
      </div>
      <AnimatePresence>
        {cartMenuOpen && <CartMenu setCartMenuOpen={setCartMenuOpen} />}
      </AnimatePresence>

      <ul className="hidden sm:flex gap-6 items-center text-white font-medium">
        {navLinks.map(({ label, to }) => (
          <li key={label} className="relative group">
            <NavLink
              to={to}
              className="inline-block relative z-10 transition-colors"
            >
              {label}
            </NavLink>
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-500"></span>
          </li>
        ))}

        {icons.map(({ icon, key, to, onClick }) => (
          <li key={key}>
            {to ? (
              <NavLink to={to}>{icon}</NavLink>
            ) : (
              <span
                className="cursor-pointer hover:scale-110 transition"
                onClick={onClick}
                tabIndex={0}
                role="button"
                aria-label={key}
              >
                {icon}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
