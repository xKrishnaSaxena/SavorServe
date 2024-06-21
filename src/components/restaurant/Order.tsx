import { MenuItem } from "@/types/Restaurant";
import React from "react";

interface OrderProps {
  menu: MenuItem[]; // Ensure MenuItem type is correctly imported
}

const Order: React.FC<OrderProps> = ({ menu }) => {
  console.log(menu); // Verify the structure of `menu` received

  return (
    <div className="ml-32">
      {menu.map((item, index) => (
        <div key={index} id={item.category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{item.category}</h2>
          <ul>
            {(item.dishes ?? []).map((dish, dishIndex) => (
              <li key={dishIndex} className="mb-2">
                {dish.name} - {dish.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Order;
