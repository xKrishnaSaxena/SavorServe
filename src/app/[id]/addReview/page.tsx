"use client";

import { useState } from "react";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import Provider from "@/components/ui/Provider";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type Params = {
  id: string;
};

export default function Page({ params }: { params: Params }) {
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  let username = "";
  if (session?.user?.username) {
    username = session?.user.username;
  }
  let userId = "";
  if (session?.user?.id) {
    userId = session?.user?.id;
  }
  const [review, setReview] = useState({
    username: username,
    userReviews: 0,
    userFollowers: 0,
    rating: 0,
    type: "",
    time: new Date().toISOString(),
    content: "",
    restaurantId: parseInt(id, 10),
    userId: parseInt(userId, 10),
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();
    console.log(review);
    try {
      const response = await fetch(`/api/restaurant/${id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      });
      const data = await response.json();
      toast({
        title: "Review added successfully",
      });
      router.push(`/${id}`);
      // You can also handle success notification or redirection here
    } catch (error) {
      toast({
        title: "Error adding the Review",
      });
    }
    setLoading(false);
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
            <h2 className="text-2xl font-bold text-center mb-6">Add Review</h2>
            <form
              onSubmit={handleFormSubmit}
              className="space-y-4 text-black w-1/2 mx-auto"
            >
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    required
                    name="username"
                    value={username}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-white"
                  >
                    Rating
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={review.rating}
                    onChange={handleChange}
                    required
                    placeholder="Please give rating out of 5"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-white"
                  >
                    Type
                  </label>
                  <input
                    type="text"
                    id="type"
                    required
                    name="type"
                    value={review.type}
                    onChange={handleChange}
                    placeholder="Mention the type of the review"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-white"
                  >
                    Content
                  </label>
                  <input
                    type="text"
                    id="content"
                    name="content"
                    value={review.content}
                    required
                    onChange={handleChange}
                    placeholder="Review here"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </Provider>
  );
}
