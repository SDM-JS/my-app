-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_cameText_fkey";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_cameText_fkey" FOREIGN KEY ("cameText") REFERENCES "cameFrom"("id") ON DELETE SET NULL ON UPDATE CASCADE;
