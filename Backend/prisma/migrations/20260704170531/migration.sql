/*
  Warnings:

  - A unique constraint covering the columns `[ownerUserId]` on the table `Store` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Store_ownerUserId_idx";

-- AlterTable
ALTER TABLE "Store" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "totalSales" DOUBLE PRECISION NOT NULL DEFAULT 0.0;

-- CreateTable
CREATE TABLE "StoreTransaction" (
    "id" SERIAL NOT NULL,
    "storeId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StoreTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER,
    "point" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "StoreTransaction_storeId_idx" ON "StoreTransaction"("storeId");

-- CreateIndex
CREATE INDEX "StoreTransaction_createdAt_idx" ON "StoreTransaction"("createdAt");

-- CreateIndex
CREATE INDEX "Review_productId_idx" ON "Review"("productId");

-- CreateIndex
CREATE INDEX "Review_userId_idx" ON "Review"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Store_ownerUserId_key" ON "Store"("ownerUserId");

-- AddForeignKey
ALTER TABLE "StoreTransaction" ADD CONSTRAINT "StoreTransaction_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
