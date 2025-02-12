-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "originalTitle" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "genre" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_url_key" ON "movies"("url");
