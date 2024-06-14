"use client";

import React from "react";
import { Review } from "@/types/Restaurant";
import Provider from "../ui/Provider";
import AddReview from "./AddReview";
interface ReviewsProps {
  reviews: Review[];
  id: string; // Assuming id is a string
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, id }) => {
  // Function to format ISO 8601 time string to a readable format
  const formatTime = (isoTimeString: string) => {
    // Create a Date object from the ISO 8601 string
    const date = new Date(isoTimeString);

    // Format the date into a readable format
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZoneName: "short",
    };

    return date.toLocaleString("en-US", options);
  };

  return (
    <Provider>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.map((review, index) => (
          <div key={index} className="border-b pb-4 mb-4">
            <div className="flex items-center mb-2">
              <div>
                <h4 className="font-bold">{review.username}</h4>
                <p className="text-sm text-gray-500">
                  {review.userReviews} reviews | {review.userFollowers}{" "}
                  Followers
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="bg-green-500 text-white py-1 px-2 rounded">
                {review.rating}
              </span>
              <span className="text-sm text-gray-500">{review.type}</span>
              {/* Format time using the formatTime function */}
              <span className="text-sm text-gray-500">
                {formatTime(review.time)}
              </span>
            </div>
            <p className="mb-2">{review.content}</p>
            <div className="flex text-blue-500 text-sm">
              <button className="mr-4">Helpful</button>
              <button className="mr-4">Comment</button>
              <button>Share</button>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-6">
          <AddReview id={id} />
        </div>
      </div>
    </Provider>
  );
};

export default Reviews;
