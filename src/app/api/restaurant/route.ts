import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../lib/prisma";
import cloudinary from "../../../lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data);

    // First, create the restaurant record
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
      },
    });

    // Upload restaurant images to Cloudinary
    const restaurantImages = await Promise.all(
      data.images.map(async (image: string) => {
        const uploadedImage = await cloudinary.uploader.upload(image);
        return {
          url: uploadedImage.url,
          publicId: uploadedImage.public_id,
          restaurantId: newRestaurant.id,
        };
      })
    );

    // Upload menu photos to Cloudinary
    const menuPhotos = await Promise.all(
      data.menuPhotos.map(async (photo: string) => {
        const uploadedPhoto = await cloudinary.uploader.upload(photo);
        return {
          url: uploadedPhoto.url,
          publicId: uploadedPhoto.public_id,
          restaurantId: newRestaurant.id,
        };
      })
    );

    // Create restaurant images
    await prisma.restaurantImage.createMany({
      data: restaurantImages,
    });

    // Create menu photos
    await prisma.menuPhoto.createMany({
      data: menuPhotos,
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
