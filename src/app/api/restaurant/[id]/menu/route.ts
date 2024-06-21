import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Check if the category already exists for the given restaurant
    const existingMenu = await prisma.menu.findFirst({
      where: {
        restaurantId: data.restaurantId,
        category: data.category,
      },
      include: {
        dishes: true,
      },
    });

    if (existingMenu) {
      // Category already exists, add dishes to the existing category
      const dishes = data.dishes.map((dish: { name: string; price: string }) => ({
        name: dish.name,
        price: dish.price,
      }));

      const updatedMenu = await prisma.menu.update({
        where: { id: existingMenu.id }, // Use id to update the existing menu
        data: {
          dishes: {
            create: dishes,
          },
        },
        include: {
          dishes: true,
        },
      });

      return NextResponse.json({ updatedMenu });
    } else {
      // Category does not exist, create a new menu category with dishes
      const dishes = data.dishes.map((dish: { name: string; price: string }) => ({
        name: dish.name,
        price: dish.price,
      }));

      const newMenu = await prisma.menu.create({
        data: {
          category: data.category,
          restaurant: { connect: { id: data.restaurantId } }, // Connect to existing restaurant
          dishes: {
            create: dishes,
          },
        },
        include: {
          dishes: true,
        },
      });

      return NextResponse.json({ newMenu });
    }
  } catch (error) {
    console.error("Error creating or updating menu:", error);
    return NextResponse.json({ error: "Failed to create or update menu" }, { status: 500 });
  }
}
