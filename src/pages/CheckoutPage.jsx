import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";

function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    // Simulate network/payment delay
    setTimeout(() => {
      setLoading(false);
      setSuccess("Payment successful! (Demo only, no real payment processed)");
      clearCart();
      setTimeout(() => {
        navigate("/");
      }, 1500); // Show success for 1.5s before navigating
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto my-10 bg-white p-6 rounded-xl shadow space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Checkout</h2>
      <input
        type="text"
        required
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded"
      />
      <input
        type="text"
        required
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-3 border rounded"
      />
      <div className="flex gap-2">
        <input
          type="text"
          required
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-1/2 p-3 border rounded"
        />
        <input
          type="text"
          required
          placeholder="ZIP"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="w-1/2 p-3 border rounded"
        />
      </div>
      {/* Fake CardElement for UI consistency */}
      <div className="p-3 border rounded bg-gray-50 text-gray-400">
        <span>Card details (demo only)</span>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 text-white py-3 rounded font-bold hover:bg-orange-600 transition"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
    </form>
  );
}

export default CheckoutPage;
