/*
  Warnings:

  - You are about to drop the column `username` on the `Investor` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Investor" DROP COLUMN "username";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "username";

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
