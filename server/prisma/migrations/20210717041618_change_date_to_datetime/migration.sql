/*
  Warnings:

  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Date` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Date" DROP CONSTRAINT "Date_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Date" DROP CONSTRAINT "Date_taskId_fkey";

-- DropIndex
DROP INDEX "User.token_unique";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "token";

-- DropTable
DROP TABLE "Date";
