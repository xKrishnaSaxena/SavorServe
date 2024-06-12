"use client";

import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import React, { useState } from "react";
import { MenuItem } from "@/types/Restaurant";

export default function AddRestaurant() {
  const [restaurant, setRestaurant] = useState({
    name: "",
    rating: 5,
    diningRatings: 5,
    deliveryRating: 5,
    deliveryReviews: "1k",
    cuisines: "",
    location: "",
    status: "",
    timing: "",
    safetyMeasures: "",
    knownFor: "",
    averageCost: "",
    paymentMethods: "",
    moreInfo: "",
    images: [
      "images/marineroom.jpg",
      "images/punjab.jpg",
      "images/sharma.jpg",
      "images/skybar.jpg",
      "images/tunday.jpg",
    ],
    menuPhotos: ["images/menu1.jpg", "images/menu2.jpg", "images/menu3.png"],
  });
  const [menu, setMenu] = useState([{ category: "", dishes: [] }]);

  const [categories, setCategories] = useState<MenuItem[]>([]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRestaurant((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMenuChange = (
    e: any,
    categoryIndex: number,
    dishIndex: number
  ) => {
    const { value } = e.target;
    const newCategories = [...categories];
    newCategories[categoryIndex].dishes[dishIndex] = value;
    setCategories(newCategories);
  };

  const handleAddDish = (categoryIndex: number) => {
    const newCategories = [...categories];
    newCategories[categoryIndex].dishes.push("");
    setCategories(newCategories);
  };

  const handleRemoveLastDish = (categoryIndex: number) => {
    const newCategories = [...categories];
    if (newCategories[categoryIndex].dishes.length > 1) {
      newCategories[categoryIndex].dishes.pop();
      setCategories(newCategories);
    }
  };

  const handleCategoryChange = (e: any, index: number) => {
    const { name, value } = e.target;
    const newCategories = [...categories];
    newCategories[index] = { ...newCategories[index], [name]: value };
    setCategories(newCategories);
  };

  const handleAddCategory = () => {
    setCategories((prev) => [...prev, { category: "", dishes: [""] }]);
  };

  const handleCategorySubmit = (e: React.SyntheticEvent, index: number) => {
    e.preventDefault();
    // const newMenuItem = categories[index];
    // setRestaurant((prev) => ({
    //   ...prev,
    //   menu: [...prev.menu, newMenuItem],
    // }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(restaurant);
    const response = await fetch("/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(restaurant),
    });
    console.log(response);
    console.log(response.body);
    if (response.ok) {
      console.log("Restaurant added successfully");
      // Reset form or redirect user
    } else {
      console.error("Error adding restaurant");
    }
  };

  return (
    <div className="bg-white-100 flex flex-col min-h-screen">
      <Header />
      <div className="relative isolate px-6 pt-2 lg:px-8 flex-grow">
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
        <div className="mx-auto max-w-7xl py-8 mt-32">
          <h2 className="text-2xl font-bold text-center mb-6">
            Add New Restaurant
          </h2>
          <div className="flex space-x-8">
            <form
              className="space-y-4 text-black w-1/2"
              onSubmit={handleSubmit}
            >
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
                  name="name"
                  value={restaurant.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="cuisines"
                  className="block text-sm font-medium text-white"
                >
                  Cuisines
                </label>
                <input
                  type="text"
                  id="cuisines"
                  name="cuisines"
                  value={restaurant.cuisines}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-white"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={restaurant.location}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-white"
                >
                  Status
                </label>
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={restaurant.status}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="timing"
                  className="block text-sm font-medium text-white"
                >
                  Timing
                </label>
                <input
                  type="text"
                  id="timing"
                  name="timing"
                  value={restaurant.timing}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="safetyMeasures"
                  className="block text-sm font-medium text-white"
                >
                  Safety Measures
                </label>
                <input
                  type="text"
                  id="safetyMeasures"
                  name="safetyMeasures"
                  value={restaurant.safetyMeasures}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="knownFor"
                  className="block text-sm font-medium text-white"
                >
                  Known For
                </label>
                <input
                  type="text"
                  id="knownFor"
                  name="knownFor"
                  value={restaurant.knownFor}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="averageCost"
                  className="block text-sm font-medium text-white"
                >
                  Average Cost
                </label>
                <input
                  type="text"
                  id="averageCost"
                  name="averageCost"
                  value={restaurant.averageCost}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="paymentMethods"
                  className="block text-sm font-medium text-white"
                >
                  Payment Methods
                </label>
                <input
                  type="text"
                  id="paymentMethods"
                  name="paymentMethods"
                  value={restaurant.paymentMethods}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="moreInfo"
                  className="block text-sm font-medium text-white"
                >
                  More Info
                </label>
                <input
                  type="text"
                  id="moreInfo"
                  name="moreInfo"
                  value={restaurant.moreInfo}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Submit Restaurant
              </button>
            </form>
            <div className="space-y-4 text-black w-1/2">
              {categories.map((category, categoryIndex) => (
                <form
                  key={categoryIndex}
                  className="space-y-4"
                  onSubmit={(e) => handleCategorySubmit(e, categoryIndex)}
                >
                  <div>
                    <label
                      htmlFor={`category-${categoryIndex}`}
                      className="block text-sm font-medium text-white"
                    >
                      Category
                    </label>
                    <input
                      type="text"
                      id={`category-${categoryIndex}`}
                      name="category"
                      value={category.category}
                      onChange={(e) => handleCategoryChange(e, categoryIndex)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  {category.dishes.map((dish, dishIndex) => (
                    <div key={dishIndex}>
                      <label
                        htmlFor={`dish-${categoryIndex}-${dishIndex}`}
                        className="block text-sm font-medium text-white"
                      >
                        Dish
                      </label>
                      <input
                        type="text"
                        id={`dish-${categoryIndex}-${dishIndex}`}
                        name={`dish-${categoryIndex}-${dishIndex}`}
                        value={dish}
                        onChange={(e) =>
                          handleMenuChange(e, categoryIndex, dishIndex)
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddDish(categoryIndex)}
                    className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                  >
                    Add Dish
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveLastDish(categoryIndex)}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Remove Last Dish
                  </button>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  >
                    Submit Category
                  </button>
                </form>
              ))}
              <button
                type="button"
                onClick={handleAddCategory}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}