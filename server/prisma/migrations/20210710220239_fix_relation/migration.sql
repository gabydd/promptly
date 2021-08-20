/*
  Warnings:

  - You are about to drop the column `dateId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `taskId` to the `Date` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_dateId_fkey";

-- AlterTable
ALTER TABLE "Date" ADD COLUMN     "taskId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "dateId";

-- AddForeignKey
ALTER TABLE "Date" ADD FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
