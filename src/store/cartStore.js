import { create } from "zustand";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const useCartStore = create((set, get) => ({
  cart: [],
  toast: null,
  loading: true,
  error: null,

  getUserId: () => {
    return auth.currentUser ? auth.currentUser.uid : null;
  },

  // Listen for auth state changes and initialize cart accordingly
  listenAuthState: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        get().initCart();
      } else {
        set({ cart: [], loading: false });
      }
    });
  },

  // Initialize cart from Firestore
  initCart: async () => {
    const USER_ID = get().getUserId();
    if (!USER_ID) {
      set({ error: "User not authenticated", loading: false });
      return;
    }
    try {
      const docRef = doc(db, "carts", USER_ID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({ cart: docSnap.data().items || [], loading: false });
      } else {
        // No cart found, initialize empty cart in Firestore
        await setDoc(docRef, { items: [] });
        set({ cart: [], loading: false });
      }
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addToCart: async (item) => {
    const USER_ID = get().getUserId();
    if (!USER_ID) {
      set({ error: "User not authenticated" });
      return;
    }
    const state = get();
    const exists = state.cart.find((cartItem) => cartItem.id === item.id);
    let newCart;
    if (exists) {
      newCart = state.cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...state.cart, { ...item, quantity: 1 }];
    }
    set({ cart: newCart, toast: toast.success(`Added to cart!`) });
    try {
      const docRef = doc(db, "carts", USER_ID);
      await setDoc(docRef, { items: newCart });
    } catch (error) {
      set({ error: error.message });
    }
  },

  clearCart: async () => {
    const USER_ID = get().getUserId();
    if (!USER_ID) {
      set({ error: "User not authenticated" });
      return;
    }
    set({ cart: [] });
    try {
      const docRef = doc(db, "carts", USER_ID);
      await setDoc(docRef, { items: [] });
    } catch (error) {
      set({ error: error.message });
    }
  },

  updateQuantity: async (id, quantity) => {
    const USER_ID = get().getUserId();
    if (!USER_ID) {
      set({ error: "User not authenticated" });
      return;
    }
    const state = get();
    const newCart = state.cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    set({ cart: newCart });
    try {
      const docRef = doc(db, "carts", USER_ID);
      await setDoc(docRef, { items: newCart });
    } catch (error) {
      set({ error: error.message });
    }
  },

  removeFromCart: async (id) => {
    const USER_ID = get().getUserId();
    if (!USER_ID) {
      set({ error: "User not authenticated" });
      return;
    }
    const state = get();
    const newCart = state.cart.filter((item) => item.id !== id);
    set({ cart: newCart, toast: toast.error(`Product removed!`) });
    try {
      const docRef = doc(db, "carts", USER_ID);
      await setDoc(docRef, { items: newCart });
    } catch (error) {
      set({ error: error.message });
    }
  },
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
