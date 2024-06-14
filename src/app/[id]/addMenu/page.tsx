"use client";

import { useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Provider from "@/components/ui/Provider";

type Params = {
  id: string;
};

export default function Page({ params }: { params: Params }) {
  const { id } = params;

  const [category, setCategory] = useState({
    category: "",
    dishes: [""],
    restaurantId: parseInt(id, 10),
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDishChange = (e: any, index: number) => {
    const { value } = e.target;
    const newDishes = [...category.dishes];
    newDishes[index] = value;
    setCategory((prev) => ({
      ...prev,
      dishes: newDishes,
    }));
  };

  const handleAddDish = () => {
    setCategory((prev) => ({
      ...prev,
      dishes: [...prev.dishes, ""],
    }));
  };

  const handleRemoveLastDish = () => {
    if (category.dishes.length > 1) {
      setCategory((prev) => ({
        ...prev,
        dishes: prev.dishes.slice(0, -1),
      }));
    }
  };

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(category);
    try {
      const response = await fetch(`/api/restaurant/${id}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
      const data = await response.json();
      console.log("Menu submitted successfully:", data);
      // You can also handle success notification or redirection here
    } catch (error) {
      console.error("Error submitting menu:", error);
    }
  };

  return (
    <Provider>
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
            <h2 className="text-2xl font-bold text-center mb-6">Add Menu</h2>
            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 text-black w-1/2 mx-auto"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-white"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={category.category}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {category.dishes.map((dish, index) => (
                  <div key={index}>
                    <label
                      htmlFor={`dish-${index}`}
                      className="block text-sm font-medium text-white"
                    >
                      Dish
                    </label>
                    <input
                      type="text"
                      id={`dish-${index}`}
                      name={`dish-${index}`}
                      value={dish}
                      onChange={(e) => handleDishChange(e, index)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddDish}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Add Dish
                </button>
                <button
                  type="button"
                  onClick={handleRemoveLastDish}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Remove Last Dish
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Submit Menu
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}
