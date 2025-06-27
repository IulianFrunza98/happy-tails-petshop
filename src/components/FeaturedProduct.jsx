// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useCartStore } from "../store/cartStore";

function FeaturedProduct({ featuredProduct, index }) {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-5 flex flex-col items-center text-center"
    >
      <motion.img
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-full max-w-[10rem] h-auto object-contain mb-4"
        src={featuredProduct.img}
        alt={featuredProduct.name}
      />
      <h3 className="text-lg font-semibold text-gray-800">
        {featuredProduct.name}
      </h3>
      <p className="text-orange-500 font-bold text-base mb-4">
        ${featuredProduct.price.toFixed(2)}
      </p>
      <motion.button
        onClick={() => addToCart(featuredProduct)}
        whileTap={{ scale: 0.95 }}
        className="mt-auto px-4 py-2 cursor-pointer bg-orange-500 text-white rounded-full font-semibold text-sm hover:bg-orange-600 transition"
      >
        Add to Cart
      </motion.button>
    </motion.li>
  );
}

export default FeaturedProduct;
