/*
  Warnings:

  - Added the required column `escuela` to the `Docente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `docente` ADD COLUMN `escuela` VARCHAR(191) NOT NULL;
