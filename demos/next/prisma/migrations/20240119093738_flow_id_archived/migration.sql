/*
  Warnings:

  - Added the required column `flowId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "app"."Conversation" ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "error" JSONB,
ADD COLUMN     "flowId" TEXT NOT NULL;
