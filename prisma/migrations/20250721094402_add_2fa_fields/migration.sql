-- AlterTable
ALTER TABLE `User` ADD COLUMN `twoFactorEnabled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `twoFactorRecoveryCodes` VARCHAR(191) NULL,
    ADD COLUMN `twoFactorSecret` VARCHAR(191) NULL;
