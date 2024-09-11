/*
  Warnings:

  - You are about to drop the column `createdAt` on the `inventory_items` table. All the data in the column will be lost.
  - The `dateReceived` column on the `inventory_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `lastUpdated` column on the `inventory_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "inventory_items" DROP COLUMN "createdAt",
DROP COLUMN "dateReceived",
ADD COLUMN     "dateReceived" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "lastUpdated",
ADD COLUMN     "lastUpdated" TIMESTAMP(3);
