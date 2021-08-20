-- CreateTable
CREATE TABLE "_Connections" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Connections_AB_unique" ON "_Connections"("A", "B");

-- CreateIndex
CREATE INDEX "_Connections_B_index" ON "_Connections"("B");

-- AddForeignKey
ALTER TABLE "_Connections" ADD FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Connections" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
