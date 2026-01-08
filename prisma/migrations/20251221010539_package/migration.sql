-- AlterTable
ALTER TABLE "Lessons" ADD COLUMN     "groupId" TEXT;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
