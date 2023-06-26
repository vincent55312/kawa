/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `token` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `photo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `token` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_token_key` ON `User`(`token`);
