/*
  Warnings:

  - Added the required column `timestamp` to the `Tale` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tale" ADD COLUMN     "chapters" TEXT NOT NULL DEFAULT '[]',
ADD COLUMN     "timestamp" TEXT NOT NULL,
ALTER COLUMN "coordinates" SET DEFAULT '[]',
ALTER COLUMN "distanceKm" SET DEFAULT 0,
ALTER COLUMN "elevationGain" SET DEFAULT 0,
ALTER COLUMN "kmEffort" SET DEFAULT 0;
