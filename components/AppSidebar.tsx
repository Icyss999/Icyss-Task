"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "./ui/sidebar";
import { Label } from "./ui/label";
import {
  BookIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  HouseIcon,
  PaperclipIcon,
  PlusIcon,
  StarIcon,
} from "lucide-react";
import { UserProfile } from "./Avatar";
import Link from "next/link";
import { AddTask } from "./AddTask";
import { usePathname } from "next/navigation";

function AppSideBar() {
  const MenuItem = [
    { Name: "All Tasks", Icon: BookIcon, href: "/home/all_task" },
    { Name: "Today", Icon: ClockIcon, href: "/home/today" },
    { Name: "UpComing", Icon: CalendarIcon, href: "/home/upcoming" },
    { Name: "Priority", Icon: StarIcon, href: "/home/priority" },
  ];

  const pathName = usePathname()

  const TaskItem = [
    { Name: "Work", Icon: PaperclipIcon },
    { Name: "Personal", Icon: HouseIcon },
    { Name: "Completed", Icon: CheckIcon },
  ];

  const { state } = useSidebar();
  const isActive = state == "collapsed";

  return (
    <Sidebar className="" collapsible="icon">
      <SidebarHeader className="flex mt-[1.5vh]">
        {isActive ? (
          <Label className="ml-[12px]"> I </Label>
        ) : (
          <Label className="text-lg ml-[10px]"> Icyss Todo List </Label>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <AddTask />
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="text-[grey]">Menu</SidebarGroupLabel>
          <SidebarMenu className="flex flex-col gap-[0.5vh]">
            {MenuItem.map((item) => {
                const isActive = pathName == item.href 
                return(
              <Link href={item.href} key={item.Name}>
                <SidebarMenuItem>
                  <SidebarMenuButton className = {`transition-transform duration-200 hover:translate-x-1 
                    ${isActive? `bg-[black] hover:bg-[#1F1F1F] hover:text-[white] text-[white]`:``}`}>
                    <item.Icon />
                    {item.Name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
                )
            }
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-[grey]">My Task</SidebarGroupLabel>
          <SidebarMenu className='flex flex-col gap-[0.5vh]'>
            {TaskItem.map((item) => {
                
                return (
              <SidebarMenuItem 
              className="transition-transform duration-200 hover:translate-x-1"
              key={item.Name}>
                <SidebarMenuButton>
                  <item.Icon />
                  {item.Name}
                </SidebarMenuButton>
              </SidebarMenuItem>
            )})}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenuButton>
          <UserProfile />
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}

export { AppSideBar };
