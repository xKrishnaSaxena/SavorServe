"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
interface AddReviewProps {
  id: string; // Define the type of the id prop
}
const AddReview: React.FC<AddReviewProps> = ({ id }) => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user?.role === "customer" ? (
        <div className="flex justify-center mt-6">
          <Link href={`/${id}/addReview`}>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              Add Review
            </button>
          </Link>
        </div>
      ) : (
        <div>Please log in to add review!</div>
      )}
    </div>
  );
};

export default AddReview;
