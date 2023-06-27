/*
  Warnings:

  - You are about to drop the column `token` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[passphrase]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - The required column `passphrase` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `User_token_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `token`,
    ADD COLUMN `passphrase` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_passphrase_key` ON `User`(`passphrase`);
