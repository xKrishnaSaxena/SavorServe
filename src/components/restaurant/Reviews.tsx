import { Review } from "@/types/Restaurant";
import React from "react";

interface ReviewsProps {
  reviews: Review[];
}
const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Pizza Plaza Reviews</h2>
      {reviews.map((review, index) => (
        <div key={index} className="border-b pb-4 mb-4">
          <div className="flex items-center mb-2">
            <div>
              <h4 className="font-bold">{review.username}</h4>
              <p className="text-sm text-gray-500">
                {review.userReviews} reviews | {review.userFollowers} Followers
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="bg-green-500 text-white py-1 px-2 rounded">
              {review.rating}
            </span>
            <span className="text-sm text-gray-500">{review.type}</span>
            <span className="text-sm text-gray-500">{review.time}</span>
          </div>
          <p className="mb-2">{review.content}</p>
          <div className="flex text-blue-500 text-sm">
            <button className="mr-4">Helpful</button>
            <button className="mr-4">Comment</button>
            <button>Share</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
