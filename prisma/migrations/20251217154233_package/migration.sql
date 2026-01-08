/*
  Warnings:

  - You are about to drop the column `studentName` on the `Payments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "studentName",
ADD COLUMN     "studentId" TEXT;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
