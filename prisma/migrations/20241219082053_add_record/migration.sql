-- CreateTable
CREATE TABLE "Reaction" (
    "id" TEXT NOT NULL,
    "record" TEXT NOT NULL,
    "authorDid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);
