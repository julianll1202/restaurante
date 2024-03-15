/*
  Warnings:

  - Added the required column `cantidad` to the `PlatillosEnComandas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cantidad` to the `ProductosEnPlatillos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `platillosencomandas` ADD COLUMN `cantidad` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `productosenplatillos` ADD COLUMN `cantidad` DOUBLE NOT NULL;
