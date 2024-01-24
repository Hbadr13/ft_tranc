/*
  Warnings:

  - The `timeMute` column on the `Membership` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Membership" DROP COLUMN "timeMute",
ADD COLUMN     "timeMute" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "description" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT;
