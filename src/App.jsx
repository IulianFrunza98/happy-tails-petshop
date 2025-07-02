import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const AppLayout = lazy(() => import("./layouts/AppLayout"));

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          position: "top-right",
          success: {
            style: {
              background: "#22c55e",
              color: "#fff",
              borderRadius: "8px",
              padding: "12px 16px",
            },
          },
          error: {
            style: {
              background: "#ef4444",
              color: "#fff",
              borderRadius: "8px",
              padding: "12px 16px",
            },
          },
        }}
      />
      <Router>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="cart" element={<CartPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
