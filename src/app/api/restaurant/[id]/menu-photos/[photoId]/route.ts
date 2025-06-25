import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import cloudinary from "cloudinary";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string; photoId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const restaurantId = parseInt(params.id);
  const photoId = parseInt(params.photoId);

  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
  });

  if (!restaurant || restaurant.adminId !== parseInt(session?.user?.id || "")) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const photo = await prisma.menuPhoto.findUnique({
    where: { id: photoId },
  });

  if (!photo || photo.restaurantId !== restaurantId) {
    return NextResponse.json({ error: "Photo not found" }, { status: 404 });
  }

  try {
    await cloudinary.v2.uploader.destroy(photo.publicId);
    await prisma.menuPhoto.delete({
      where: { id: photoId },
    });
    return NextResponse.json({ message: "Photo deleted successfully" });
  } catch (error) {
    console.error("Error deleting photo:", error);
    return NextResponse.json(
      { error: "Failed to delete photo" },
      { status: 500 }
    );
  }
}
