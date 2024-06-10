import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: id },
  });

  if (restaurant) {
    console.log(restaurant);
    return NextResponse.json(restaurant);
  } else {
    return NextResponse.json(
      { message: "Restaurant not found" },
      { status: 404 }
    );
  }
}
