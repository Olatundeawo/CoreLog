-- CreateTable
CREATE TABLE "public"."LicenseCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedBy" TEXT,

    CONSTRAINT "LicenseCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LicenseCode_code_key" ON "public"."LicenseCode"("code");
