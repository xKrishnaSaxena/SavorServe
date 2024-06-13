import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newRestaurant = await prisma.restaurant.create({
      data: {
        name: data.name,
        rating: data.rating,
        diningRatings: data.diningRatings,
        deliveryRating: data.deliveryRating,
        deliveryReviews: data.deliveryReviews,
        cuisines: data.cuisines
          .split(",")
          .map((cuisine: string) => cuisine.trim()),
        location: data.location,
        status: data.status,
        timing: data.timing,
        safetyMeasures: data.safetyMeasures
          .split(",")
          .map((measure: string) => measure.trim()),

        knownFor: data.knownFor.split(",").map((item: string) => item.trim()),
        averageCost: data.averageCost,
        paymentMethods: data.paymentMethods
          .split(",")
          .map((method: string) => method.trim()),
        moreInfo: data.moreInfo.split(",").map((info: string) => info.trim()),
        images: data.images,
        menuPhotos: data.menuPhotos,
      },
    });
    return NextResponse.json({ newRestaurant });
  } catch (error) {
    console.error("Error creating restaurant:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
