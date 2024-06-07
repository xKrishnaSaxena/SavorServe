import React from "react";

interface Review {
  username: string;
  userReviews: number;
  userFollowers: number;
  rating: number;
  type: string;
  time: string;
  content: string;
}

const reviews: Review[] = [
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
];

const Reviews: React.FC = () => {
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
