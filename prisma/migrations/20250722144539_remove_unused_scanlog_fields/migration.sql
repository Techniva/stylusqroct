/*
  Warnings:

  - You are about to drop the column `browser_version` on the `ScanLog` table. All the data in the column will be lost.
  - You are about to drop the column `gps_accuracy` on the `ScanLog` table. All the data in the column will be lost.
  - You are about to drop the column `os_version` on the `ScanLog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ScanLog` DROP COLUMN `browser_version`,
    DROP COLUMN `gps_accuracy`,
    DROP COLUMN `os_version`;
