import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),
}));

export const useCartCount = () => {
  const cart = useCartStore((state) => state.cart);
  return cart.length;
};

export const useCartTotal = () => {
  const cart = useCartStore((state) => state.cart);
  return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
};
