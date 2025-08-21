-- AlterTable
ALTER TABLE `User` ADD COLUMN `emailNotificationsEnabled` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `pushNotificationsEnabled` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `smsNotificationsEnabled` BOOLEAN NOT NULL DEFAULT false;
