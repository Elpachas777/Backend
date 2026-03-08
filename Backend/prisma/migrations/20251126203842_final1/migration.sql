-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `nombres` VARCHAR(191) NOT NULL,
    `apellido` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administrador` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `correo` VARCHAR(191) NOT NULL,
    `contraseña` VARCHAR(191) NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    UNIQUE INDEX `Administrador_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Docente` (
    `id_docente` INTEGER NOT NULL AUTO_INCREMENT,
    `correo` VARCHAR(191) NOT NULL,
    `contraseña` VARCHAR(191) NOT NULL,
    `autorizado` BOOLEAN NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    UNIQUE INDEX `Docente_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id_docente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alumno` (
    `id_alumno` INTEGER NOT NULL AUTO_INCREMENT,
    `id_grupo` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,

    UNIQUE INDEX `Alumno_usuarioId_key`(`usuarioId`),
    PRIMARY KEY (`id_alumno`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Grupo` (
    `id_grupo` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_grupo` VARCHAR(191) NOT NULL,
    `id_docente` INTEGER NOT NULL,
    `turno` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_grupo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ejercicio` (
    `id_ejercicio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha_inicio` DATETIME(3) NOT NULL,
    `fecha_final` DATETIME(3) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `id_grupo` INTEGER NOT NULL,
    `id_docente` INTEGER NOT NULL,

    PRIMARY KEY (`id_ejercicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Respuesta` (
    `id_respuesta` INTEGER NOT NULL AUTO_INCREMENT,
    `trazo` VARCHAR(191) NOT NULL,
    `puntaje` INTEGER NOT NULL,
    `id_alumno` INTEGER NOT NULL,
    `id_ejercicio` INTEGER NOT NULL,

    PRIMARY KEY (`id_respuesta`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Administrador` ADD CONSTRAINT `Administrador_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Docente` ADD CONSTRAINT `Docente_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alumno` ADD CONSTRAINT `Alumno_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Alumno` ADD CONSTRAINT `Alumno_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo`(`id_grupo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grupo` ADD CONSTRAINT `Grupo_id_docente_fkey` FOREIGN KEY (`id_docente`) REFERENCES `Docente`(`id_docente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ejercicio` ADD CONSTRAINT `Ejercicio_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `Grupo`(`id_grupo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ejercicio` ADD CONSTRAINT `Ejercicio_id_docente_fkey` FOREIGN KEY (`id_docente`) REFERENCES `Docente`(`id_docente`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_id_alumno_fkey` FOREIGN KEY (`id_alumno`) REFERENCES `Alumno`(`id_alumno`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Respuesta` ADD CONSTRAINT `Respuesta_id_ejercicio_fkey` FOREIGN KEY (`id_ejercicio`) REFERENCES `Ejercicio`(`id_ejercicio`) ON DELETE RESTRICT ON UPDATE CASCADE;
