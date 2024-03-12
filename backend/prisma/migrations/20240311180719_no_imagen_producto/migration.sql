/*
  Warnings:

  - You are about to drop the column `imagenId` on the `productos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `productos` DROP FOREIGN KEY `Productos_imagenId_fkey`;

-- AlterTable
ALTER TABLE `productos` DROP COLUMN `imagenId`;
