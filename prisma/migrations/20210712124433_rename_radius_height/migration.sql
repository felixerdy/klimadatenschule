/*
  Warnings:

  - You are about to drop the column `radius` on the `TreeRecord` table. All the data in the column will be lost.
  - Added the required column `height` to the `TreeRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TreeRecord" DROP COLUMN "radius",
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL;
