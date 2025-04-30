CREATE TYPE "public"."split_mode" AS ENUM('quantity', 'equal', 'shares');--> statement-breakpoint
ALTER TABLE "assignments" ALTER COLUMN "quantity" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "items" ALTER COLUMN "unit_price" SET DATA TYPE numeric(10, 4);--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "shares" numeric(10, 4);--> statement-breakpoint
ALTER TABLE "items" ADD COLUMN "split_mode" "split_mode" NOT NULL;