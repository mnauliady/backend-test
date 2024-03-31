/*
  Warnings:

  - You are about to drop the column `Author` on the `Books` table. All the data in the column will be lost.
  - You are about to drop the column `Stock` on the `Books` table. All the data in the column will be lost.
  - Added the required column `author` to the `Books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `Books` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Books" DROP COLUMN "Author",
DROP COLUMN "Stock",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "stock" INTEGER NOT NULL;
