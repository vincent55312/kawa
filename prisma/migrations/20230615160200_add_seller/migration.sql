/*
  Warnings:

  - The values [revendeur] on the enum `User_userType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `userType` ENUM('seller', 'client', 'prospects', 'internal') NOT NULL DEFAULT 'client';
