/*
  Warnings:

  - You are about to drop the column `tipo` on the `Ejercicio` table. All the data in the column will be lost.
  - Added the required column `id_tipo` to the `Ejercicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ejercicio` DROP COLUMN `tipo`,
    ADD COLUMN `id_tipo` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `TipoEjercicio` (
    `id_tipo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TipoEjercicio_nombre_key`(`nombre`),
    PRIMARY KEY (`id_tipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ejercicio` ADD CONSTRAINT `Ejercicio_id_tipo_fkey` FOREIGN KEY (`id_tipo`) REFERENCES `TipoEjercicio`(`id_tipo`) ON DELETE RESTRICT ON UPDATE CASCADE;
