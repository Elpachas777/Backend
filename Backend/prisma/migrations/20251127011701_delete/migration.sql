-- DropForeignKey
ALTER TABLE `administrador` DROP FOREIGN KEY `Administrador_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `alumno` DROP FOREIGN KEY `Alumno_usuarioId_fkey`;

-- DropForeignKey
ALTER TABLE `docente` DROP FOREIGN KEY `Docente_usuarioId_fkey`;

-- AddForeignKey
ALTER TABLE `Administrador` ADD CONSTRAINT `Administrador_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Docente` ADD CONSTRAINT `Docente_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alumno` ADD CONSTRAINT `Alumno_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
