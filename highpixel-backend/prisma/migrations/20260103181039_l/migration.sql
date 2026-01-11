-- CreateTable
CREATE TABLE "trending_channels" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subtitle" TEXT,
    "thumbnail" TEXT,
    "badge" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trending_channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeline_suggestions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT,
    "avatar" TEXT,
    "subtitle" TEXT,
    "badges" TEXT,
    "createdBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "timeline_suggestions_pkey" PRIMARY KEY ("id")
);
