CREATE TYPE "public"."class_name" AS ENUM('1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D', '5A', '5B', '5C', '5D', '6A', '6B', '6C', '6D');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('IT', 'Sousakuten', 'Taiikusai', 'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'ClassA', 'ClassB', 'ClassC', 'ClassD', 'Students', 'Teachers');--> statement-breakpoint
CREATE TABLE "borrowings" (
	"id" serial PRIMARY KEY NOT NULL,
	"equipment_id" integer NOT NULL,
	"class" "class_name" NOT NULL,
	"borrowed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"returned_at" timestamp with time zone,
	CONSTRAINT "returned_at_after_borrowed_at" CHECK ("borrowings"."returned_at" IS NULL OR "borrowings"."returned_at" >= "borrowings"."borrowed_at")
);
--> statement-breakpoint
CREATE TABLE "equipments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"quantity" integer NOT NULL,
	"picture" text,
	CONSTRAINT "quantity_positive" CHECK ("equipments"."quantity" > 0)
);
--> statement-breakpoint
CREATE TABLE "announcement_classes" (
	"id" serial PRIMARY KEY NOT NULL,
	"announcement_id" integer NOT NULL,
	"class_name" "class_name" NOT NULL,
	CONSTRAINT "announcement_classes_announcement_id_class_name_unique" UNIQUE("announcement_id","class_name")
);
--> statement-breakpoint
CREATE TABLE "announcements" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "deductions" (
	"id" serial PRIMARY KEY NOT NULL,
	"class_name" "class_name" NOT NULL,
	"content" text NOT NULL,
	"points" integer NOT NULL,
	"occurred_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"username" varchar(32) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_id_is_sha256_hex" CHECK ("sessions"."id" ~ '^[0-9a-f]{64}$')
);
--> statement-breakpoint
CREATE TABLE "users" (
	"username" varchar(32) PRIMARY KEY NOT NULL,
	"password_hash" varchar(60) NOT NULL,
	"has_logged_in" boolean DEFAULT false NOT NULL,
	"roles" "role"[] DEFAULT '{}' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "borrowings" ADD CONSTRAINT "borrowings_equipment_id_equipments_id_fk" FOREIGN KEY ("equipment_id") REFERENCES "public"."equipments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "announcement_classes" ADD CONSTRAINT "announcement_classes_announcement_id_announcements_id_fk" FOREIGN KEY ("announcement_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_username_users_username_fk" FOREIGN KEY ("username") REFERENCES "public"."users"("username") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "equipment_idx" ON "borrowings" USING btree ("equipment_id");--> statement-breakpoint
CREATE INDEX "class_idx" ON "borrowings" USING btree ("class");--> statement-breakpoint
CREATE INDEX "sessions_username_idx" ON "sessions" USING btree ("username");--> statement-breakpoint
CREATE INDEX "sessions_expires_at_idx" ON "sessions" USING btree ("expires_at");