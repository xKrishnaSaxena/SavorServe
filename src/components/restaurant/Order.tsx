import { MenuItem } from "@/types/Restaurant";
import React from "react";

interface OrderProps {
  menu: MenuItem[];
}

const Order: React.FC<OrderProps> = ({ menu }) => {
  return (
    <div className=" ml-32 ">
      {menu.map((item, index) => (
        <div key={index} id={item.category} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{item.category}</h2>
          <ul>
            {item.dishes.map((dish, dishIndex) => (
              <li key={dishIndex} className="mb-2">
                {dish}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Order;
