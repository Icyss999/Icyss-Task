import { CalendarIcon, PlusIcon } from "lucide-react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { ShowCalendar } from "./ShowCalendar"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"


function AddTask (){


    return(
       
            <Dialog>
                <DialogTrigger className="flex gap-[10px]" asChild>
                    <SidebarMenu className='w-[240px]'>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <PlusIcon/>
                                <Label>Add Task</Label>
                            </SidebarMenuButton>

                        </SidebarMenuItem>
                    </SidebarMenu> 
                </DialogTrigger>
                <DialogContent showCloseButton={false} >
                    <DialogHeader>
                        <DialogTitle className="text-[gray]">New Task</DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-col gap-[10px]'>
                        <Input
                        className="!text-2xl border-none shadow-none focus-visible:ring-0 "
                        placeholder="Wash the dishes !!!!"/>
                         <Input
                        className=" border-none shadow-none focus-visible:ring-0 "
                        placeholder="Add a Note..."/>
                    </div>

                    <Separator/>
                    <section className="flex gap-[20px]">
                        <ShowCalendar/>

                        <div>
                            <Select>
                                <SelectTrigger className="[&>svg]:hidden ">
                                    <SelectValue 
                                    placeholder ="Priority"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel> Priority </SelectLabel>
                                        <SelectItem value="low"> Low </SelectItem>
                                        <SelectItem value="medium"> Medium </SelectItem>
                                        <SelectItem value="high"> High </SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                    </section>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant= 'outline'> Cancel </Button>
                        </DialogClose>
                        <Button variant='outline'> Add Task </Button>
                    </DialogFooter>
                    
                </DialogContent>
                
            </Dialog>

    )
}




export {AddTask}