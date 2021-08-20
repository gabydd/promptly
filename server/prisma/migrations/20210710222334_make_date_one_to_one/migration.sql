/*
  Warnings:

  - A unique constraint covering the columns `[taskId]` on the table `Date` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Date_taskId_unique" ON "Date"("taskId");
