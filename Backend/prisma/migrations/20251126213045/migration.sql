/*
  Warnings:

  - A unique constraint covering the columns `[correo]` on the table `Administrador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[correo]` on the table `Docente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Administrador_correo_key` ON `Administrador`(`correo`);

-- CreateIndex
CREATE UNIQUE INDEX `Docente_correo_key` ON `Docente`(`correo`);
