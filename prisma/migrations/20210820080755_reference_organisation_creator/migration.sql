-- AlterTable
ALTER TABLE "Organisation" ADD COLUMN     "userId" TEXT NOT NULL DEFAULT E'd126efe1-d0c4-4f43-8514-c3dd6fb66a7e';

-- AddForeignKey
ALTER TABLE "Organisation" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
