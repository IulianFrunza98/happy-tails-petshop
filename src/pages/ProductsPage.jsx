import { useState } from "react";
import { allPRoducts as PRODUCTS } from "../data/data";
import { useDebounce } from "use-debounce";
import { useFilteredProducts } from "../hooks/useFilteredProducts"; // custom hook
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useCartStore } from "../store/cartStore";
import PageNav from "../components/PageNav";

const CATEGORIES = ["All", "Food", "Toys", "Accessories"];

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300); // debounce input
  const addToCart = useCartStore((state) => state.addToCart);

  const filteredProducts = useFilteredProducts(
    PRODUCTS,
    debouncedSearch,
    selectedCategory
  );

  return (
    <>
      <PageNav />
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-10">
        {/* Sidebar & Search */}
        <aside className="md:w-64 w-full md:sticky top-24">
          <div className="bg-white rounded-2xl shadow p-6 mb-6">
            <h2 className="text-lg font-bold mb-4 text-orange-600">Filter</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Category
              </label>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    className={`text-left px-3 py-2 rounded transition ${
                      selectedCategory === cat
                        ? "bg-orange-500 text-white"
                        : "hover:bg-orange-100"
                    }`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Search</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>
        </aside>

        {/* Decorative blur */}
        <span className="absolute w-72 h-72 bg-white/20 rounded-full -top-16 -left-20 blur-3xl pointer-events-none"></span>
        <span className="absolute w-56 h-56 bg-white/20 rounded-full -top-10 right-0 blur-2xl pointer-events-none"></span>

        {/* Main Product Grid */}
        <main className="flex-1">
          <h1 className="text-3xl font-bold mb-8 text-orange-600">Products</h1>
          {filteredProducts.length === 0 ? (
            <div className="text-gray-500 text-lg">No products found.</div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.li
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-5 flex flex-col items-center text-center"
                >
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-full max-w-[10rem] h-auto object-contain mb-4"
                    src={product.img}
                    alt={product.name}
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <div className="text-gray-500 text-sm mb-2">
                    {product.category}
                  </div>
                  <p className="text-orange-500 font-bold text-base mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="text-gray-600 text-sm mb-4 text-center">
                    {product.description}
                  </div>
                  <motion.button
                    onClick={() => addToCart(product)}
                    whileTap={{ scale: 0.95 }}
                    className="mt-auto px-4 py-2 cursor-pointer bg-orange-500 text-white rounded-full font-semibold text-sm hover:bg-orange-600 transition"
                  >
                    Add to Cart
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </>
  );
}

export default ProductsPage;
