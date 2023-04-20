/*
  Warnings:

  - Added the required column `ord_id` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "ord_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "whatsapp_number" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_ord_id_fkey" FOREIGN KEY ("ord_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
