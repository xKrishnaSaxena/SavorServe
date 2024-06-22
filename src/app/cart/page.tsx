"use client";
import React from "react";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Provider from "@/components/ui/Provider";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const router = useRouter();
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price),
    0
  );
  console.log(totalPrice);

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

          <div className="mx-auto max-w-md py-8 mt-20">
            <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
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
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-semibold">₹{totalPrice}</span>
                  </div>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 mr-4"
                    onClick={() => clearCart()}
                  >
                    Clear Cart
                  </button>
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    onClick={() => {
                      router.push("/checkout");
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </Provider>
  );
};

export default CartPage;
