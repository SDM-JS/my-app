/*
  Warnings:

  - You are about to drop the column `status` on the `Lessons` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Groups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lessons` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Lessons" DROP COLUMN "status",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropEnum
DROP TYPE "Status";
