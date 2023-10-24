/*
  Warnings:

  - You are about to drop the column `description` on the `History` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `History` table. All the data in the column will be lost.
  - Added the required column `matchDate` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `myGools` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opponentGools` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opponentId` to the `History` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stauts` to the `History` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "History" DROP COLUMN "description",
DROP COLUMN "status",
ADD COLUMN     "matchDate" TEXT NOT NULL,
ADD COLUMN     "myGools" INTEGER NOT NULL,
ADD COLUMN     "opponentGools" INTEGER NOT NULL,
ADD COLUMN     "opponentId" INTEGER NOT NULL,
ADD COLUMN     "stauts" TEXT NOT NULL;
