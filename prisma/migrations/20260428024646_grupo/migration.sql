-- DropForeignKey
ALTER TABLE `Ejercicio` DROP FOREIGN KEY `Ejercicio_id_grupo_fkey`;

-- AlterTable
ALTER TABLE `Ejercicio` MODIFY `id_grupo` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Ejercicio` ADD CONSTRAINT `Ejercicio_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo`(`id_grupo`) ON DELETE SET NULL ON UPDATE CASCADE;
