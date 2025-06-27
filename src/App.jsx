import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
