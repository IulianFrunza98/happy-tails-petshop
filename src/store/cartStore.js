import { create } from "zustand";
import toast from "react-hot-toast";

export const useCartStore = create((set) => ({
  cart: [],
  toast: null,
  addToCart: (item) =>
    set((state) => {
      const exists = state.cart.find((cartItem) => cartItem.id === item.id);
      if (exists) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      } else {
        return {
          cart: [...state.cart, { ...item, quantity: 1 }],
          toast: toast.success(`Added to cart!`),
        };
      }
    }),
  clearCart: () => set({ cart: [] }),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
      toast: toast.error(`Product removed!`),
    })),
}));

export const useCartCount = () => {
  const cart = useCartStore((state) => state.cart);
  // Sum all quantities for badge
  return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
};

export const useCartTotal = () => {
  const cart = useCartStore((state) => state.cart);
  // Multiply price by quantity for each item
  return cart
    .reduce((total, item) => total + item.price * (item.quantity || 1), 0)
    .toFixed(2);
};
