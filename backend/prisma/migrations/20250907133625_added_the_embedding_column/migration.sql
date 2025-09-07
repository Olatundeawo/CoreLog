/*
  Warnings:

  - Added the required column `embedding` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Attendance" ADD COLUMN     "synced" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "public"."Employee" ADD COLUMN     "embedding" JSONB NOT NULL;
