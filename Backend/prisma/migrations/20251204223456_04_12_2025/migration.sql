-- AlterTable
ALTER TABLE `administrador` ADD COLUMN `bloqueado` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `docente` ADD COLUMN `bloqueado` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `autorizado` BOOLEAN NOT NULL DEFAULT false;
