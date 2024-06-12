import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  let { id } = params;
  id = id * 1;
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: id },
    include: {
      menu: true,
      reviews: true,
    },
  });

  if (restaurant) {
    return NextResponse.json(restaurant);
  } else {
    return NextResponse.json(
      { message: "Restaurant not found" },
      { status: 404 }
    );
  }
}
