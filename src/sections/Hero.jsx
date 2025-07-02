// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import HeroImage from "../assets/images/hero-image.png";
import { NavLink } from "react-router-dom";

const container = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
      ease: "easeOut",
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  const MotionNavLink = motion.create(NavLink);
  return (
    <section
      id="hero"
      className="relative bg-orange-400 shadow-md m-3 px-6 py-20 md:py-32 rounded-2xl text-white overflow-hidden"
    >
      <Navbar />

      {/* Decorative blurred circles */}
      <span className="absolute w-72 h-72 bg-white/20 rounded-full -top-16 -left-20 blur-3xl pointer-events-none"></span>
      <span className="absolute w-56 h-56 bg-white/10 rounded-full bottom-0 right-10 blur-2xl pointer-events-none"></span>

      <motion.div
        className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 max-w-7xl mx-auto px-6 py-20 md:py-32"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Text content */}
        <motion.div className="max-w-xl text-left" variants={item}>
          <motion.p
            className="text-sm uppercase tracking-wide mb-2 font-semibold text-white/80"
            variants={item}
          >
            The best place for happy pets!
          </motion.p>
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            variants={item}
          >
            Welcome to <span className="text-white">Happy Tails</span>!
          </motion.h1>
          <motion.p className="text-lg md:text-xl mb-10" variants={item}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem eos,
            veniam cupiditate corrupti optio repudiandae fugiat eveniet modi aut
            velit. 🐾
          </motion.p>

          <MotionNavLink
            to="/auth"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-orange-500 font-semibold rounded-full shadow-lg hover:bg-orange-100 transition"
            whileHover={{ scale: 1.05 }}
            variants={item}
          >
            Browse Products
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </MotionNavLink>

          <motion.p
            className="mt-6 text-sm text-white/70 italic"
            variants={item}
          >
            Over <span className="font-semibold">10,000 happy pets</span> and
            counting!
          </motion.p>
        </motion.div>

        {/* Image container */}
        <motion.div
          className="bg-white rounded-full p-4 max-w-[30rem] shadow-lg flex-shrink-0"
          variants={item}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 60 }}
        >
          <img
            src={HeroImage}
            alt="Happy dog and cat together"
            className="w-full h-auto object-contain rounded-2xl"
          />
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 cursor-pointer select-none"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        ↓ Scroll down
      </motion.div>
    </section>
  );
}
