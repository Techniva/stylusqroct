/*
  Warnings:

  - A unique constraint covering the columns `[uniqueCode]` on the table `DigitalBusinessCard` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `DigitalBusinessCard` ADD COLUMN `template` VARCHAR(191) NOT NULL DEFAULT 'classic',
    ADD COLUMN `uniqueCode` VARCHAR(191) NOT NULL DEFAULT 'TEMP_CODE';

-- CreateIndex
CREATE UNIQUE INDEX `DigitalBusinessCard_uniqueCode_key` ON `DigitalBusinessCard`(`uniqueCode`);
