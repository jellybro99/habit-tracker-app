-- AlterTable
ALTER TABLE "users" ALTER COLUMN "password" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "habit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "habit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "habit" ADD CONSTRAINT "habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
