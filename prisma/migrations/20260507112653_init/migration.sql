-- CreateTable
CREATE TABLE "employee" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "email" TEXT NOT NULL,
    "salary" INTEGER NOT NULL DEFAULT 0,
    "role" VARCHAR(250) NOT NULL,
    "address" VARCHAR(250) NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "serialNo" VARCHAR(250) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "category" VARCHAR(250) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_email_key" ON "employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "product_serialNo_key" ON "product"("serialNo");
