/*
  Warnings:

  - You are about to drop the column `diameter` on the `TreeRecord` table. All the data in the column will be lost.
  - Added the required column `circumference` to the `TreeRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TreeRecord"
RENAME COLUMN "diameter" TO "circumference";
