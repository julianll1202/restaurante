/*
  Warnings:

  - Made the column `updatedAt` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `updatedAt` DATETIME(3) NOT NULL;
