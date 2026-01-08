/*
  Warnings:

  - Added the required column `avatarUrl` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatarUrl` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "avatarUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "avatarUrl" TEXT NOT NULL;
