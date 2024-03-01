/*
  Warnings:

  - A unique constraint covering the columns `[puestoNombre]` on the table `Puestos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Puestos_puestoNombre_key` ON `Puestos`(`puestoNombre`);
