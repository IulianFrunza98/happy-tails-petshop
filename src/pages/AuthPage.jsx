import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import useAuthStore from "../store/authStore";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AuthPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/app/products";

  const loginWithEmail = useAuthStore((state) => state.loginWithEmail);
  const registerWithEmail = useAuthStore((state) => state.registerWithEmail);
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
        navigate(from, { replace: true });
      } else {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        await registerWithEmail(email, password);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setError("");
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (err) {
      setError("Google login failed.", err.message || "Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center min-h-screen justify-center mx-4 bg-orange-50">
      <form
        className="flex flex-col gap-5 bg-white shadow-lg rounded-xl p-8 min-w-[320px] w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center mb-2">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`px-4 py-2 rounded-l-full font-semibold transition ${
              mode === "login"
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-500"
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={`px-4 py-2 rounded-r-full font-semibold transition ${
              mode === "register"
                ? "bg-orange-500 text-white"
                : "bg-orange-100 text-orange-500"
            }`}
          >
            Register
          </button>
        </div>
        <h1 className="text-2xl font-bold text-orange-600 mb-2">
          {mode === "login" ? "Login" : "Register"}
        </h1>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-left text-sm font-medium">
                Email
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-400 outline-none"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                disabled={loading}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-left text-sm font-medium"
              >
                Password
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-400 outline-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                required
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                disabled={loading}
              />
            </div>
            {mode === "register" && (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="confirmPassword"
                  className="text-left text-sm font-medium"
                >
                  Confirm Password
                </label>
                <input
                  className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-400 outline-none"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  disabled={loading}
                />
              </div>
            )}
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <button
              type="submit"
              className="w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-orange-500 text-white py-3 rounded font-bold hover:bg-orange-600 transition"
              disabled={!email || !password || loading}
            >
              {loading
                ? mode === "login"
                  ? "Logging in..."
                  : "Registering..."
                : mode === "login"
                ? "Login"
                : "Register"}
            </button>
            {mode === "login" && (
              <button
                onClick={handleGoogleLogin}
                type="button"
                className="w-full cursor-pointer bg-white border py-3 rounded font-bold hover:bg-gray-200 transition"
                disabled={loading}
              >
                <FaGoogle className="inline mr-2" />
                Login with Google
              </button>
            )}
          </motion.div>
          <motion.div className="flex justify-around font-semibold text-[0.8rem] gap-3 text-center">
            <Link to="/">Go to homepage</Link>
            {mode === "login" && <Link to="/">Forgot Password?</Link>}
          </motion.div>
        </AnimatePresence>
      </form>
    </div>
  );
}

export default AuthPage;
