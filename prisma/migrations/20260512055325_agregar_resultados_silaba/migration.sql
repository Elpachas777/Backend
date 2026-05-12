/*
  Warnings:

  - You are about to alter the column `puntaje` on the `Respuesta` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `id_intento` to the `Respuesta` table without a default value. This is not possible if the table is not empty.
  - Added the required column `silaba` to the `Respuesta` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Respuesta` DROP FOREIGN KEY `Respuesta_id_alumno_fkey`;

-- DropForeignKey
ALTER TABLE `Respuesta` DROP FOREIGN KEY `Respuesta_id_ejercicio_fkey`;

-- AlterTable
ALTER TABLE `Respuesta` ADD COLUMN `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `id_intento` VARCHAR(191) NOT NULL,
    ADD COLUMN `silaba` VARCHAR(191) NOT NULL,
    MODIFY `trazo` VARCHAR(191) NULL,
    MODIFY `puntaje` DOUBLE NOT NULL;

-- CreateIndex
CREATE INDEX `Respuesta_id_intento_idx` ON `Respuesta`(`id_intento`);

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_id_alumno_fkey` FOREIGN KEY (`id_alumno`) REFERENCES `Alumno`(`id_alumno`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_id_ejercicio_fkey` FOREIGN KEY (`id_ejercicio`) REFERENCES `Ejercicio`(`id_ejercicio`) ON DELETE CASCADE ON UPDATE CASCADE;
