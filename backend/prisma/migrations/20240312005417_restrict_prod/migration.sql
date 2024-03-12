-- DropForeignKey
ALTER TABLE `productosencompras` DROP FOREIGN KEY `ProductosEnCompras_compraId_fkey`;

-- DropForeignKey
ALTER TABLE `productosencompras` DROP FOREIGN KEY `ProductosEnCompras_productoId_fkey`;

-- AddForeignKey
ALTER TABLE `ProductosEnCompras` ADD CONSTRAINT `ProductosEnCompras_compraId_fkey` FOREIGN KEY (`compraId`) REFERENCES `Compras`(`compraId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductosEnCompras` ADD CONSTRAINT `ProductosEnCompras_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Productos`(`productoId`) ON DELETE CASCADE ON UPDATE CASCADE;
