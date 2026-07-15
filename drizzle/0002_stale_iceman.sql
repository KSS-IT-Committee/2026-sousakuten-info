CREATE TABLE "borrowings" (
	"id" serial PRIMARY KEY NOT NULL,
	"equipment_id" integer NOT NULL,
	"class" integer NOT NULL,
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
ALTER TABLE "borrowings" ADD CONSTRAINT "borrowings_equipment_id_equipments_id_fk" FOREIGN KEY ("equipment_id") REFERENCES "public"."equipments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "equipment_idx" ON "borrowings" USING btree ("equipment_id");--> statement-breakpoint
CREATE INDEX "class_idx" ON "borrowings" USING btree ("class");