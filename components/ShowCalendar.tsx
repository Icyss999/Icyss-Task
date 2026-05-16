import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { format } from "date-fns"
import { Calendar } from "./ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Control, Controller } from "react-hook-form"
import { Task } from "@/src/types/schema"



type Props = {
        control : Control<Task>
    }

function ShowCalendar ({control}: Props){



    return(
        <Controller 
        control = {control}
        name = "completedBy"
        render = {({field})=>(
             <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[100px]">
                    {field.value ? format(field.value,"yyyy-MM-dd") 
                    : 
                    (
                        <div className="flex gap-[5px]">
                            <CalendarIcon/>
                            <p> Due Date</p>

                        </div>
                    )
                    }
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                mode ="single"
                selected = {field.value}
                onSelect = {field.onChange}/>
            </PopoverContent>
        </Popover>

        )}
       
        />
    )
        
    
}


export {ShowCalendar}