/*
  Warnings:

  - You are about to drop the column `googleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_googleId_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "googleId",
DROP COLUMN "role",
ALTER COLUMN "createdAt" DROP DEFAULT;
