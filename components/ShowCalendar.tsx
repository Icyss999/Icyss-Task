import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { format } from "date-fns"
import { Calendar } from "./ui/calendar"
import { CalendarIcon } from "lucide-react"





function ShowCalendar (){

    const [date,setDate] = useState<Date | undefined>()


    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-[100px]">
                    {date ? format(date,"yyyy-MM-dd") 
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
                selected = {date}
                onSelect = {setDate}/>
            </PopoverContent>
        </Popover>
    )
        
    
}


export {ShowCalendar}