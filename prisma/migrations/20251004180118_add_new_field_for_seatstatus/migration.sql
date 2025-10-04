-- CreateEnum
CREATE TYPE "SeatStatus" AS ENUM ('AVAILABLE', 'BOOKED');

-- AlterTable
ALTER TABLE "Seat" ADD COLUMN     "status" "SeatStatus" NOT NULL DEFAULT 'AVAILABLE';
