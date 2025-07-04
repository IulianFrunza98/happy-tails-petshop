/* eslint-disable no-unused-vars */
import { useCartStore, useCartTotal } from "../store/cartStore";
import { FaArrowLeft, FaTrashAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageNav from "../components/PageNav";

function CartPage() {
  const cart = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = useCartTotal();

  return (
    <>
      <PageNav />
      <div className="max-w-3xl mx-auto px-4 py-10">
        {cart.length === 0 ? (
          <div className="text-center text-gray-500 mt-20 text-lg">
            Your cart is empty.
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <h1 className="text-2xl font-bold text-orange-400">Cart</h1>
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 1, x: 0 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-28 h-28 object-contain rounded-xl bg-gray-100"
                  />
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="font-semibold text-xl">{item.name}</div>
                    <div className="text-gray-600 text-sm">
                      {item.description}
                    </div>
                    <div className="text-orange-500 font-bold text-lg">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() =>
                          item.quantity <= 1
                            ? removeFromCart(item.id)
                            : updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-100 transition"
                        aria-label="Decrease quantity"
                      >
                        –
                      </button>
                      <span className="px-2 text-base font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center text-lg font-bold hover:bg-gray-100 transition"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-gray-400 hover:text-red-500 p-2 rounded-full transition"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <FaTrashAlt className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {/* Cart Total and Checkout */}
            <div className="flex flex-col sm:flex-row-reverse justify-between items-center mt-8 gap-4">
              <div className="text-xl font-semibold">
                Total: <span className="text-orange-600">${total}</span>
              </div>
              <NavLink
                className="bg-orange-500 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-600 transition text-lg shadow"
                to="/app/checkout"
                aria-label="Proceed to checkout"
              >
                Pay
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CartPage;
