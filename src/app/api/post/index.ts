import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export default async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
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
      images: data.images.split(",").map((image: string) => image.trim()),
      menuPhotos: data.menuPhotos
        .split(",")
        .map((photo: string) => photo.trim()),
    },
  });

  return NextResponse.json(newRestaurant, { status: 201 });
}
