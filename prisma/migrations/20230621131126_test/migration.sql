-- AlterTable
ALTER TABLE `User` MODIFY `userType` ENUM('seller', 'client', 'prospects', 'internal', 'test') NOT NULL DEFAULT 'client';
