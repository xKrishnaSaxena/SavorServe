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
  console.log(initialname);
  let initialaddress;
  if (session?.user?.address) {
    initialaddress = session?.user.address;
  }
  console.log(initialaddress);
  const [name, setName] = useState(initialname);
  const [address, setAddress] = useState(initialaddress);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { cartItems, clearCart } = useCart();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (paymentMethod === "cod") {
      setLoading(true);
      setTimeout(() => {
        setSuccess(true);
        clearCart();
        setLoading(false);
      }, 3000); // Assuming 3 seconds for processing COD

      return;
    }

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { clientSecret } = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: cartItems.reduce((acc, item) => acc + Number(item.price), 0),
        }),
      }).then((res) => res.json());

      const cardElement = elements.getElement(CardElement);

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
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
    } catch (error) {
      setError("Failed to process payment");
      setLoading(false);
      console.error("Error processing payment:", error);
    }
  };
  if (!session) {
    return <Spinner />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-white"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={initialname}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-white"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            value={initialaddress}
            onChange={(e) => setAddress(e.target.value)}
            className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Items</h3>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg font-bold">
            Total: ₹
            {cartItems.reduce((total, item) => total + Number(item.price), 0)}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Payment Method</h3>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <span className="ml-2">Cash on Delivery</span>
            </label>
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="paymentMethod"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
              />
              <span className="ml-2">Online Payment</span>
            </label>
          </div>
        </div>
        {paymentMethod === "online" && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-white">
              Card Details
            </label>
            <CardElement
              className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              options={{
                style: {
                  base: {
                    color: "#fff",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#ff0000",
                  },
                },
              }}
            />
          </div>
        )}
        {error && <p className="text-red-600">{error}</p>}
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
            className={`mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700`}
            disabled={!stripe || loading}
          >
            Place Order
          </button>
        )}
      </div>
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

          <div className="mx-auto max-w-md py-8 mt-32">
            <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
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
