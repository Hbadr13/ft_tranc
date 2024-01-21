/*
  Warnings:

  - You are about to alter the column `level` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "level" SET DATA TYPE DECIMAL(65,30);
