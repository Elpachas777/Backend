/*
  Warnings:

  - A unique constraint covering the columns `[id_ingreso]` on the table `Alumno` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_docente` to the `Alumno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `administrador` ADD COLUMN `foto` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `alumno` ADD COLUMN `id_docente` INTEGER NOT NULL,
    ADD COLUMN `id_ingreso` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `docente` ADD COLUMN `foto` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Alumno_id_ingreso_key` ON `Alumno`(`id_ingreso`);

-- CreateIndex
CREATE INDEX `Alumno_id_docente_fkey` ON `Alumno`(`id_docente`);

-- AddForeignKey
ALTER TABLE `Alumno` ADD CONSTRAINT `Alumno_id_docente_fkey` FOREIGN KEY (`id_docente`) REFERENCES `Docente`(`id_docente`) ON DELETE RESTRICT ON UPDATE CASCADE;
