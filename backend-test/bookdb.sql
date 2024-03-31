/*
 Navicat Premium Data Transfer

 Source Server         : postgre
 Source Server Type    : PostgreSQL
 Source Server Version : 150001 (150001)
 Source Host           : localhost:5432
 Source Catalog        : bookdb
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 150001 (150001)
 File Encoding         : 65001

 Date: 31/03/2024 10:45:34
*/


-- ----------------------------
-- Table structure for Books
-- ----------------------------
DROP TABLE IF EXISTS "public"."Books";
CREATE TABLE "public"."Books" (
  "code" text COLLATE "pg_catalog"."default" NOT NULL,
  "title" text COLLATE "pg_catalog"."default" NOT NULL,
  "author" text COLLATE "pg_catalog"."default" NOT NULL,
  "stock" int4 NOT NULL
)
;

-- ----------------------------
-- Records of Books
-- ----------------------------
INSERT INTO "public"."Books" VALUES ('JK-45', 'Harry Potter', 'J.K Rowling', 0);
INSERT INTO "public"."Books" VALUES ('TW-11', 'Twilight', 'Stephenie Meyer', 0);
INSERT INTO "public"."Books" VALUES ('HOB-83', 'The Hobbit, or There and Back Again', 'J.R.R. Tolkien', 1);
INSERT INTO "public"."Books" VALUES ('SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 0);
INSERT INTO "public"."Books" VALUES ('NRN-7', 'the Lion, the Witch and the Wardrobe', 'C.S. Lewis', 1);

-- ----------------------------
-- Table structure for Members
-- ----------------------------
DROP TABLE IF EXISTS "public"."Members";
CREATE TABLE "public"."Members" (
  "code" text COLLATE "pg_catalog"."default" NOT NULL,
  "name" text COLLATE "pg_catalog"."default" NOT NULL,
  "penalty" bool DEFAULT false,
  "penaltyDate" timestamp(3)
)
;

-- ----------------------------
-- Records of Members
-- ----------------------------
INSERT INTO "public"."Members" VALUES ('M003', 'Putri', 'f', NULL);
INSERT INTO "public"."Members" VALUES ('M001', 'Angga', 'f', NULL);
INSERT INTO "public"."Members" VALUES ('M004', 'Udin', 'f', NULL);
INSERT INTO "public"."Members" VALUES ('M002', 'Ferry', 't', '2024-04-08 14:33:32.371');

-- ----------------------------
-- Table structure for _prisma_migrations
-- ----------------------------
DROP TABLE IF EXISTS "public"."_prisma_migrations";
CREATE TABLE "public"."_prisma_migrations" (
  "id" varchar(36) COLLATE "pg_catalog"."default" NOT NULL,
  "checksum" varchar(64) COLLATE "pg_catalog"."default" NOT NULL,
  "finished_at" timestamptz(6),
  "migration_name" varchar(255) COLLATE "pg_catalog"."default" NOT NULL,
  "logs" text COLLATE "pg_catalog"."default",
  "rolled_back_at" timestamptz(6),
  "started_at" timestamptz(6) NOT NULL DEFAULT now(),
  "applied_steps_count" int4 NOT NULL DEFAULT 0
)
;

-- ----------------------------
-- Records of _prisma_migrations
-- ----------------------------
INSERT INTO "public"."_prisma_migrations" VALUES ('6d3c93b5-790d-42d1-93f7-18ec3586e12c', '88ee0f2eb7412bef4fdc8b0ca8abe752bbb7a724181f1dd40db4dae4d44dd66d', '2024-03-28 14:05:46.364994+07', '20240328070546_initdb', NULL, NULL, '2024-03-28 14:05:46.330731+07', 1);
INSERT INTO "public"."_prisma_migrations" VALUES ('04348a55-4247-44ff-afde-a35bed89b6e1', 'f19439f1f5c269d7585289bc7b04c83e8a68bf1c317b08d17f81b18dcaa1fde7', '2024-03-28 14:15:57.884639+07', '20240328071557_update_column_name', NULL, NULL, '2024-03-28 14:15:57.877949+07', 1);
INSERT INTO "public"."_prisma_migrations" VALUES ('90c1a0d4-0717-40a7-9b2f-3ba4ffa8f91e', 'da3295cff82ee174e0027a87743d58d9cc8d88c2c92f9b8db4165904cb4c68e0', '2024-03-29 13:42:03.001805+07', '20240329064202_add_field_penalty_date_members_table', NULL, NULL, '2024-03-29 13:42:02.996882+07', 1);

-- ----------------------------
-- Table structure for borrowedBook
-- ----------------------------
DROP TABLE IF EXISTS "public"."borrowedBook";
CREATE TABLE "public"."borrowedBook" (
  "code" text COLLATE "pg_catalog"."default" NOT NULL,
  "borrowedAt" timestamp(3) NOT NULL,
  "returnAt" timestamp(3),
  "maxReturnAt" timestamp(3) NOT NULL,
  "bookCode" text COLLATE "pg_catalog"."default" NOT NULL,
  "memberCode" text COLLATE "pg_catalog"."default" NOT NULL
)
;

-- ----------------------------
-- Records of borrowedBook
-- ----------------------------
INSERT INTO "public"."borrowedBook" VALUES ('48423fe6-caf4-481c-b8e7-38047f129c6e', '2024-03-29 09:29:18.153', '2024-03-29 13:23:01.048', '2024-04-05 09:29:18.153', 'JK-45', 'M001');
INSERT INTO "public"."borrowedBook" VALUES ('97cbaf1d-f64d-4ef1-ba5d-10eb6089af99', '2024-03-29 13:31:37.624', NULL, '2024-04-05 13:31:37.624', 'JK-45', 'M003');
INSERT INTO "public"."borrowedBook" VALUES ('588e763b-4528-4d97-a843-75e5249b36c8', '2024-03-29 13:53:54.479', NULL, '2024-04-05 13:53:54.479', 'TW-11', 'M001');
INSERT INTO "public"."borrowedBook" VALUES ('312c73f7-1fd6-4c82-bd5a-c9bd981a0c4d', '2024-03-29 14:54:25.361', '2024-03-29 14:56:22.812', '2024-04-05 14:54:25.361', 'HOB-83', 'M002');
INSERT INTO "public"."borrowedBook" VALUES ('a80d593a-c341-440b-b2bc-2c37edac619a', '2024-03-27 13:55:52', '2024-03-29 15:02:01.573', '2024-03-28 13:55:52', 'SHR-1', 'M001');
INSERT INTO "public"."borrowedBook" VALUES ('c4abf3bc-34ce-450d-96df-99304979edc7', '2024-03-29 15:09:10.906', '2024-03-29 15:09:27.548', '2024-04-05 15:09:10.906', 'SHR-1', 'M002');
INSERT INTO "public"."borrowedBook" VALUES ('dea5646f-6842-4bd5-8d93-c6de34a74f18', '2024-03-29 15:34:06.982', '2024-03-29 15:34:34.329', '2024-04-05 15:34:06.982', 'SHR-1', 'M002');
INSERT INTO "public"."borrowedBook" VALUES ('e50d64eb-effa-4073-b7a6-14fbb1d64d23', '2024-03-29 15:40:09.956', NULL, '2024-04-05 15:40:09.956', 'SHR-1', 'M001');
INSERT INTO "public"."borrowedBook" VALUES ('8c359292-8698-40cc-8de6-ec15ee9064d9', '2024-03-30 14:33:13.08', '2024-03-30 14:33:32.371', '2024-03-29 14:33:13', 'NRN-7', 'M002');
INSERT INTO "public"."borrowedBook" VALUES ('991bc8f5-d8f5-414a-b0f1-9616f13324ae', '2024-03-31 08:23:57.993', '2024-03-31 09:58:08.292', '2024-04-07 08:23:57.993', 'NRN-7', 'M004');

-- ----------------------------
-- Indexes structure for table Books
-- ----------------------------
CREATE UNIQUE INDEX "Books_code_key" ON "public"."Books" USING btree (
  "code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Indexes structure for table Members
-- ----------------------------
CREATE UNIQUE INDEX "Members_code_key" ON "public"."Members" USING btree (
  "code" COLLATE "pg_catalog"."default" "pg_catalog"."text_ops" ASC NULLS LAST
);

-- ----------------------------
-- Primary Key structure for table _prisma_migrations
-- ----------------------------
ALTER TABLE "public"."_prisma_migrations" ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table borrowedBook
-- ----------------------------
ALTER TABLE "public"."borrowedBook" ADD CONSTRAINT "borrowedBook_pkey" PRIMARY KEY ("code");

-- ----------------------------
-- Foreign Keys structure for table borrowedBook
-- ----------------------------
ALTER TABLE "public"."borrowedBook" ADD CONSTRAINT "borrowedBook_bookCode_fkey" FOREIGN KEY ("bookCode") REFERENCES "public"."Books" ("code") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."borrowedBook" ADD CONSTRAINT "borrowedBook_memberCode_fkey" FOREIGN KEY ("memberCode") REFERENCES "public"."Members" ("code") ON DELETE RESTRICT ON UPDATE CASCADE;
