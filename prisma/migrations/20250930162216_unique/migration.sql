/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Score` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,difficulty]` on the table `Score` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Score" DROP COLUMN "createdAt";

-- CreateIndex
CREATE UNIQUE INDEX "Score_name_difficulty_key" ON "public"."Score"("name", "difficulty");
