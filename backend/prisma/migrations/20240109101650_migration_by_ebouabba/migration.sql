/*
  Warnings:

  - The `timeMute` column on the `Membership` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "timeMute",
ADD COLUMN     "timeMute" INTEGER NOT NULL DEFAULT 0;
