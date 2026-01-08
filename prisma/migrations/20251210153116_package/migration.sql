/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_adminId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_teacherId_fkey";

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";
