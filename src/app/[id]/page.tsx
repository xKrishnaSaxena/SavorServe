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
import Spinner from "@/components/ui/Spinner";
import Provider from "@/components/ui/Provider";
import AddMenu from "@/components/restaurant/AddMenu";
import { useSession } from "next-auth/react";

type Params = {
  id: string;
};

const RestaurantPage = ({ params }: { params: Params }) => {
  const { id } = params;
  const { data: session } = useSession();

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
        setRestaurant(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  const handlePhotoAdded = (newPhoto: any) => {
    setRestaurant((prev: any) => ({
      ...prev,
      menuPhotos: [...prev.menuPhotos, newPhoto],
    }));
  };

  const handlePhotoDeleted = (photoId: any) => {
    setRestaurant((prev: any) => ({
      ...prev,
      menuPhotos: prev.menuPhotos.filter((photo: any) => photo.id !== photoId),
    }));
  };

  if (loading) {
    return <Spinner />;
  }

  const adminId = parseInt(session?.user?.id || "");

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  const sections = [
    "Overview",
    "Order Online",
    "Reviews",
    "MenuPhotos",
    ...(restaurant.adminId === adminId ? ["Add Menu"] : []),
  ];

  const renderSection = () => {
    switch (currentSection) {
      case "Overview":
        return <Overview restaurant={restaurant} />;
      case "Order Online":
        return (
          <div className="flex">
            <Sidebar menu={restaurant.menu} />
            <Order menu={restaurant.menu} adminId={restaurant.adminId} />
          </div>
        );
      case "Reviews":
        return <Review reviews={restaurant.reviews} id={id} />;
      case "MenuPhotos":
        return (
          <Menu
            restaurant={restaurant}
            onPhotoAdded={handlePhotoAdded}
            onPhotoDeleted={handlePhotoDeleted}
          />
        );
      case "Add Menu":
        return (
          <div className="flex justify-center mt-6">
            <AddMenu id={id} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Provider>
      <div className="bg-white-100">
        <Header />
        <div className="relative isolate px-6 pt-14 lg:px-8">
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
            <div className="mt-10 overflow-x-auto">
              <Navbar
                sections={sections}
                currentSection={currentSection}
                setCurrentSection={setCurrentSection}
              />
            </div>
            <div className="mt-10">{renderSection()}</div>
          </div>
        </div>
        <Footer />
      </div>
    </Provider>
  );
};

export default RestaurantPage;
