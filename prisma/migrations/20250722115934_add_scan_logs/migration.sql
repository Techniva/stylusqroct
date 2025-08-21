-- CreateTable
CREATE TABLE `ScanLog` (
    `scanqr_id` INTEGER NOT NULL AUTO_INCREMENT,
    `qr_code_id` INTEGER NOT NULL,
    `scanned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `ip_address` VARCHAR(45) NULL,
    `country` VARCHAR(100) NULL,
    `region` VARCHAR(100) NULL,
    `city` VARCHAR(100) NULL,
    `isp` VARCHAR(100) NULL,
    `latitude` DECIMAL(10, 7) NULL,
    `longitude` DECIMAL(10, 7) NULL,
    `gps_accuracy` INTEGER NULL,
    `device_type` VARCHAR(50) NULL,
    `os_name` VARCHAR(100) NULL,
    `os_version` VARCHAR(50) NULL,
    `browser_name` VARCHAR(100) NULL,
    `browser_version` VARCHAR(50) NULL,

    PRIMARY KEY (`scanqr_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ScanLog` ADD CONSTRAINT `ScanLog_qr_code_id_fkey` FOREIGN KEY (`qr_code_id`) REFERENCES `QRCode`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
