import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { dishId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dishId = params.dishId;
  const { name, price } = await req.json();

  try {
    const dish = await prisma.dish.findUnique({
      where: { id: parseInt(dishId) },
      include: {
        menu: {
          include: {
            restaurant: true,
          },
        },
      },
    });

    if (!dish) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    // Check if the user is the admin of the restaurant
    if (dish.menu.restaurant.adminId !== parseInt(session?.user?.id || "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Update the dish
    const updatedDish = await prisma.dish.update({
      where: { id: parseInt(dishId) },
      data: { name, price },
    });

    return NextResponse.json({ updatedDish });
  } catch (error) {
    console.error("Error updating dish:", error);
    return NextResponse.json(
      { error: "Failed to update dish" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { dishId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dishId = params.dishId;

  try {
    const dish = await prisma.dish.findUnique({
      where: { id: parseInt(dishId) },
      include: {
        menu: {
          include: {
            restaurant: true,
          },
        },
      },
    });

    if (!dish) {
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });
    }

    // Check if the user is the admin of the restaurant
    if (dish.menu.restaurant.adminId !== parseInt(session?.user?.id || "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete the dish
    await prisma.dish.delete({
      where: { id: parseInt(dishId) },
    });

    return NextResponse.json({ message: "Dish deleted successfully" });
  } catch (error) {
    console.error("Error deleting dish:", error);
    return NextResponse.json(
      { error: "Failed to delete dish" },
      { status: 500 }
    );
  }
}
