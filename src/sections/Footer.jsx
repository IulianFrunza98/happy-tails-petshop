// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function Footer() {
  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={container}
      className="bg-orange-400 text-white pt-12 pb-6 px-4 mt-16 rounded-t-2xl shadow-inner"
    >
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10"
        variants={container}
      >
        {/* Brand & Newsletter */}
        <motion.div variants={item}>
          <div className="font-bold text-2xl mb-2">Happy Tails</div>
          <p className="mb-4 text-white/90">
            Making pets and owners happy, every day!
          </p>
          <form className="flex flex-col gap-2">
            <label htmlFor="newsletter" className="text-sm text-white/80">
              Subscribe to our newsletter
            </label>
            <div className="flex flex-col gap-2">
              <input
                id="newsletter"
                type="email"
                placeholder="Your email"
                className="rounded-lg border px-3 py-2 text-white flex-1 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-white text-orange-500 font-semibold px-4 py-2 rounded-lg hover:bg-orange-100 transition"
              >
                Subscribe
              </button>
            </div>
          </form>
        </motion.div>
        {/* Navigation */}
        <motion.div variants={item}>
          <div className="font-semibold mb-3">Quick Links</div>
          <ul className="flex flex-col gap-2 text-white/90">
            <li>
              <a href="#hero" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#shop" className="hover:underline">
                Shop
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <NavLink to="/login" className="hover:underline">
                Login
              </NavLink>
            </li>
          </ul>
        </motion.div>
        {/* Customer Service */}
        <motion.div variants={item}>
          <div className="font-semibold mb-3">Customer Service</div>
          <ul className="flex flex-col gap-2 text-white/90">
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Order Tracking
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms of Service
              </a>
            </li>
          </ul>
        </motion.div>
        {/* Contact & Social */}
        <motion.div variants={item}>
          <div className="font-semibold mb-3">Contact Us</div>
          <div className="mb-2 text-white/90">
            <span className="block">123 Pet Lane, Happyville</span>
            <span className="block">Phone: (123) 456-7890</span>
            <span className="block">
              Email:{" "}
              <a
                href="mailto:hello@happytails.com"
                className="underline hover:text-orange-200"
              >
                hello@happytails.com
              </a>
            </span>
          </div>
          <div className="flex gap-4 mt-3 text-2xl">
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-orange-200 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-orange-200 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-orange-200 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-orange-200 transition"
            >
              <FaYoutube />
            </a>
          </div>
        </motion.div>
      </motion.div>
      <div className="text-center text-white/70 text-sm mt-10">
        &copy; {new Date().getFullYear()} Happy Tails. All rights reserved.
      </div>
    </motion.footer>
  );
}

export default Footer;
