"use client";
import React from "react";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Provider from "@/components/ui/Provider";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, addToCart } = useCart();
  const router = useRouter();

  const totalPrice = cartItems.reduce(
    (total, cartItem) =>
      total + Number(cartItem.item.price) * cartItem.quantity,
    0
  );

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
              <div className="text-center py-10">
                <p className="text-xl font-semibold text-gray-700">
                  Your cart is empty.
                </p>
                <p className="text-gray-500 mt-2">
                  Add some delicious dishes to get started!
                </p>
              </div>
            ) : (
              <>
                <ul className="space-y-4">
                  {cartItems.map((cartItem, index) => (
                    <li
                      key={index}
                      className="p-4 bg-black border rounded-lg shadow-md flex items-center justify-between transition-all duration-200 hover:shadow-lg"
                    >
                      <div>
                        <p className="text-lg text-white font-semibold ">
                          {cartItem.item.name}
                        </p>
                        <p className="text-gray-400">
                          ₹{cartItem.item.price} x {cartItem.quantity} = ₹
                          {Number(cartItem.item.price) * cartItem.quantity}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-2 py-1 bg-black text-gray-400 rounded-l-md hover:bg-gray-200"
                            onClick={() => removeFromCart(cartItem.item.id)}
                          >
                            -
                          </button>
                          <span className="px-4 text-white">
                            {cartItem.quantity}
                          </span>
                          <button
                            className="px-2 py-1 bg-black text-gray-400 rounded-r-md hover:bg-gray-200"
                            onClick={() => addToCart(cartItem.item, 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="ml-4 text-red-600 hover:text-red-800 font-medium"
                          onClick={() => removeFromCart(cartItem.item.id, true)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 bg-black p-4 rounded-lg shadow-md">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-white">
                      Total: ₹{totalPrice}
                    </span>
                    <div className="space-x-4">
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                        onClick={() => clearCart()}
                      >
                        Clear Cart
                      </button>
                      <button
                        className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                        onClick={() => router.push("/checkout")}
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
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
