import { db } from "@/src/lib"
import { todoTable } from "@/src/lib/db/schema"

export async function GET(){

    try{
        const todos = await db.select().from(todoTable)
        
        return Response.json(todos, {status:200})

    }
    catch(error){
        console.error(error)
        return Response.json ({error: "Task cannot be fetched! "}, {status: 500})
    }
}

export async function POST(req:Request){

    try{
        const body = await req.json()
        const createTodo = await db.insert(todoTable).values({
            ...body
            ,completedBy: body.completedBy ? new Date(body.completedBy) : null,
        })
        .returning()
        return Response.json({success:true, data:createTodo}, {status:201})
    }
    catch (error){

        return Response.json({error: "Cannot Create Task"}, {status: 500})
    }
}



