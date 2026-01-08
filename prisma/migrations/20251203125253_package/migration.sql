/*
  Warnings:

  - You are about to drop the `_GroupsToTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GroupsToTeacher" DROP CONSTRAINT "_GroupsToTeacher_A_fkey";

-- DropForeignKey
ALTER TABLE "_GroupsToTeacher" DROP CONSTRAINT "_GroupsToTeacher_B_fkey";

-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "teacherId" TEXT;

-- DropTable
DROP TABLE "_GroupsToTeacher";

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
