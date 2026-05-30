import z from "zod";

export const taskSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    completedBy : z.date().optional().nullable(),
    priority : z.enum(["none","low","medium","high"]).optional()
})

export type Task = z.infer<typeof taskSchema>