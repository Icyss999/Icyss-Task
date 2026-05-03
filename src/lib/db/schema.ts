import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const todoTable = pgTable("todos", {
    id : uuid("id").defaultRandom().primaryKey(),
    title : varchar("title", {length:50}).notNull(),
    description : text("description").notNull(),
    createdAt : timestamp("createdAt").defaultNow().notNull(),
    completed : boolean("completed").notNull().default(false),
})