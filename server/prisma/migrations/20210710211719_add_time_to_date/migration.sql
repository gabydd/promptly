/*
  Warnings:

  - You are about to drop the column `timeId` on the `Date` table. All the data in the column will be lost.
  - You are about to drop the `Time` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hour` to the `Date` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minute` to the `Date` table without a default value. This is not possible if the table is not empty.
  - Added the required column `second` to the `Date` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Date" DROP CONSTRAINT "Date_timeId_fkey";

-- AlterTable
ALTER TABLE "Date" DROP COLUMN "timeId",
ADD COLUMN     "hour" INTEGER NOT NULL,
ADD COLUMN     "minute" INTEGER NOT NULL,
ADD COLUMN     "second" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Time";
