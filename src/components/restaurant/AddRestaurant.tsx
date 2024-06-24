"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const AddRestaurant = () => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user?.role === "admin" ? (
        <div className="flex justify-center mt-6">
          <Link
            href={`/add`}
            className="justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-6"
          >
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">
              Add Restaurant
            </button>
          </Link>
        </div>
      ) : (
        <div>Please log in as admin to add restaurant!</div>
      )}
    </div>
  );
};

export default AddRestaurant;
