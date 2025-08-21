-- CreateTable
CREATE TABLE `DownloadLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `qr_code_id` INTEGER NOT NULL,
    `downloaded_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProfileUpdateLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DownloadLog` ADD CONSTRAINT `DownloadLog_qr_code_id_fkey` FOREIGN KEY (`qr_code_id`) REFERENCES `QRCode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProfileUpdateLog` ADD CONSTRAINT `ProfileUpdateLog_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
