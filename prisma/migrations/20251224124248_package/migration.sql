/*
  Warnings:

  - You are about to drop the column `daysOfWeek` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `from` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `to` on the `Groups` table. All the data in the column will be lost.
  - You are about to drop the column `cameFrom` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Groups" DROP COLUMN "daysOfWeek",
DROP COLUMN "from",
DROP COLUMN "to";

-- AlterTable
ALTER TABLE "Lessons" ADD COLUMN     "daysOfWeek" "DaysOfWeek"[];

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "cameFrom",
ADD COLUMN     "cameText" TEXT;

-- DropEnum
DROP TYPE "CameFrom";

-- CreateTable
CREATE TABLE "cameFrom" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "cameFrom_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cameFrom_name_key" ON "cameFrom"("name");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_cameText_fkey" FOREIGN KEY ("cameText") REFERENCES "cameFrom"("name") ON DELETE SET NULL ON UPDATE CASCADE;
