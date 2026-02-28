CREATE TABLE "tenants" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"cpf" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tenants_email_unique" UNIQUE("email"),
	CONSTRAINT "tenants_cpf_unique" UNIQUE("cpf")
);
--> statement-breakpoint
ALTER TABLE "contracts" DROP CONSTRAINT "contracts_tenant_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "reference_month" integer;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "reference_year" integer;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "bedrooms" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "area" numeric(10, 2) DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone" text;--> statement-breakpoint
ALTER TABLE "contracts" ADD CONSTRAINT "contracts_tenant_id_tenants_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("id") ON DELETE cascade ON UPDATE no action;