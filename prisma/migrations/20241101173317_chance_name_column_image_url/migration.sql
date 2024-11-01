/*
  Warnings:

  - You are about to drop the column `imagePath` on the `banner` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `banner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "banner" DROP COLUMN "imagePath",
ADD COLUMN     "imageUrl" TEXT NOT NULL;
