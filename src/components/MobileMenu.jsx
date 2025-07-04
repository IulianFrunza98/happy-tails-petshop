// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function MobileMenu({ setMobileMenuOpen }) {
  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Featured", href: "#featuredproducts" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-orange-400 bg-opacity-95 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <button
        onClick={() => setMobileMenuOpen(false)}
        className="absolute top-6 right-6 text-3xl text-white focus:outline-none"
        aria-label="Close menu"
      >
        &times;
      </button>
      <ul className="flex flex-col items-center gap-6 text-xl font-semibold">
        {navLinks.map(({ label, href }) => (
          <li key={label} className="relative group">
            <a
              onClick={() => setMobileMenuOpen(false)}
              href={href}
              className="inline-block relative z-10 transition-colors focus:outline-none"
              tabIndex={0}
            >
              {label}
            </a>
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white group-hover:w-full transition-all duration-500"></span>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

export default MobileMenu;
