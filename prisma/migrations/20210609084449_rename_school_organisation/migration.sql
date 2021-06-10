/*
  Warnings:

  - You are about to drop the column `schoolId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `School` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_schoolId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "schoolId",
ADD COLUMN     "organisationId" TEXT;

-- DropTable
DROP TABLE "School";

-- CreateTable
CREATE TABLE "Organisation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD FOREIGN KEY ("organisationId") REFERENCES "Organisation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
