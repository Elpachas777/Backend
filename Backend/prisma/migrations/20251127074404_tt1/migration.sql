-- DropForeignKey
ALTER TABLE `alumno` DROP FOREIGN KEY `Alumno_id_grupo_fkey`;

-- DropIndex
DROP INDEX `Alumno_id_grupo_fkey` ON `alumno`;

-- AlterTable
ALTER TABLE `alumno` MODIFY `id_grupo` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Alumno` ADD CONSTRAINT `Alumno_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo`(`id_grupo`) ON DELETE SET NULL ON UPDATE CASCADE;
