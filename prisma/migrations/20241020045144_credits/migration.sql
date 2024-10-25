/*
  Warnings:

  - You are about to drop the column `summariesLeft` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "summariesLeft",
ADD COLUMN     "credits" INTEGER DEFAULT 3;
