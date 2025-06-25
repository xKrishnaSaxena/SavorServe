"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { MenuItem } from "@/types/Restaurant";

interface OrderProps {
  menu: MenuItem[];
  adminId: number;
}

const Order: React.FC<OrderProps> = ({ menu, adminId }) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const isAdmin = session?.user?.id && parseInt(session.user.id) === adminId;

  const handleDeleteCategory = async (menuId: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this category and all its dishes?"
      )
    ) {
      try {
        const response = await fetch(`/api/menu/${menuId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast({ title: "Category deleted successfully" });
          window.location.reload();
        } else {
          toast({ title: "Failed to delete category", variant: "destructive" });
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        toast({ title: "Error deleting category", variant: "destructive" });
      }
    }
  };

  return (
    <div className="ml-32 max-w-3xl">
      {menu.map((item) => (
        <div key={item.id} className="mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white bg-gray-900 p-3 rounded-md shadow-sm">
              {item.category}
            </h2>
            {isAdmin && (
              <button
                onClick={() => handleDeleteCategory(item.id)}
                className="px-4 py-2 bg-red-500 ml-5 text-white rounded-lg hover:bg-red-600"
              >
                Delete Category
              </button>
            )}
          </div>
          <ul className="space-y-4">
            {item.dishes.map((dish) => (
              <li key={dish.id} className="text-white">
                {dish.name} - {dish.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Order;
