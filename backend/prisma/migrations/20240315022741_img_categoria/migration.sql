-- AlterTable
ALTER TABLE `categorias` ADD COLUMN `imagenId` INTEGER NOT NULL DEFAULT 1;

-- AddForeignKey
ALTER TABLE `Categorias` ADD CONSTRAINT `Categorias_imagenId_fkey` FOREIGN KEY (`imagenId`) REFERENCES `Imagenes`(`imagenId`) ON DELETE RESTRICT ON UPDATE CASCADE;
