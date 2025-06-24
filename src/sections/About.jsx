// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

import HeroImage from "../assets/images/hero-image.png";

function About() {
  return (
    <section id="about" className="bg-white  py-20 px-6 md:px-16 text-gray-800">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img
          src={HeroImage}
          alt="About Happy Tails"
          className="rounded-xl shadow-md w-full md:w-1/2"
        />

        <div className="md:w-1/2 text-left sm:text-center md:text-left">
          <h2 className="text-4xl font-bold mb-6">About Happy Tails 🐾</h2>
          <p className="text-lg mb-6 leading-relaxed">
            At <strong>Happy Tails</strong>, pets are part of the family. We’re
            a team of passionate animal lovers offering curated products that
            keep tails wagging and whiskers twitching.
          </p>
          <ul className="space-y-3 text-sm md:text-base">
            <li>✔️ Handpicked toys, food, and gear</li>
            <li>✔️ Eco-friendly & pet-safe packaging</li>
            <li>✔️ Trusted by 1000+ happy pet parents</li>
          </ul>
          <a
            href="#shop"
            className="mt-8 inline-block text-orange-500 font-semibold underline hover:text-orange-600 transition"
          >
            Browse our products →
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
