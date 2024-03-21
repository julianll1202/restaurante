/*
  Warnings:

  - You are about to alter the column `cantidad` on the `platillosencomandas` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `cantidad` on the `productos` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - You are about to alter the column `cantidadMax` on the `productos` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `platillosencomandas` MODIFY `cantidad` INTEGER UNSIGNED NOT NULL;

-- AlterTable
ALTER TABLE `productos` MODIFY `cantidad` INTEGER UNSIGNED NOT NULL,
    MODIFY `cantidadMax` INTEGER UNSIGNED NOT NULL;
