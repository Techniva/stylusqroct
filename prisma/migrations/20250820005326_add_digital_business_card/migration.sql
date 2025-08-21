-- CreateTable
CREATE TABLE `DigitalBusinessCard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NULL,
    `company` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `about` VARCHAR(191) NULL,
    `pronoun` VARCHAR(191) NULL,
    `accreditations` VARCHAR(191) NULL,
    `theme` VARCHAR(191) NULL,
    `primaryColor` VARCHAR(191) NULL,
    `secondaryColor` VARCHAR(191) NULL,
    `fieldIcons` JSON NULL,
    `activeFields` JSON NULL,
    `fieldData` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `DigitalBusinessCard_userId_idx`(`userId`),
    INDEX `DigitalBusinessCard_createdAt_idx`(`createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DigitalBusinessCard` ADD CONSTRAINT `DigitalBusinessCard_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
