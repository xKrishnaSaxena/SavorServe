"use client";
import { useEffect, useState } from "react";
import Provider from "@/components/ui/Provider";
import Header from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import Carousel2 from "@/components/ui/Carousel2";
import AddRestaurant from "@/components/restaurant/AddRestaurant";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/Spinner";

interface Restaurant {
  id: number;
  name: string;
  images: { url: string }[];
}

export default function Example() {
  const [loading, setLoading] = useState(true);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await fetch(`/api/`);
        if (!res.ok) {
          throw new Error("Failed to fetch restaurant");
        }
        const data = await res.json();
        setRestaurants(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, []);

  const [searchResults, setSearchResults] = useState<Restaurant[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const router = useRouter();

  const images = [
    "images/marineroom.jpg",
    "images/punjab.jpg",
    "images/sharma.jpg",
    "images/skybar.jpg",
    "images/tunday.jpg",
  ];

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setSearchResults(restaurants);
  };

  const handleSearchBlur = (e: React.FocusEvent<HTMLFormElement>) => {
    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    setIsSearchFocused(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    const filteredResults = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query)
    );
    setSearchResults(filteredResults);
  };

  const handleRestaurantClick = (id: number) => {
    router.push(`/${id}`);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Provider>
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
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-28">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Your next meal is just a click away. Order now!
              </h1>
              <p className="mt-6 text-lg leading-8 text-white">
                Discover and order your favorite dishes from top-rated
                restaurants with SavorServe. Fast, fresh, and convenient food
                delivery, right at your doorstep.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <form
                  className="w-full max-w-lg"
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                >
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="search"
                      name="search"
                      className="block w-full p-5 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-black dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search for a restaurant, cuisine or a dish"
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div
                    className={`mt-8 ml-3 ${
                      isSearchFocused ? "block" : "hidden"
                    } search-results`}
                  >
                    {searchResults.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        tabIndex={0} // Make the div focusable
                        onClick={() => handleRestaurantClick(restaurant.id)}
                        className="search-results-item flex items-center justify-between p-3 mb-2 bg-gray-900 border border-gray-300 rounded-lg cursor-pointer  hover:bg-gray-600 focus:bg-gray-600"
                      >
                        <div>
                          <h2 className="text-lg font-semibold ">
                            {restaurant.name}
                          </h2>
                        </div>
                        {restaurant.images.length > 0 && (
                          <img
                            src={restaurant.images[0].url}
                            alt={restaurant.name}
                            className="w-12 h-12 rounded-lg"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </form>
              </div>

              <div className="mt-10">
                <Carousel2 images={images} />
              </div>
              <div className="pt-12">
                <AddRestaurant />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}
