import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "cloudinary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const restaurantId = parseInt(params.id);
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
  });

  if (!restaurant || restaurant.adminId !== parseInt(session?.user?.id || "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const uploadResponse = await cloudinary.v2.uploader.upload_stream(
      { folder: `restaurant_${restaurantId}/menu_photos` },
      async (error, result) => {
        if (error || !result) {
          throw new Error("Failed to upload image");
        }
        const newPhoto = await prisma.menuPhoto.create({
          data: {
            url: result.secure_url,
            publicId: result.public_id,
            restaurantId: restaurantId,
          },
        });
        return NextResponse.json(newPhoto);
      }
    );

    const buffer = await file.arrayBuffer();
    const stream = require("stream");
    const bufferStream = new stream.PassThrough();
    bufferStream.end(Buffer.from(buffer));
    bufferStream.pipe(uploadResponse);
  } catch (error) {
    console.error("Error uploading photo:", error);
    return NextResponse.json(
      { error: "Failed to upload photo" },
      { status: 500 }
    );
  }
}
