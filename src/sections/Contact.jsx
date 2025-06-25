// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function Contact() {
  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <section id="contact" className="py-20 px-6">
      {/* Contact Section Description */}
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-orange-600 text-center md:text-left">
        Reach Out to Happy Tails
      </h2>
      <motion.div
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-8"
        variants={item}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          Have a question or just want to say hello? Fill out the form below and
          our team will get back to you soon!
        </p>
        {/* Contact Form */}
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <textarea
            placeholder="How can we help you?"
            rows={4}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="bg-orange-500 text-white font-semibold rounded-full px-6 py-3 mt-2 hover:bg-orange-600 transition"
          >
            Send Message
          </motion.button>
        </form>
        <div className="text-center text-gray-500 text-sm mt-4">
          Or email us at{" "}
          <a
            href="mailto:hello@happytails.com"
            className="text-orange-500 underline"
          >
            hello@happytails.com
          </a>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
