/*
  Warnings:

  - Added the required column `contenido` to the `Ejercicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ejercicio` ADD COLUMN `contenido` JSON NOT NULL;
