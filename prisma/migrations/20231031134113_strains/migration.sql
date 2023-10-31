-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strain" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "links" JSONB,
    "categoryId" TEXT NOT NULL,
    "femaleParentId" TEXT,
    "maleParentId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Strain_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AdditionalParents" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_id_key" ON "Category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Strain_id_key" ON "Strain"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Strain_name_key" ON "Strain"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_AdditionalParents_AB_unique" ON "_AdditionalParents"("A", "B");

-- CreateIndex
CREATE INDEX "_AdditionalParents_B_index" ON "_AdditionalParents"("B");

-- AddForeignKey
ALTER TABLE "Strain" ADD CONSTRAINT "Strain_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strain" ADD CONSTRAINT "Strain_femaleParentId_fkey" FOREIGN KEY ("femaleParentId") REFERENCES "Strain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strain" ADD CONSTRAINT "Strain_maleParentId_fkey" FOREIGN KEY ("maleParentId") REFERENCES "Strain"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditionalParents" ADD CONSTRAINT "_AdditionalParents_A_fkey" FOREIGN KEY ("A") REFERENCES "Strain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdditionalParents" ADD CONSTRAINT "_AdditionalParents_B_fkey" FOREIGN KEY ("B") REFERENCES "Strain"("id") ON DELETE CASCADE ON UPDATE CASCADE;
