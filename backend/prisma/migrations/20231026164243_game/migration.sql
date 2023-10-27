/*
  Warnings:

  - You are about to drop the column `stauts` on the `History` table. All the data in the column will be lost.
  - Added the required column `status` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "stauts",
ADD COLUMN     "status" TEXT NOT NULL;
