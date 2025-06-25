/*
  Warnings:

  - Added the required column `admin_id` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "admin_id" INTEGER NOT NULL;
