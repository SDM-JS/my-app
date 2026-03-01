/*
  Warnings:

  - You are about to drop the column `action` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `entity` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `entityId` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `meta` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `timestamp` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `userAgent` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `logs` table. All the data in the column will be lost.
  - You are about to drop the column `userRole` on the `logs` table. All the data in the column will be lost.
  - Added the required column `type` to the `logs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `logs` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "logs_action_idx";

-- DropIndex
DROP INDEX "logs_entity_idx";

-- DropIndex
DROP INDEX "logs_level_idx";

-- DropIndex
DROP INDEX "logs_timestamp_idx";

-- DropIndex
DROP INDEX "logs_userId_idx";

-- AlterTable
ALTER TABLE "logs" DROP COLUMN "action",
DROP COLUMN "entity",
DROP COLUMN "entityId",
DROP COLUMN "ip",
DROP COLUMN "level",
DROP COLUMN "meta",
DROP COLUMN "timestamp",
DROP COLUMN "userAgent",
DROP COLUMN "userId",
DROP COLUMN "userRole",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "logs_type_idx" ON "logs"("type");

-- CreateIndex
CREATE INDEX "logs_createdAt_idx" ON "logs"("createdAt");
