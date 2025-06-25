import { createContext, useContext, useState } from "react";
import { Dish } from "@/types/Restaurant";

type CartItem = {
  item: Dish;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: Dish, quantity: number) => void;
  removeFromCart: (itemId: number, removeEntirely?: boolean) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Dish, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((ci) => ci.item.id === item.id);
      if (existingItem) {
        return prevItems.map((ci) =>
          ci.item.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        );
      } else {
        return [...prevItems, { item, quantity }];
      }
    });
  };

  const removeFromCart = (itemId: number, removeEntirely: boolean = false) => {
    setCartItems((prevItems) => {
      if (removeEntirely) {
        return prevItems.filter((ci: any) => ci.item.id !== itemId);
      } else {
        return prevItems
          .map((ci: any) =>
            ci.item.id === itemId ? { ...ci, quantity: ci.quantity - 1 } : ci
          )
          .filter((ci) => ci.quantity > 0);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
