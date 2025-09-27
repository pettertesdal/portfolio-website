/*
  Warnings:

  - Added the required column `difficulty` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Score" ADD COLUMN     "difficulty" TEXT NOT NULL;
