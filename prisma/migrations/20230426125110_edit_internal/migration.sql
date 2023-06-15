-- AlterTable
ALTER TABLE `User` MODIFY `userType` ENUM('revendeur', 'client', 'prospects', 'internal') NOT NULL DEFAULT 'client';
