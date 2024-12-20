/*
  Warnings:

  - The primary key for the `Reaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Reaction` table. All the data in the column will be lost.
  - Added the required column `emoji` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_cid` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `post_uri` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rkey` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_pkey",
DROP COLUMN "id",
ADD COLUMN     "emoji" TEXT NOT NULL,
ADD COLUMN     "post_cid" TEXT NOT NULL,
ADD COLUMN     "post_uri" TEXT NOT NULL,
ADD COLUMN     "rkey" TEXT NOT NULL,
ADD CONSTRAINT "Reaction_pkey" PRIMARY KEY ("rkey");
