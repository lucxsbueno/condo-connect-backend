/*
  Warnings:

  - You are about to drop the column `areaCommonId` on the `reservation` table. All the data in the column will be lost.
  - Added the required column `area_common_id` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_areaCommonId_fkey`;

-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `areaCommonId`,
    ADD COLUMN `area_common_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_area_common_id_fkey` FOREIGN KEY (`area_common_id`) REFERENCES `AreaCommon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
