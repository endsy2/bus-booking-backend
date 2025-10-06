/*
  Warnings:

  - You are about to drop the column `busId` on the `BusLayout` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."BusLayout" DROP CONSTRAINT "BusLayout_busId_fkey";

-- DropIndex
DROP INDEX "public"."BusLayout_busId_key";

-- AlterTable
ALTER TABLE "Bus" ADD COLUMN     "layoutId" INTEGER;

-- AlterTable
ALTER TABLE "BusLayout" DROP COLUMN "busId",
ADD COLUMN     "name" TEXT;

-- AddForeignKey
ALTER TABLE "Bus" ADD CONSTRAINT "Bus_layoutId_fkey" FOREIGN KEY ("layoutId") REFERENCES "BusLayout"("id") ON DELETE SET NULL ON UPDATE CASCADE;
