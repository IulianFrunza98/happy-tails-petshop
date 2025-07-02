// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore, useCartTotal } from "../store/cartStore";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function CartMenu({ setCartMenuOpen }) {
  const cart = useCartStore((state) => state.cart);
  const total = useCartTotal();
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex">
      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.35 }}
        className="ml-auto w-full max-w-md h-full bg-white rounded-l-2xl shadow-2xl flex flex-col p-0 text-black"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-8 py-6 border-b">
          <span className="font-bold text-2xl tracking-wide">Your Cart</span>
          <button
            onClick={() => setCartMenuOpen(false)}
            className="text-3xl font-bold text-orange-500 hover:text-orange-700 transition"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>
        {/* Cart Items */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto px-8 py-4">
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
                  className="flex items-center gap-9 border-b pb-4 last:border-b-0"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-20 h-20 object-contain rounded-xl bg-gray-100"
                  />
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="font-semibold text-lg">{item.name}</div>
                    <div className="text-orange-500 font-bold text-base">
                      ${item.price.toFixed(2)}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <button
                        onClick={() => {
                          {
                            item.quantity <= 1
                              ? removeFromCart(item.id)
                              : updateQuantity(item.id, item.quantity - 1);
                          }
                        }}
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
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 p-2 rounded-full transition"
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
          <div className="sticky bottom-0 left-0 bg-white border-t px-8 py-6 flex flex-col gap-4 shadow-inner">
            <div className="flex justify-between items-center text-xl font-semibold">
              <span>Total:</span>
              <span className="text-orange-600">${total}</span>
            </div>
            <button
              className="w-full cursor-pointer bg-orange-500 text-white font-bold py-3 rounded-full hover:bg-orange-600 transition text-lg shadow"
              onClick={() => {
                setCartMenuOpen(false);
                navigate("/app/cart");
              }}
              whileTap={{ scale: 0.97 }}
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
