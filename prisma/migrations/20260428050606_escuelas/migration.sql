/*
  Warnings:

  - You are about to drop the column `escuela` on the `Docente` table. All the data in the column will be lost.
  - Added the required column `id_escuela` to the `Docente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Docente` DROP COLUMN `escuela`,
    ADD COLUMN `id_escuela` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Escuela` (
    `id_escuela` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `ubicacion` VARCHAR(191) NULL,
    `director` VARCHAR(191) NULL,
    `contacto` VARCHAR(191) NULL,
    `contado_adicional` VARCHAR(191) NULL,

    PRIMARY KEY (`id_escuela`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Docente` ADD CONSTRAINT `Docente_id_escuela_fkey` FOREIGN KEY (`id_escuela`) REFERENCES `Escuela`(`id_escuela`) ON DELETE RESTRICT ON UPDATE CASCADE;
