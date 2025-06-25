import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { menuId: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const menuId = params.menuId;

  try {
    const menu = await prisma.menu.findUnique({
      where: { id: parseInt(menuId) },
      include: {
        restaurant: true,
      },
    });

    if (!menu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    if (menu.restaurant.adminId !== parseInt(session.user.id)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.menu.delete({
      where: { id: parseInt(menuId) },
    });

    return NextResponse.json({ message: "Menu category deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu:", error);
    return NextResponse.json(
      { error: "Failed to delete menu" },
      { status: 500 }
    );
  }
}
