"use client";

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
import { useState, useEffect } from "react";

type Params = {
  id: string;
};

const RestaurantPage = ({ params }: { params: Params }) => {
  const { id } = params;

  const [currentSection, setCurrentSection] = useState("Overview");
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`/api/restaurant/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch restaurant");
        }
        const data = await res.json();
        console.log(data);
        setRestaurant(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
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
