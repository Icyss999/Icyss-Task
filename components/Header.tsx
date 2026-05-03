"use client"
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import { usePathname } from "next/navigation";


function Header (){

    const urlName = usePathname();

    const title : Record<string,string> = {
        "/home/all_task" : "All Task",
        "/home/today" : "Today's Task",
        "/home/upcoming" : "Upcoming Task",
        "/home/priority" : "Priority"
    }





    return(
        <div className="w-full mt-[20px]">
            
            <span className="flex items-center ml-[10px] gap-[20px] ">
                <SidebarTrigger/>
                <p className="text-2xl">{title[urlName]}</p> 
            </span>
            <Separator orientation="horizontal" className="w-full mt-[20px]"/>


        </div>

    
           
           

        

    )
}

export {Header}