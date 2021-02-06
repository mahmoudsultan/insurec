-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('UNEMPLOYED', 'STUDENT', 'SELF_EMPLOYED', 'EMPLOYED');

-- CreateEnum
CREATE TYPE "Trait" AS ENUM ('EMPLOYED', 'STUDENT', 'SELF_EMPLOYED', 'UNEMPLOYED', 'HAS_CHILDREN', 'HAS_NO_CHILDERN');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ques" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "children" INTEGER,
    "occupation" "Occupation" NOT NULL DEFAULT E'UNEMPLOYED',
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListingRecommendation" (
    "id" SERIAL NOT NULL,
    "traits" "Trait"[],
    "listingId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Ques" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingRecommendation" ADD FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
