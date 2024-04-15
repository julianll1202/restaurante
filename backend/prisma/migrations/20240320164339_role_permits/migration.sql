-- CreateTable
CREATE TABLE `PermitsInRole` (
    `roleId` INTEGER NOT NULL,
    `permitId` INTEGER NOT NULL,

    PRIMARY KEY (`roleId`, `permitId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permits` (
    `permitId` INTEGER NOT NULL AUTO_INCREMENT,
    `action` ENUM('VER', 'EDITAR') NOT NULL,
    `area` ENUM('COMANDAS', 'EMPLEADOS', 'PRODUCTOS', 'COMPRAS', 'USUARIOS') NOT NULL,

    PRIMARY KEY (`permitId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PermitsInRole` ADD CONSTRAINT `PermitsInRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermitsInRole` ADD CONSTRAINT `PermitsInRole_permitId_fkey` FOREIGN KEY (`permitId`) REFERENCES `Permits`(`permitId`) ON DELETE RESTRICT ON UPDATE CASCADE;
