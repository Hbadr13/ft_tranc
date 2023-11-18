/*
  Warnings:

  - You are about to drop the column `status` on the `FriendRequest` table. All the data in the column will be lost.
  - Added the required column `stattus` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FriendRequest" DROP COLUMN "status",
ADD COLUMN     "stattus" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;
