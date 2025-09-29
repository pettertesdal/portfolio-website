-- CreateTable
CREATE TABLE "public"."Run" (
    "id" TEXT NOT NULL,
    "seed" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "mistakes" INTEGER NOT NULL DEFAULT 0,
    "index" INTEGER NOT NULL DEFAULT 0,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Run_pkey" PRIMARY KEY ("id")
);
