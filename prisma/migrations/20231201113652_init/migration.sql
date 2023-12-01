-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleDescription_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleDescription_fkey" FOREIGN KEY ("roleDescription") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
