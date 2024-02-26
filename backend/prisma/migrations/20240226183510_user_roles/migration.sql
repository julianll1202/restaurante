/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Users` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `roleId` INTEGER NOT NULL AUTO_INCREMENT,
    `roleName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Users` ADD CONSTRAINT `Users_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Roles`(`roleId`) ON DELETE RESTRICT ON UPDATE CASCADE;
