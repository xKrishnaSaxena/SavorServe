// src/app/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Carousel from "../../components/ui/Carousel";
import Navbar from "../../components/ui/Navbar";
import Overview from "@/components/restaurant/Overview";
import Order from "@/components/restaurant/Order";
import Review from "@/components/restaurant/Reviews";
import Menu from "@/components/restaurant/Menu";
import Sidebar from "@/components/restaurant/Sidebar";

import { Restaurant } from "@/types/Restaurant";

type Params = {
  id: string;
};

const RestaurantPage = ({ params }: { params: Params }) => {
  const { id } = params;

  const [currentSection, setCurrentSection] = useState("Overview");

  const restaurant = {
    name: "Pizza Plaza",
    rating: 3.0,
    diningRatings: 28,
    deliveryRating: 4.2,
    deliveryReviews: "37.1K",
    cuisines: [
      "Pizza",
      "Fast Food",
      "Chinese",
      "North Indian",
      "Street Food",
      "Momos",
      "Desserts",
      "Beverages",
    ],
    location: "Rajajipuram, Lucknow",
    status: "Open now",
    timing: "10am – 11pm (Today)",
    safetyMeasures: ["Rider Hand Wash", "Daily Temp. Checks"],
    menu: [
      {
        category: "Pizza",
        dishes: [
          "Veg Cheese Pizza [7 inches]",
          "Capsicum Cheese Pizza [7 inches]",
          "Tomato Cheese Pizza [7 inches]",
          "Onion Cheese Pizza [7 inches]",
          "Red onion & mozzarella cheese",
          "Capsicum Tomato Pizza [7 inches]",
        ],
      },
      {
        category: "Fried Rice",
        dishes: [
          "Veg Cheese Pizza [7 inches]",
          "Capsicum Cheese Pizza [7 inches]",
          "Tomato Cheese Pizza [7 inches]",
          "Onion Cheese Pizza [7 inches]",
          "Red onion & mozzarella cheese",
          "Capsicum Tomato Pizza [7 inches]",
        ],
      },
      {
        category: "Indian",
        dishes: [
          "Veg Cheese Pizza [7 inches]",
          "Capsicum Cheese Pizza [7 inches]",
          "Tomato Cheese Pizza [7 inches]",
          "Onion Cheese Pizza [7 inches]",
          "Red onion & mozzarella cheese",
          "Capsicum Tomato Pizza [7 inches]",
        ],
      },
      {
        category: "Chinese",
        dishes: [
          "Veg Cheese Pizza [7 inches]",
          "Capsicum Cheese Pizza [7 inches]",
          "Tomato Cheese Pizza [7 inches]",
          "Onion Cheese Pizza [7 inches]",
          "Red onion & mozzarella cheese",
          "Capsicum Tomato Pizza [7 inches]",
        ],
      },
    ],
    knownFor: [
      "Great Recommendations",
      "Great Ambiance",
      "Fast Delivery",
      "Reasonable Prices",
      "Nice Taste",
      "Good Taste",
    ],
    averageCost: "₹450 for two people (approx.)",
    paymentMethods: ["Cash and Cards accepted", "Digital payments accepted"],
    moreInfo: [
      "Breakfast",
      "Home Delivery",
      "Takeaway Available",
      "Vegetarian Only",
      "Desserts and Bakes",
      "Indoor Seating",
      "Table reservation required",
    ],
    images: [
      "images/marineroom.jpg",
      "images/punjab.jpg",
      "images/sharma.jpg",
      "images/skybar.jpg",
      "images/tunday.jpg",
    ],
    menuPhotos: ["images/menu1.jpg", "images/menu2.jpg", "images/menu3.png"],
    reviews: [
      {
        username: "Hasan Ahmad",
        userReviews: 5,
        userFollowers: 0,
        rating: 5,
        type: "DELIVERY",
        time: "19 hours ago",
        content: "",
      },
      {
        username: "I Like Spicy And Crunchy",
        userReviews: 2,
        userFollowers: 0,
        rating: 5,
        type: "DELIVERY",
        time: "yesterday",
        content: "",
      },
      {
        username: "Swati Thakur",
        userReviews: 4,
        userFollowers: 0,
        rating: 1,
        type: "DELIVERY",
        time: "3 days ago",
        content:
          "I had ordered cheese paneer momos and they have delivered only paneer momos and taste of tandoori momos was pathetic",
      },
      {
        username: "Mr Ayush",
        userReviews: 3,
        userFollowers: 0,
        rating: 5,
        type: "DELIVERY",
        time: "4 days ago",
        content: "",
      },
      {
        username: "Prapti Mishra",
        userReviews: 5,
        userFollowers: 0,
        rating: 5,
        type: "DELIVERY",
        time: "4 days ago",
        content: "",
      },
    ],
  };

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  const sections = ["Overview", "Order Online", "Reviews", "Menu"];

  const renderSection = () => {
    switch (currentSection) {
      case "Overview":
        return <Overview restaurant={restaurant} />;
      case "Order Online":
        return (
          <div className="flex">
            <Sidebar menu={restaurant.menu} />
            <Order menu={restaurant.menu} />
          </div>
        );
      case "Reviews":
        return <Review reviews={restaurant.reviews} />;
      case "Menu":
        return <Menu restaurant={restaurant} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white-100">
      <Header />
      <div className="relative isolate px-6 pt-14 lg:px-8">
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
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {restaurant.name}
            </h1>
            <div className="mt-6 flex justify-center">
              <div className="text-lg leading-8 text-white mr-4">
                {restaurant.rating} ★ | {restaurant.diningRatings} Dining
                Ratings
              </div>
              <div className="text-lg leading-8 text-white">
                {restaurant.deliveryRating} ★ | {restaurant.deliveryReviews}
                Delivery Ratings
              </div>
            </div>
            <div className="mt-10">
              <Carousel images={restaurant.images} />
            </div>
          </div>
          <Navbar
            sections={sections}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
          <div className="mt-10">{renderSection()}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RestaurantPage;
