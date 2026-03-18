/*
  Warnings:

  - You are about to drop the column `createdAt` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `publishedYear` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `subcategoryId` on the `books` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `books` table. All the data in the column will be lost.
  - You are about to alter the column `title` on the `books` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(191)`.
  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the `subcategories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `books` DROP FOREIGN KEY `books_subcategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `subcategories` DROP FOREIGN KEY `subcategories_categoryId_fkey`;

-- DropIndex
DROP INDEX `books_isbn_key` ON `books`;

-- DropIndex
DROP INDEX `books_subcategoryId_idx` ON `books`;

-- DropIndex
DROP INDEX `categories_name_key` ON `categories`;

-- AlterTable
ALTER TABLE `books` DROP COLUMN `createdAt`,
    DROP COLUMN `description`,
    DROP COLUMN `publishedYear`,
    DROP COLUMN `subcategoryId`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `year` INTEGER NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `author` VARCHAR(191) NOT NULL,
    MODIFY `isbn` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `categories` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `description` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `subcategories`;
