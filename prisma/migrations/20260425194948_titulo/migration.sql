/*
  Warnings:

  - You are about to drop the column `nombre` on the `Ejercicio` table. All the data in the column will be lost.
  - Added the required column `titulo` to the `Ejercicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ejercicio` DROP COLUMN `nombre`,
    ADD COLUMN `titulo` VARCHAR(191) NOT NULL;
