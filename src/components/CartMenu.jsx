// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, useCartTotal } from "../store/cartStore";
import { FaTrashAlt } from "react-icons/fa";

function CartMenu({ setCartMenuOpen }) {
  const cart = useCartStore((state) => state.cart);
  const total = useCartTotal();
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex">
      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.35 }}
        className="ml-auto w-full max-w-md h-full bg-white rounded-l-2xl shadow-xl flex flex-col p-8 text-black"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-2xl tracking-wide">Your Cart</span>
          <button
            onClick={() => setCartMenuOpen(false)}
            className="text-2xl font-bold text-orange-500 hover:text-orange-700"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>
        {/* Cart Items */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Your cart is empty.
            </p>
          ) : (
            <AnimatePresence>
              {cart.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  initial={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-4 border-b pb-3"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-16 h-16 object-contain rounded-lg bg-gray-100"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-base">{item.name}</div>
                    <div className="text-orange-500 font-bold text-sm">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <FaTrashAlt className="w-5 h-5" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="mt-6 border-t pt-4 flex flex-col gap-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total:</span>
              <span className="text-orange-600">${total}</span>
            </div>
            <button
              className="w-full cursor-pointer bg-orange-500 text-white font-bold py-3 rounded-full hover:bg-orange-600 transition text-lg shadow"
              onClick={() => {
                setCartMenuOpen(false);
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Proceed to checkout"
            >
              Checkout
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default CartMenu;
