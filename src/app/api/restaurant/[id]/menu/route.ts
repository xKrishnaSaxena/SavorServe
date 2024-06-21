import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Fetch menu with its dishes included
    const menuWithDishes = await prisma.menu.findUnique({
      where: { id: data.id }, // Assuming you have the menu ID available in data
      include: {
        dishes: true, // Include the associated dishes
      },
    });

    if (!menuWithDishes) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    return NextResponse.json({ menu: menuWithDishes });
  } catch (error) {
    console.error("Error fetching menu:", error);
    return NextResponse.json({ error: "Failed to fetch menu" }, { status: 500 });
  }
}
