"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSubButton, SidebarMenuSubItem, SidebarTrigger, useSidebar } from "./ui/sidebar";
import { Label } from "./ui/label";
import { BookIcon, CalendarIcon, CheckIcon, ClockIcon, HouseIcon, PaperclipIcon, PlusIcon, StarIcon } from "lucide-react";
import { UserProfile } from "./Avatar";
import Link from "next/link";



function AppSideBar (){

    const MenuItem = [
        {Name: "All Tasks", Icon: BookIcon, href:"/home/all_task"},
        {Name: "Today" , Icon: ClockIcon, href:"/home/today" },
        {Name: "UpComing", Icon: CalendarIcon, href:"/home/upcoming"},
        {Name: "Priority", Icon: StarIcon, href:"/home/priority"},

    ]

    const TaskItem = [
        {Name: "Work", Icon: PaperclipIcon},
        {Name: "Personal", Icon: HouseIcon},
        {Name: "Completed", Icon: CheckIcon}
    ]

    const {state} = useSidebar()
    const isActive = state == "collapsed"

    return (
        <Sidebar className = "" collapsible="icon">
            <SidebarHeader className = "flex ">
                {
                    isActive ? 
                    (<Label className="ml-[12px]"> I </Label>)
                    :
                    (<Label className = "text-2xl ml-[10px]"> Icyss Todo List </Label>)
                }
                
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <PlusIcon/>
                                Add Task
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>
                        Menu 
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {
                            MenuItem.map (item => (
                                <Link href = {item.href}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton>
                                        <item.Icon/>
                                        {item.Name}
                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                                </Link>
                            ))
                        }
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel> 
                        My Task 
                    </SidebarGroupLabel>
                    <SidebarMenu>
                        {
                            TaskItem.map(item => (
                                <SidebarMenuItem key = {item.Name}>
                                    <SidebarMenuButton>
                                        <item.Icon/>
                                        {item.Name}
                                    </SidebarMenuButton>

                                </SidebarMenuItem>

                            ))
                        }
                    </SidebarMenu>
                </SidebarGroup>

            </SidebarContent>

            <SidebarFooter>
                <SidebarMenuButton>
                    <UserProfile/>
                </SidebarMenuButton>
            </SidebarFooter>

        </Sidebar>


    )

}


export {AppSideBar}