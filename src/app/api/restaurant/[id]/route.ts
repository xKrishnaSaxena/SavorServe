import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  let { id } = params;
  id = id * 1;
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: id },
    include: {
      menu: {
        include: {
          dishes: true,
        },
      },
      reviews: true,
      images: true,
      menuPhotos: true,
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
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const restaurantId = parseInt(params.id);
  const data = await req.json();

  try {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: restaurantId },
    });

    if (!restaurant) {
      return NextResponse.json(
        { error: "Restaurant not found" },
        { status: 404 }
      );
    }

    if (restaurant.adminId !== parseInt(session?.user?.id || "")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const updateData = {
      name: data.name,
      rating: data.rating,
      diningRatings: data.diningRatings,
      deliveryRating: data.deliveryRating,
      deliveryReviews: data.deliveryReviews,
      cuisines: data.cuisines,
      location: data.location,
      status: data.status,
      timing: data.timing,
      safetyMeasures: data.safetyMeasures,
      knownFor: data.knownFor,
      averageCost: data.averageCost,
      paymentMethods: data.paymentMethods,
      moreInfo: data.moreInfo,
    };

    const updatedRestaurant = await prisma.restaurant.update({
      where: { id: restaurantId },
      data: updateData,
    });

    return NextResponse.json({ updatedRestaurant });
  } catch (error) {
    console.error("Error updating restaurant:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
