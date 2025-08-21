-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `resetToken` VARCHAR(191) NULL,
    `resetTokenExpiry` DATETIME(3) NULL,
    `location` VARCHAR(191) NULL,
    `company` VARCHAR(191) NULL,
    `comp_position` VARCHAR(191) NULL,
    `usr_phone` VARCHAR(191) NULL,
    `feed_rating` INTEGER NULL,
    `feed_type` VARCHAR(191) NULL,
    `feed_msg` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QRCode` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activeLink` VARCHAR(191) NOT NULL,
    `lastLink` VARCHAR(191) NULL,
    `uniqueCode` VARCHAR(191) NOT NULL,
    `cornerShape` VARCHAR(191) NOT NULL DEFAULT 'square',
    `eyeShape` VARCHAR(191) NOT NULL DEFAULT 'square',
    `qrShape` VARCHAR(191) NOT NULL DEFAULT 'square',
    `foregroundColor` VARCHAR(191) NOT NULL DEFAULT '#000000',
    `backgroundColor` VARCHAR(191) NOT NULL DEFAULT '#FFFFFF',
    `dotColor` VARCHAR(191) NULL,
    `cornerColor` VARCHAR(191) NULL,
    `eyeColor` VARCHAR(191) NULL,
    `updateCount` INTEGER NOT NULL DEFAULT 0,
    `scanCount` INTEGER NOT NULL DEFAULT 0,
    `qrCodeImagePath` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `QRCode_uniqueCode_key`(`uniqueCode`),
    INDEX `QRCode_userId_fkey`(`userId`),
    INDEX `QRCode_uniqueCode_idx`(`uniqueCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `QRCode` ADD CONSTRAINT `QRCode_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
