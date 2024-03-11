/*
  Warnings:

  - Added the required column `imagenId` to the `Empleados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagenId` to the `Platillos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagenId` to the `Productos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `empleados` ADD COLUMN `imagenId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `platillos` ADD COLUMN `imagenId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `productos` ADD COLUMN `imagenId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Imagenes` (
    `imagenId` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`imagenId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Platillos` ADD CONSTRAINT `Platillos_imagenId_fkey` FOREIGN KEY (`imagenId`) REFERENCES `Imagenes`(`imagenId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Productos` ADD CONSTRAINT `Productos_imagenId_fkey` FOREIGN KEY (`imagenId`) REFERENCES `Imagenes`(`imagenId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleados` ADD CONSTRAINT `Empleados_imagenId_fkey` FOREIGN KEY (`imagenId`) REFERENCES `Imagenes`(`imagenId`) ON DELETE RESTRICT ON UPDATE CASCADE;
