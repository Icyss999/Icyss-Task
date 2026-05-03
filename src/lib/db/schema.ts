import { boolean, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const priorityEnum = pgEnum("priority", ["low", "meduim", "high"]) 

export const todoTable = pgTable("todos", {
    id : uuid("id").defaultRandom().primaryKey(),
    title : varchar("title", {length:50}).notNull(),
    description : text("description").notNull(),
    createdAt : timestamp("created_at").defaultNow().notNull(),
    completed : boolean("completed").notNull().default(false),
    completedBy: timestamp("completed_by"),
    priority : priorityEnum("priority").default("low").notNull()
})