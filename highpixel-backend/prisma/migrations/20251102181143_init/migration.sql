/*
  Warnings:

  - You are about to drop the column `cover` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `changelogs` on the `updates` table. All the data in the column will be lost.
  - You are about to drop the `game_vehicles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `player_vehicles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `players` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `directory` to the `updates` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sha1` to the `updates` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Roles" ADD VALUE 'SUPPORT';
ALTER TYPE "Roles" ADD VALUE 'MODERATOR';

-- DropForeignKey
ALTER TABLE "public"."player_vehicles" DROP CONSTRAINT "player_vehicles_playerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."player_vehicles" DROP CONSTRAINT "player_vehicles_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "public"."players" DROP CONSTRAINT "players_nickname_fkey";

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "cover",
DROP COLUMN "link",
ADD COLUMN     "banner" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "region_city" TEXT,
ADD COLUMN     "region_country" TEXT,
ADD COLUMN     "region_uf" TEXT,
ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "updates" DROP COLUMN "changelogs",
ADD COLUMN     "directory" TEXT NOT NULL,
ADD COLUMN     "rm" TEXT[],
ADD COLUMN     "sha1" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "auth_system" TEXT NOT NULL DEFAULT 'NORMAL',
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "isEarlySupporter" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" TEXT,
ADD COLUMN     "timeout" INTEGER;

-- DropTable
DROP TABLE "public"."game_vehicles";

-- DropTable
DROP TABLE "public"."player_vehicles";

-- DropTable
DROP TABLE "public"."players";

-- CreateTable
CREATE TABLE "medal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "afinity" TEXT NOT NULL,
    "userid" TEXT NOT NULL,

    CONSTRAINT "medal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "visitors" (
    "id" TEXT NOT NULL,
    "visitors_id" TEXT NOT NULL,
    "visitor_id" TEXT NOT NULL,
    "at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whitelists" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "staff_id" TEXT,
    "user_id" TEXT NOT NULL,
    "createdAt" INTEGER,
    "updateAt" INTEGER,
    "timeout" INTEGER,
    "count" SERIAL NOT NULL,

    CONSTRAINT "whitelists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staffs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "access_level" TEXT NOT NULL DEFAULT 'minimum',
    "updated_at" TEXT NOT NULL,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "times" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "Date" TEXT NOT NULL,
    "scheduled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "times_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "whitelist_id" TEXT NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "id" TEXT NOT NULL,
    "staff_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "date" INTEGER NOT NULL,
    "status" TEXT,
    "channelId" TEXT,
    "name" TEXT NOT NULL,
    "observation" TEXT,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connections" (
    "id" TEXT NOT NULL,
    "plataform" TEXT NOT NULL,
    "fallback" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "whitelists_user_id_key" ON "whitelists"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "staffs_user_id_key" ON "staffs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Appointments_user_id_key" ON "Appointments"("user_id");

-- AddForeignKey
ALTER TABLE "medal" ADD CONSTRAINT "medal_userid_fkey" FOREIGN KEY ("userid") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_visitors_id_fkey" FOREIGN KEY ("visitors_id") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visitors" ADD CONSTRAINT "visitors_visitor_id_fkey" FOREIGN KEY ("visitor_id") REFERENCES "profiles"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whitelists" ADD CONSTRAINT "whitelists_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "times" ADD CONSTRAINT "times_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exams" ADD CONSTRAINT "exams_whitelist_id_fkey" FOREIGN KEY ("whitelist_id") REFERENCES "whitelists"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_staff_id_fkey" FOREIGN KEY ("staff_id") REFERENCES "staffs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
