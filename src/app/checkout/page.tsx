"use client";
import React, { useState } from "react";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Provider from "@/components/ui/Provider";
import { useCart } from "@/contexts/CartContext";

const CheckoutPage: React.FC = () => {
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>("");

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );

  const handleSubmit = () => {
    // Handle form submission
    alert("Order placed successfully");
    clearCart();
  };

  return (
    <Provider>
      <div className="bg-white-100 flex flex-col min-h-screen">
        <Header />
        <div className="relative isolate px-6 pt-14 lg:px-8 flex-grow">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>

          <div className="mx-auto max-w-md py-8 mt-32">
            <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
            <div className="mb-8">
              <h2 className="text-xl font-semibold">User Details</h2>
              <p>Name: John Doe</p>
              <p>Address: 123 Main Street, Springfield, USA</p>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold">Order Summary</h2>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="py-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-lg font-semibold">{item.name}</p>
                      <p className="text-gray-500">₹{item.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-semibold">₹{totalPrice}</span>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <div>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    className="mr-2"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Cash on Delivery
                </label>
                <label className="flex items-center mt-2">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    className="mr-2"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  Online Payment
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={handleSubmit}
                disabled={!paymentMethod}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Provider>
  );
};

export default CheckoutPage;
