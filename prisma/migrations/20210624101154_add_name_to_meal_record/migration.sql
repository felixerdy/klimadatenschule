/*
  Warnings:

  - Added the required column `name` to the `MealRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MealRecord" ADD COLUMN     "name" TEXT NOT NULL;
