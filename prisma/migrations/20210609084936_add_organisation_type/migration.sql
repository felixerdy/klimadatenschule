-- CreateEnum
CREATE TYPE "OrganisationType" AS ENUM ('SCHOOL', 'ORGANISATION');

-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "type" "OrganisationType" NOT NULL DEFAULT E'SCHOOL';
