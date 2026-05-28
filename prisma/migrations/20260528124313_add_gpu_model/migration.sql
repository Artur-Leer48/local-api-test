-- CreateTable
CREATE TABLE "Gpu" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "memoryGb" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gpu_pkey" PRIMARY KEY ("id")
);
