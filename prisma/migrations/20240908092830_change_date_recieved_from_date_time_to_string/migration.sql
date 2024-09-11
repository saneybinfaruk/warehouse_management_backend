/*
  Warnings:

  - The primary key for the `inventory_items` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `inventory_items` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "inventory_items" DROP CONSTRAINT "inventory_items_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "dateReceived" SET DATA TYPE TEXT,
ALTER COLUMN "expirationDate" SET DATA TYPE TEXT,
ALTER COLUMN "lastUpdated" SET DATA TYPE TEXT,
ADD CONSTRAINT "inventory_items_pkey" PRIMARY KEY ("id");
