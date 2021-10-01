-- AlterTable
ALTER TABLE "MealRecord" ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterIndex
ALTER INDEX "accounts_compound_id_key" RENAME TO "accounts.compound_id_unique";

-- AlterIndex
ALTER INDEX "sessions_access_token_key" RENAME TO "sessions.access_token_unique";

-- AlterIndex
ALTER INDEX "sessions_session_token_key" RENAME TO "sessions.session_token_unique";

-- AlterIndex
ALTER INDEX "users_email_key" RENAME TO "users.email_unique";
