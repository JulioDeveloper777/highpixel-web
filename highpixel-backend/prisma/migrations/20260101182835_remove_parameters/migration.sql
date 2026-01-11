/*
  Warnings:

  - You are about to drop the column `rm` on the `updates` table. All the data in the column will be lost.
  - You are about to drop the column `sha1` on the `updates` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "updates" DROP COLUMN "rm",
DROP COLUMN "sha1";
