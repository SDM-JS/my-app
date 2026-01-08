/*
  Warnings:

  - You are about to drop the column `courseId` on the `Lessons` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `Lessons` table. All the data in the column will be lost.
  - You are about to drop the column `roomName` on the `Lessons` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `Lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Lessons` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Lessons" DROP CONSTRAINT "Lessons_courseId_fkey";

-- AlterTable
ALTER TABLE "Attendances" ADD COLUMN     "lessonsId" TEXT;

-- AlterTable
ALTER TABLE "Lessons" DROP COLUMN "courseId",
DROP COLUMN "dateTime",
DROP COLUMN "roomName",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "room" TEXT NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Attendances" ADD CONSTRAINT "Attendances_lessonsId_fkey" FOREIGN KEY ("lessonsId") REFERENCES "Lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
