import React, { useState } from "react";
import { Restaurant } from "@/types/Restaurant";

interface OrderOnlineProps {
  restaurant: Restaurant;
}

const OrderOnline: React.FC<OrderOnlineProps> = ({ restaurant }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredMenu = restaurant.menu.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="text-left text-white">
      <h2 className="text-2xl font-bold mb-4">Order Online</h2>
      <input
        type="text"
        placeholder="Search within menu"
        value={searchQuery}
        onChange={handleSearchChange}
        className="mb-4 p-2 w-full border border-gray-300 rounded text-black"
      />
      <div className="mb-4">
        <h3 className="text-xl font-bold">Today's Exclusive Dishes</h3>
        {restaurant.menu.slice(0, 3).map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold">Pizza's</h3>
        {restaurant.menu.slice(3, 94).map((item, index) => (
          <MenuItem key={index} item={item} />
        ))}
      </div>
      {/* Add more sections as needed */}
    </div>
  );
};

const MenuItem: React.FC<{ item: string }> = ({ item }) => (
  <div className="mb-4">
    <p>{item}</p>
    {/* Add more details as needed */}
  </div>
);

export default OrderOnline;
