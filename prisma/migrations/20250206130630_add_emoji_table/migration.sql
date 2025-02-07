/*
  Warnings:

  - Added the required column `emoji_repo` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emoji_rkey` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reaction" ADD COLUMN     "emoji_repo" TEXT NOT NULL,
ADD COLUMN     "emoji_rkey" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Emoji" (
    "id" TEXT NOT NULL,
    "record" TEXT NOT NULL,
    "rkey" TEXT NOT NULL,
    "repo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Emoji_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Emoji_rkey_repo_key" ON "Emoji"("rkey", "repo");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_emoji_rkey_emoji_repo_fkey" FOREIGN KEY ("emoji_rkey", "emoji_repo") REFERENCES "Emoji"("rkey", "repo") ON DELETE CASCADE ON UPDATE CASCADE;
