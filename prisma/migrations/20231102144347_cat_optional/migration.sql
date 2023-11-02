-- DropForeignKey
ALTER TABLE "Strain" DROP CONSTRAINT "Strain_categoryId_fkey";

-- AlterTable
ALTER TABLE "Strain" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Strain" ADD CONSTRAINT "Strain_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
