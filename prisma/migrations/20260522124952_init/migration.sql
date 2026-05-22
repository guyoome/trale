-- CreateTable
CREATE TABLE "Tale" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "coordinates" TEXT NOT NULL,
    "distanceKm" INTEGER NOT NULL,
    "elevationGain" INTEGER NOT NULL,
    "kmEffort" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tale_pkey" PRIMARY KEY ("id")
);
