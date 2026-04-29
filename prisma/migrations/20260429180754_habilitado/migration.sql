/*
  Warnings:

  - You are about to drop the column `bloqueado` on the `Administrador` table. All the data in the column will be lost.
  - You are about to drop the column `autorizado` on the `Docente` table. All the data in the column will be lost.
  - You are about to drop the column `bloqueado` on the `Docente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Administrador` DROP COLUMN `bloqueado`,
    ADD COLUMN `habilitado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Docente` DROP COLUMN `autorizado`,
    DROP COLUMN `bloqueado`,
    ADD COLUMN `habilitado` BOOLEAN NOT NULL DEFAULT false;
