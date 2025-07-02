import { NavLink } from "react-router-dom";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import Logo from "./Logo";
import { IoMenuSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import { AnimatePresence } from "framer-motion";
import CartMenu from "./CartMenu";
import { useCartCount } from "../store/cartStore";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartMenuOpen, setCartMenuOpen] = useState(false);
  const cartCount = useCartCount();

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Featured", href: "#featuredproducts" },
    { label: "Contact", href: "#contact" },
  ];

  const icons = [{ icon: <CiUser size="1.5em" />, key: "auth", to: "/auth" }];

  return (
    <nav className="absolute top-0 left-0 w-full px-6 sm:px-10 py-6 flex justify-between items-center z-50">
      <Logo />
      {/* Mobile menu button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="block sm:hidden"
          aria-controls="mobile-menu"
          aria-expanded={mobileMenuOpen}
          aria-label="Open mobile menu"
        >
          <IoMenuSharp size="1.6em" />
        </button>
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
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu setMobileMenuOpen={setMobileMenuOpen} id="mobile-menu" />
        )}
      </AnimatePresence>
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
