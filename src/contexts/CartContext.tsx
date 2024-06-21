"use client";
import React, { createContext, useContext, useState } from "react";

// Define Dish type
export interface Dish {
  id: number;
  name: string;
  price: number;
}

// Define CartContext interface
interface CartContextType {
  cartItems: Dish[];
  addToCart: (dish: Dish) => void;
  removeFromCart: (dishId: number) => void;
  clearCart: () => void;
}

// Create CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// CartProvider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<Dish[]>([]);

  const addToCart = (dish: Dish) => {
    setCartItems((prevCartItems) => [...prevCartItems, dish]);
  };

  const removeFromCart = (dishId: number) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== dishId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// useCart hook to consume CartContext
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
