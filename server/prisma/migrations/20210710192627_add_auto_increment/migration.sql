-- AlterTable
CREATE SEQUENCE "date_id_seq";
ALTER TABLE "Date" ALTER COLUMN "id" SET DEFAULT nextval('date_id_seq');
ALTER SEQUENCE "date_id_seq" OWNED BY "Date"."id";

-- AlterTable
CREATE SEQUENCE "time_id_seq";
ALTER TABLE "Time" ALTER COLUMN "id" SET DEFAULT nextval('time_id_seq');
ALTER SEQUENCE "time_id_seq" OWNED BY "Time"."id";
