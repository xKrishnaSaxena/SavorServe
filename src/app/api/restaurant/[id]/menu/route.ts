import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const newMenu = await prisma.menuItem.create({
      data: {
        category: data.category,
        dishes: data.dishes,
        restaurantId: data.restaurantId,
      },
    });
    return NextResponse.json({ newMenu });
  } catch (error) {
    console.log(error);
  }
}
