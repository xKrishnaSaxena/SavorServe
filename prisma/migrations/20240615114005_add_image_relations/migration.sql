/*
  Warnings:

  - You are about to drop the column `images` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `menuPhotos` on the `Restaurant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "images",
DROP COLUMN "menuPhotos";

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "restaurant_id" INTEGER NOT NULL,
    "menu_restaurant_id" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);
