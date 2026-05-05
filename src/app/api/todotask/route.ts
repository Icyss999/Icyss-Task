import { db } from "@/src/lib"
import { todoTable } from "@/src/lib/db/schema"

export async function GET(){

    try{
        const todos = await db.select().from(todoTable)
        
        return Response.json(todos)

    }
    catch(error){
        console.error(error)
    }
}

export async function POST(req:Request){

    try{
        const body = await req.json()
        const createTodo = await db.insert(todoTable).values({
            ...body
        })
        return Response.json({success:true, data:createTodo})
    }
    catch (error){

        return Response.json({error: "Cannot Create Task"})
    }
}



