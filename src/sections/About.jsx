// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import AboutImage from "../assets/images/about-image.png";

const container = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function About() {
  return (
    <section id="about" className="py-20 px-6">
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-orange-600 text-center md:text-left">
        About Us
      </h2>
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Image */}
        <motion.div
          className="bg-orange-400 rounded-full p-4 shadow-xl max-w-sm w-full"
          variants={item}
        >
          <img
            src={AboutImage}
            alt="About Happy Tails"
            className="rounded-full object-contain w-full"
          />
        </motion.div>

        {/* Text */}
        <motion.div className="text-left max-w-xl" variants={item}>
          <p className="text-gray-700 text-lg leading-relaxed">
            At{" "}
            <span className="font-semibold text-orange-500">Happy Tails</span>,
            we’re all about joy, fur, and wagging tails! 🐶🐱 We’ve helped
            thousands of pet lovers find everything they need to keep their pets
            happy and healthy.
            <br />
            <br />
            From premium food and cozy beds to squeaky toys and grooming
            essentials, our goal is simple:{" "}
            <span className="italic">make your pet’s life amazing</span>.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;
