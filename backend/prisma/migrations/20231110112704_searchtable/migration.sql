-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Recent" INTEGER[];


ALTER TABLE "User" DROP COLUMN IF EXISTS "Recent";
