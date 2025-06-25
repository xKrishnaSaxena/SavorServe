"use client";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { useCart } from "@/contexts/CartContext";
import Provider from "@/components/ui/Provider";
import { useSession } from "next-auth/react";
import Spinner from "@/components/ui/Spinner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { data: session } = useSession();

  let initialname;
  if (session?.user?.name) {
    initialname = session?.user.name;
  }

  let initialaddress;
  if (session?.user?.address) {
    initialaddress = session?.user.address;
  }

  const [name, setName] = useState(initialname);
  const [address, setAddress] = useState(initialaddress);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { cartItems, clearCart } = useCart();

  const totalAmount = cartItems.reduce(
    (acc, cartItem) => acc + Number(cartItem.item.price) * cartItem.quantity,
    0
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!name || !address) {
      setError("Please provide name and address.");
      return;
    }

    if (paymentMethod === "cod") {
      setLoading(true);
      setTimeout(() => {
        setSuccess(true);
        clearCart();
        setLoading(false);
      }, 3000); // Simulate COD processing
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      }).then((res) => res.json());

      const cardElement = elements.getElement(CardElement);

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: cardElement!,
            billing_details: {
              name,
              address: {
                line1: address,
              },
            },
          },
        });

      if (stripeError) {
        setError(stripeError.message ?? "Payment failed");
        setLoading(false);
      } else if (paymentIntent?.status === "succeeded") {
        setSuccess(true);
        clearCart();
        setLoading(false);
      }
    } catch (err) {
      setError("Failed to process payment");
      setLoading(false);
      console.error("Error processing payment:", err);
    }
  };

  if (!session) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className=" p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 text-white py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
              disabled
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-white"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full px-3 text-white py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>
      </div>
      <div className="p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
        <div className="space-y-4">
          {cartItems.map((cartItem, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b pb-2"
            >
              <div>
                <p className="text-white font-medium">{cartItem.item.name}</p>
                <p className="text-white">
                  ₹{cartItem.item.price} x {cartItem.quantity}
                </p>
              </div>
              <p className="text-white font-medium">
                ₹{Number(cartItem.item.price) * cartItem.quantity}
              </p>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-lg font-bold text-white">Total</p>
            <p className="text-lg font-bold text-white">₹{totalAmount}</p>
          </div>
        </div>
      </div>
      <div className="bg-black p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-white mb-4">
          Payment Method
        </h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => setPaymentMethod("cod")}
              className="form-radio h-4 w-4 text-white"
            />
            <span className="text-white">Cash on Delivery</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
              className="form-radio h-4 w-4 text-white"
            />
            <span className="text-white">Online Payment</span>
          </label>
        </div>
        {paymentMethod === "online" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-white mb-2">
              Card Details
            </label>
            <CardElement
              className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      {error && <p className="text-red-600 mt-4">{error}</p>}
      {success ? (
        <p className="text-green-600 mt-4">
          Payment successful! Thank you for your order.
        </p>
      ) : loading ? (
        <p className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md">
          Processing...
        </p>
      ) : (
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
          disabled={!stripe && paymentMethod === "online"}
        >
          Place Order
        </button>
      )}
    </form>
  );
};

const CheckoutPage: React.FC = () => {
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
          <div className="mx-auto max-w-2xl py-8 mt-20">
            <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
        <Footer />
      </div>
    </Provider>
  );
};

export default CheckoutPage;
