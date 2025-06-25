"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Restaurant, RestaurantFormData } from "../../types/Restaurant";

interface OverviewProps {
  restaurant: Restaurant;
}

const Overview: React.FC<OverviewProps> = ({ restaurant }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const isAdmin = parseInt(session?.user?.id || "") === restaurant.adminId;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: restaurant.name,
    rating: restaurant.rating,
    diningRatings: restaurant.diningRatings,
    deliveryRating: restaurant.deliveryRating,
    deliveryReviews: restaurant.deliveryReviews,
    cuisines: restaurant.cuisines,
    location: restaurant.location,
    status: restaurant.status,
    timing: restaurant.timing,
    safetyMeasures: restaurant.safetyMeasures,
    knownFor: restaurant.knownFor,
    averageCost: restaurant.averageCost,
    paymentMethods: restaurant.paymentMethods,
    moreInfo: restaurant.moreInfo,
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/restaurant/${restaurant.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsEditing(false);
        router.refresh();
      } else {
        console.error("Failed to update restaurant");
      }
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  return (
    <div className="text-left text-white">
      <p className="mt-6 text-lg leading-8">
        <strong>Cuisines: </strong>
        {restaurant.cuisines.join(", ")}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Location: </strong>
        {restaurant.location}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Status: </strong>
        {restaurant.status}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Timings: </strong>
        {restaurant.timing}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Safety Measures: </strong>
        {restaurant.safetyMeasures.join(", ")}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Known For: </strong>
        {restaurant.knownFor.join(", ")}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Average Cost: </strong>
        {restaurant.averageCost}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>Payment Methods: </strong>
        {restaurant.paymentMethods.join(", ")}
      </p>
      <p className="mt-6 text-lg leading-8">
        <strong>More Info: </strong>
        {restaurant.moreInfo.join(", ")}
      </p>
      {isAdmin && (
        <button
          onClick={handleEditClick}
          className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Edit
        </button>
      )}
      {isEditing && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Edit Restaurant
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-black">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <div>
                <label htmlFor="cuisines" className="block text-black">
                  Cuisines
                </label>
                <input
                  type="text"
                  id="cuisines"
                  value={formData.cuisines.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cuisines: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-black">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value,
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-black">
                  Status
                </label>
                <input
                  type="text"
                  id="status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value,
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <div>
                <label htmlFor="timing" className="block text-black">
                  Timings
                </label>
                <input
                  type="text"
                  id="timing"
                  value={formData.timing}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      timing: e.target.value,
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <div>
                <label htmlFor="safetyMeasures" className="block text-black">
                  Safety Measures
                </label>
                <input
                  type="text"
                  id="safetyMeasures"
                  value={formData.safetyMeasures.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      safetyMeasures: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <div>
                <label htmlFor="knownFor" className="block text-black">
                  Known For
                </label>
                <input
                  type="text"
                  id="knownFor"
                  value={formData.knownFor.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      knownFor: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <div>
                <label htmlFor="averageCost" className="block text-black">
                  Average Cost
                </label>
                <input
                  type="text"
                  id="averageCost"
                  value={formData.averageCost}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      averageCost: e.target.value,
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <div>
                <label htmlFor="paymentMethods" className="block text-black">
                  Payment Modes
                </label>
                <input
                  type="text"
                  id="paymentMethods"
                  value={formData.paymentMethods.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      paymentMethods: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <div>
                <label htmlFor="moreInfo" className="block text-black">
                  More Info
                </label>
                <input
                  type="text"
                  id="moreInfo"
                  value={formData.moreInfo.join(", ")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      moreInfo: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    })
                  }
                  className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
