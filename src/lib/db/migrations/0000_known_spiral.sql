CREATE TYPE "public"."priority" AS ENUM('none', 'low', 'meduim', 'high');--> statement-breakpoint
CREATE TABLE "todos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(50) NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"completed_by" timestamp,
	"priority" "priority" DEFAULT 'none' NOT NULL
);
