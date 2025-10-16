-- AddForeignKey
ALTER TABLE `DigitalBusinessCard` ADD CONSTRAINT `DigitalBusinessCard_uniqueCode_fkey` FOREIGN KEY (`uniqueCode`) REFERENCES `QRCode`(`uniqueCode`) ON DELETE CASCADE ON UPDATE CASCADE;
