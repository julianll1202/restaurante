-- CreateTable
CREATE TABLE `Categorias` (
    `categoriaId` INTEGER NOT NULL AUTO_INCREMENT,
    `categoriaNombre` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NOT NULL,

    PRIMARY KEY (`categoriaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Platillos` (
    `platilloId` INTEGER NOT NULL AUTO_INCREMENT,
    `platilloNombre` VARCHAR(191) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `precio` DECIMAL(65, 30) NOT NULL,
    `categoriaId` INTEGER NOT NULL,

    PRIMARY KEY (`platilloId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Productos` (
    `productoId` INTEGER NOT NULL AUTO_INCREMENT,
    `productoNombre` VARCHAR(191) NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `cantidadMax` INTEGER NOT NULL,

    PRIMARY KEY (`productoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Compras` (
    `compraId` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaCompra` DATETIME(3) NOT NULL,
    `total` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`compraId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empleados` (
    `empleadoId` INTEGER NOT NULL AUTO_INCREMENT,
    `empleadoNombre` VARCHAR(191) NOT NULL,
    `paterno` VARCHAR(30) NOT NULL,
    `materno` VARCHAR(30) NOT NULL,
    `telefono` VARCHAR(10) NOT NULL,
    `puestoId` INTEGER NOT NULL,

    PRIMARY KEY (`empleadoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Puestos` (
    `puestoId` INTEGER NOT NULL AUTO_INCREMENT,
    `puestoNombre` VARCHAR(191) NOT NULL,
    `sueldo` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`puestoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Clientes` (
    `clienteId` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteNombre` VARCHAR(30) NOT NULL,
    `paterno` VARCHAR(30) NOT NULL,
    `materno` VARCHAR(30) NOT NULL,
    `telefono` VARCHAR(10) NULL,

    PRIMARY KEY (`clienteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mesas` (
    `mesaId` INTEGER NOT NULL AUTO_INCREMENT,
    `capacidad` INTEGER NOT NULL,
    `ubicacion` TEXT NOT NULL,
    `tipoMesa` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`mesaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comandas` (
    `comandaId` INTEGER NOT NULL AUTO_INCREMENT,
    `clienteId` INTEGER NOT NULL,
    `empleadoId` INTEGER NOT NULL,
    `mesaId` INTEGER NOT NULL,
    `completada` BOOLEAN NOT NULL,
    `precioFinal` DECIMAL(65, 30) NULL,
    `fechaCreacion` DATETIME(3) NOT NULL,
    `fechaCierre` DATETIME(3) NOT NULL,

    PRIMARY KEY (`comandaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlatillosEnComandas` (
    `platilloId` INTEGER NOT NULL,
    `comandaId` INTEGER NOT NULL,

    PRIMARY KEY (`platilloId`, `comandaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductosEnPlatillos` (
    `productoId` INTEGER NOT NULL,
    `platilloId` INTEGER NOT NULL,

    PRIMARY KEY (`productoId`, `platilloId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductosEnCompras` (
    `compraId` INTEGER NOT NULL,
    `productoId` INTEGER NOT NULL,

    PRIMARY KEY (`compraId`, `productoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Platillos` ADD CONSTRAINT `Platillos_categoriaId_fkey` FOREIGN KEY (`categoriaId`) REFERENCES `Categorias`(`categoriaId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Empleados` ADD CONSTRAINT `Empleados_puestoId_fkey` FOREIGN KEY (`puestoId`) REFERENCES `Puestos`(`puestoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comandas` ADD CONSTRAINT `Comandas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Clientes`(`clienteId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comandas` ADD CONSTRAINT `Comandas_empleadoId_fkey` FOREIGN KEY (`empleadoId`) REFERENCES `Empleados`(`empleadoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comandas` ADD CONSTRAINT `Comandas_mesaId_fkey` FOREIGN KEY (`mesaId`) REFERENCES `Mesas`(`mesaId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlatillosEnComandas` ADD CONSTRAINT `PlatillosEnComandas_platilloId_fkey` FOREIGN KEY (`platilloId`) REFERENCES `Platillos`(`platilloId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlatillosEnComandas` ADD CONSTRAINT `PlatillosEnComandas_comandaId_fkey` FOREIGN KEY (`comandaId`) REFERENCES `Comandas`(`comandaId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductosEnPlatillos` ADD CONSTRAINT `ProductosEnPlatillos_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Productos`(`productoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductosEnPlatillos` ADD CONSTRAINT `ProductosEnPlatillos_platilloId_fkey` FOREIGN KEY (`platilloId`) REFERENCES `Platillos`(`platilloId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductosEnCompras` ADD CONSTRAINT `ProductosEnCompras_compraId_fkey` FOREIGN KEY (`compraId`) REFERENCES `Compras`(`compraId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductosEnCompras` ADD CONSTRAINT `ProductosEnCompras_productoId_fkey` FOREIGN KEY (`productoId`) REFERENCES `Productos`(`productoId`) ON DELETE RESTRICT ON UPDATE CASCADE;
