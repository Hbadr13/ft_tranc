/*
  Warnings:

  - You are about to drop the column `stattus` on the `FriendRequest` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `FriendRequest` table. All the data in the column will be lost.
  - Added the required column `status` to the `FriendRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FriendRequest" DROP COLUMN "stattus",
DROP COLUMN "text",
ADD COLUMN     "status" TEXT NOT NULL;
