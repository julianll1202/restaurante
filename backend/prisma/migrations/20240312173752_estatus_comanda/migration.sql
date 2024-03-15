/*
  Warnings:

  - You are about to alter the column `completada` on the `comandas` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `comandas` MODIFY `completada` ENUM('PENDIENTE', 'INICIADA', 'ENTREGADA', 'PAGADA', 'CANCELADA') NOT NULL DEFAULT 'PENDIENTE',
    MODIFY `fechaCreacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `fechaCierre` DATETIME(3) NULL;
