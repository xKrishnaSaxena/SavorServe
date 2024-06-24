import { MenuItem, Dish } from "@/types/Restaurant"; // Adjust as per your actual types
import React from "react";
import { useCart } from "@/contexts/CartContext"; // Adjust path as per your project structure
import { useSession } from "next-auth/react";

interface OrderProps {
  menu: MenuItem[];
}

const Order: React.FC<OrderProps> = ({ menu }) => {
  const { addToCart } = useCart(); // Assuming addToCart is correctly provided by CartContext
  const { data: session } = useSession();
  return (
    <div className="ml-32">
      {menu.map((item, index) => (
        <div key={index} id={item.category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{item.category}</h2>
          <ul className="space-y-4">
            {item.dishes.map((dish: Dish, dishIndex: number) => (
              <li
                key={dishIndex}
                className="flex items-center justify-between px-4 py-2 border rounded-lg shadow-sm"
              >
                <div className="flex-grow">
                  <span className="text-lg font-semibold">{dish.name}</span>
                  <span className="text-white ml-2">(₹{dish.price})</span>
                </div>
                {session?.user?.role === "customer" ? (
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    onClick={() => addToCart(dish)}
                  >
                    + Add to Cart
                  </button>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Order;
