"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Carousel from "../ui/Carousel";
import { Restaurant, Image } from "@/types/Restaurant";

interface MenuProps {
  restaurant: Restaurant;
  onPhotoAdded: (newPhoto: Image) => void;
  onPhotoDeleted: (photoId: number) => void;
}

const Menu: React.FC<MenuProps> = ({
  restaurant,
  onPhotoAdded,
  onPhotoDeleted,
}) => {
  const { data: session } = useSession();
  const isAdmin = parseInt(session?.user?.id || "") === restaurant.adminId;
  const [isEditing, setIsEditing] = useState(false);

  if (!isAdmin) {
    return (
      <>
        <div className="text-center text-white mb-5">
          Photos of Menu by {restaurant.name}
        </div>
        <Carousel images={restaurant.menuPhotos} />
      </>
    );
  }

  return (
    <>
      {isEditing ? (
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">
            Editing Menu Photos
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {restaurant.menuPhotos.map((photo) => (
              <div key={photo.id} className="relative">
                <img
                  src={photo.url}
                  alt="Menu photo"
                  className="w-full h-32 object-cover"
                />
                <button
                  onClick={async () => {
                    await fetch(
                      `/api/restaurant/${restaurant.id}/menu-photos/${photo.id}`,
                      {
                        method: "DELETE",
                      }
                    );
                    onPhotoDeleted(photo.id);
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            multiple
            onChange={async (e) => {
              const files = e.target.files;
              if (files) {
                for (const file of Array.from(files)) {
                  const formData = new FormData();
                  formData.append("file", file);
                  const res = await fetch(
                    `/api/restaurant/${restaurant.id}/menu-photos`,
                    {
                      method: "POST",
                      body: formData,
                    }
                  );
                  const newPhoto = await res.json();
                  onPhotoAdded(newPhoto);
                }
              }
            }}
            className="mt-4 bg-gray-800 text-white p-2 rounded-md text-center"
            accept="image/*"
          />
          <button
            onClick={() => setIsEditing(false)}
            className="mt-4 px-4 py-2 bg-black text-white rounded-md"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          <div className="text-center text-white mb-5">
            Photos of Menu by {restaurant.name}
          </div>
          <Carousel images={restaurant.menuPhotos} />
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md"
          >
            Edit
          </button>
        </>
      )}
    </>
  );
};

export default Menu;
