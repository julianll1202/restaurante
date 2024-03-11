/*
  Warnings:

  - Added the required column `cantidad` to the `ProductosEnCompras` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precioTotal` to the `ProductosEnCompras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `productosencompras` ADD COLUMN `cantidad` DOUBLE NOT NULL,
    ADD COLUMN `precioTotal` DOUBLE NOT NULL;
