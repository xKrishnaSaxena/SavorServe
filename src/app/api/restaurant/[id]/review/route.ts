import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const newReview = await prisma.review.create({
      data: {
        userId: data.userId,
        username: data.username,
        userReviews: data.userReviews,
        userFollowers: data.userFollowers,
        rating: parseInt(data.rating, 10),
        type: data.type,
        time: data.time,
        content: data.content,
        restaurantId: data.restaurantId,
      },
    });
    return NextResponse.json({ newReview });
  } catch (error) {
    console.log(error);
  }
}
