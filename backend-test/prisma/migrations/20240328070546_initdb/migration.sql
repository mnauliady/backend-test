-- CreateTable
CREATE TABLE "Members" (
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "penalty" BOOLEAN DEFAULT false
);

-- CreateTable
CREATE TABLE "Books" (
    "code" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "Author" TEXT NOT NULL,
    "Stock" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "borrowedBook" (
    "code" TEXT NOT NULL,
    "borrowedAt" TIMESTAMP(3) NOT NULL,
    "returnAt" TIMESTAMP(3),
    "maxReturnAt" TIMESTAMP(3) NOT NULL,
    "bookCode" TEXT NOT NULL,
    "memberCode" TEXT NOT NULL,

    CONSTRAINT "borrowedBook_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "Members_code_key" ON "Members"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Books_code_key" ON "Books"("code");

-- AddForeignKey
ALTER TABLE "borrowedBook" ADD CONSTRAINT "borrowedBook_bookCode_fkey" FOREIGN KEY ("bookCode") REFERENCES "Books"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrowedBook" ADD CONSTRAINT "borrowedBook_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "Members"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
