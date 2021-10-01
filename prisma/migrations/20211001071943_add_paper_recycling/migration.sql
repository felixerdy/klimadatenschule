-- DropForeignKey
ALTER TABLE "MealRecord" DROP CONSTRAINT "MealRecord_userId_fkey";

-- DropForeignKey
ALTER TABLE "MobilityRecord" DROP CONSTRAINT "MobilityRecord_userId_fkey";

-- DropForeignKey
ALTER TABLE "Organisation" DROP CONSTRAINT "Organisation_userId_fkey";

-- DropForeignKey
ALTER TABLE "PaperRecord" DROP CONSTRAINT "PaperRecord_userId_fkey";

-- DropForeignKey
ALTER TABLE "TreeRecord" DROP CONSTRAINT "TreeRecord_userId_fkey";

-- AlterTable
ALTER TABLE "PaperRecord" ADD COLUMN     "a4_recycling" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "a5_recycling" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "a6_recycling" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "collegeblock_recycling" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "zeichenmappe_recycling" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Organisation" ADD CONSTRAINT "Organisation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MobilityRecord" ADD CONSTRAINT "MobilityRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealRecord" ADD CONSTRAINT "MealRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreeRecord" ADD CONSTRAINT "TreeRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaperRecord" ADD CONSTRAINT "PaperRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "accounts.compound_id_unique" RENAME TO "accounts_compound_id_key";

-- RenameIndex
ALTER INDEX "sessions.access_token_unique" RENAME TO "sessions_access_token_key";

-- RenameIndex
ALTER INDEX "sessions.session_token_unique" RENAME TO "sessions_session_token_key";

-- RenameIndex
ALTER INDEX "users.email_unique" RENAME TO "users_email_key";
