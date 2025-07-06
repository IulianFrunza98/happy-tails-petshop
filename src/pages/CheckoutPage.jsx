import React, { useState } from "react";
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

  const handleApprove = (_, actions) => {
    setLoading(true);
    setError("");
    setSuccess("");
    return actions.order.capture().then(() => {
      setLoading(false);
      setSuccess("Payment successful! (Demo with PayPal sandbox)");
      clearCart();
      setTimeout(() => {
        navigate("/app/products", { replace: true });
      }, 1500);
    });
  };

  const handleError = () => {
    setError("Payment failed. Please try again.");
    setLoading(false);
  };

  // Load PayPal script and render buttons
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=sb&currency=USD";
    script.addEventListener("load", () => {
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.00", // demo amount
                  },
                },
              ],
            });
          },
          onApprove: handleApprove,
          onError: handleError,
        })
        .render("#paypal-button-container");
    });
    document.body.appendChild(script);
  });

  return (
    <div className="max-w-md my-20 sm:my-10 mx-4 sm:mx-auto bg-white p-6 rounded-xl shadow space-y-4">
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
      <div id="paypal-button-container" />
      {loading && <div className="text-blue-600">Processing payment...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-600">{success}</div>}
    </div>
  );
}

export default CheckoutPage;
