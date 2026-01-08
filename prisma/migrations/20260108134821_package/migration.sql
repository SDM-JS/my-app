-- DropForeignKey
ALTER TABLE "Attendances" DROP CONSTRAINT "Attendances_lessonsId_fkey";

-- DropForeignKey
ALTER TABLE "Attendances" DROP CONSTRAINT "Attendances_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Attendances" DROP CONSTRAINT "Attendances_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Groups" DROP CONSTRAINT "Groups_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Lessons" DROP CONSTRAINT "Lessons_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Lessons" DROP CONSTRAINT "Lessons_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_cameText_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_groupId_fkey";

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_cameText_fkey" FOREIGN KEY ("cameText") REFERENCES "cameFrom"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lessons" ADD CONSTRAINT "Lessons_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_lessonsId_fkey" FOREIGN KEY ("lessonsId") REFERENCES "Lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
