import { db } from "@/src/lib";
import { todoTable } from "@/src/lib/db/schema";
import { eq } from "drizzle-orm";



export async function DELETE (req:Request, {params}: {params:Promise<{id:string}>}){
    try{
        const {id} = await params
        const deleteTodo = await db.delete(todoTable)
        .where(eq(todoTable.id,id))
        .returning()
        
        if(deleteTodo.length == 0){
            return Response.json({error: "Room is not found!"}, {status:404})

        }

        return Response.json ({message: "You have successfully deleted the room!"}, {status:200})

    }catch (error){

        return Response.json ({error: 'Room Cannot be Deleted!'},{status:500})
    }

}


export async function PATCH (req:Request, {params}:{params:Promise<{id:string}>}){
    try{
        const {id} = await params
        const body = await req.json()
        const patchTodo = await db.update(todoTable)
        .set({
            ...body
        })
        .where(eq(todoTable.id,id))
        .returning()
        
        if (patchTodo.length == 0){

            return Response.json({error:"Room cannot be updated!"}, {status:404})
        }

        return Response.json({message: "Your Task has sucessfully updated"}, { status:200})


    }catch(error){

        return Response.json({error:"Task cannot be updated"},{status:500})
    }
}


export async function GET (req:Request, {params}:{params:Promise<{id:string}>}){

    try{
        const {id} = await params
        const getTask = await db
        .select()
        .from(todoTable)
        .where(eq(todoTable.id,id))

        if (getTask.length == 0){

            return Response.json({error: "Task is not found !"}, {status : 404})
        }

        return Response.json(getTask, {status: 200})


    }catch(error){

        return Response.json({error: "Task cannot be selected!"} , {status:500})
    }

}