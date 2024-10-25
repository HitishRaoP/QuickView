/*
  Warnings:

  - You are about to drop the column `payment_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_method` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[session_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `payment_status` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session_id` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Payment_payment_id_key";

-- DropIndex
DROP INDEX "Payment_payment_method_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "payment_id",
DROP COLUMN "payment_method",
DROP COLUMN "status",
ADD COLUMN     "payment_status" TEXT NOT NULL,
ADD COLUMN     "session_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_session_id_key" ON "Payment"("session_id");
