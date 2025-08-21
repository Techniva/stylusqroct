/*
  Warnings:

  - You are about to drop the column `activeLink` on the `QRCode` table. All the data in the column will be lost.
  - You are about to drop the column `dataType` on the `QRCode` table. All the data in the column will be lost.
  - Added the required column `qrData` to the `QRCode` table without a default value. This is not possible if the table is not empty.

*/

-- First, add the new column as nullable
ALTER TABLE `QRCode` ADD COLUMN `qrData` JSON NULL;

-- Migrate existing data to JSON format
UPDATE `QRCode` SET `qrData` = JSON_OBJECT(
  'type', COALESCE(`dataType`, 'website'),
  'data', JSON_OBJECT(
    'url', COALESCE(`activeLink`, 'https://example.com')
  ),
  'metadata', JSON_OBJECT(
    'migrated', true,
    'originalDataType', COALESCE(`dataType`, 'website'),
    'originalActiveLink', COALESCE(`activeLink`, 'https://example.com')
  )
) WHERE `qrData` IS NULL;

-- Make the column NOT NULL after data migration
ALTER TABLE `QRCode` MODIFY COLUMN `qrData` JSON NOT NULL;

-- Drop the old columns
ALTER TABLE `QRCode` DROP COLUMN `activeLink`,
    DROP COLUMN `dataType`;
