import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const restaurants = await prisma.restaurant.findMany({
    include: {
      images: {
        select: {
          url: true,
        },
        take: 1, // Limit to only the first image
      },
    },
  });

  if (restaurants) {
    return NextResponse.json(restaurants);
  } else {
    return NextResponse.json(
      { message: "Restaurants not found" },
      { status: 404 }
    );
  }
}
