import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useSession } from "next-auth/react";
import { Dish } from "@/types/Restaurant";
import { useToast } from "../ui/use-toast";
import Modal from "../ui/Modal";

interface DishItemProps {
  dish: Dish;
  adminId: number;
}

const DishItem: React.FC<DishItemProps> = ({ dish, adminId }) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const { toast } = useToast();
  const isAdmin = parseInt(session?.user?.id || "") === adminId;
  const [isEditing, setIsEditing] = useState(false);
  const [editedDish, setEditedDish] = useState({
    name: dish.name,
    price: dish.price,
  });

  const handleAddToCart = () => {
    addToCart(dish, quantity);
    setJustAdded(true);
    toast({ title: "Added to cart successfully! ⬆️" });
    setTimeout(() => setJustAdded(false), 1000);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/dish/${dish.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedDish),
      });
      if (response.ok) {
        setIsEditing(false);
        toast({ title: "Dish updated successfully!" });
      } else {
        console.error("Failed to update dish");
        toast({ title: "Failed to update dish", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error updating dish:", error);
      toast({ title: "Error updating dish", variant: "destructive" });
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      try {
        const response = await fetch(`/api/dish/${dish.id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          toast({ title: "Dish deleted successfully!" });
        } else {
          console.error("Failed to delete dish");
          toast({ title: "Failed to delete dish", variant: "destructive" });
        }
      } catch (error) {
        console.error("Error deleting dish:", error);
        toast({ title: "Error deleting dish", variant: "destructive" });
      }
    }
  };

  return (
    <li className="flex items-center justify-between px-4 py-3 bg-black border rounded-lg shadow-md transition-all duration-200 hover:shadow-lg">
      <div className="flex-grow">
        <span className="text-lg font-semibold text-white">{dish.name}</span>
        <span className="text-gray-400 ml-2">(₹{dish.price})</span>
      </div>
      {session?.user?.role === "customer" && (
        <div className="flex items-center space-x-2">
          <div className="flex items-center border rounded-md">
            <button
              className="px-2 py-1 bg-black text-gray-400 rounded-l-md hover:bg-gray-200"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-12 text-center border-none focus:ring-0"
            />
            <button
              className="px-2 py-1 bg-black text-gray-400 rounded-r-md hover:bg-gray-200"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
          <button
            className={`px-4 py-2 rounded-lg text-white transition-colors duration-300 ${
              justAdded ? "bg-green-500" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
            onClick={handleAddToCart}
          >
            {justAdded ? "Added!" : "+ Add to Cart"}
          </button>
        </div>
      )}
      {isAdmin && (
        <>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            onClick={handleEditClick}
          >
            Edit
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 ml-2"
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </>
      )}
      {isEditing && (
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <h3 className="text-xl font-bold mb-4 text-black">Edit Dish</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dish Name
              </label>
              <input
                type="text"
                value={editedDish.name}
                onChange={(e) =>
                  setEditedDish({ ...editedDish, name: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dish Price
              </label>
              <input
                type="text"
                value={editedDish.price}
                onChange={(e) =>
                  setEditedDish({
                    ...editedDish,
                    price: parseInt(e.target.value),
                  })
                }
                className="mt-1 block w-full px-3 py-2 border rounded-md text-black"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </Modal>
      )}
    </li>
  );
};

export default DishItem;
