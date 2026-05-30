import { Task, taskSchema } from "@/src/types/schema";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { DeleteTask } from "./DeleteTask";
import { Separator } from "./ui/separator";
import { AddButton, AddTask } from "./AddTask";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { BookIcon, ChevronDownIcon, PaperclipIcon, PenIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


function DisplayInfo({ item }: { item: Task }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = async (updateId: string, isChecked: boolean) => {
    try {
      setIsChecked(isChecked);
      const res = await fetch(`/api/todotask/${updateId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: isChecked,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Drawer direction = "right">
      
        <div className="w-[60vw] flex flex-col gap-3 ml-auto mr-auto group cursor-pointer">
        <div className="flex flex-col gap-3 ">
          <div className="flex gap-5 items-center mt-[10px] cursor-pointer ">
            <Checkbox
              className="rounded-lg w-5 h-5"
              checked={isChecked}
              onCheckedChange={(isChecked) =>
                handleCheck(item.id, isChecked as boolean)
              }
            />
            <Label
              className="text-lg = w-[30vw] cursor-pointer"
            >
              {item.title}
            </Label>
            <div className="flex gap-5 ml-[20vw]">
              <DeleteTask deleteId={item.id} />
              <DrawerTrigger>
                <PenIcon className="w-5 h-5 opacity-50 transition-transform duration-200 hover:scale-105 hover:opacity-100 cursor-pointer group-hover:block hidden "/>
              </DrawerTrigger>
            </div>
          </div>

          <Label className="text-sm  text-[grey]">{item.description}</Label>
          <Badge
            className={
              item.priority == "none"
                ? `bg-[grey] w-12 h-5 text-white rounded-lg px-2 `
                : item.priority == "low"
                  ? `bg-[#0c8505] w-12 h-5 text-white rounded-lg px-2.5`
                  : item.priority == "medium"
                    ? `bg-[#de9f00] w-17 h-5 text-white rounded-lg px-2.5`
                    : item.priority == "high"
                      ? `bg-[#ff0000] w-13 h-5 text-white rounded-lg px-2`
                      : ``
            }
          >
            {item.priority}
          </Badge>
        </div>
        <Separator />
      </div>
      <DrawerContent>
            <EditContent editData={item}/>
      </DrawerContent>
    </Drawer>
  );
}


function DisplayTask({ data }: { data: Task[] }) {
  const hasData = data.length > 0;
  return (
    <div>
      {hasData ? (
        <Collapsible defaultOpen className="w-[60vw] ml-auto mr-auto">
          <CollapsibleTrigger className="mt-[30px] mb-[10px] font-bold flex gap-1 group transition-transform duration-200 hover:translate-x-2 cursor-pointer">
            <ChevronDownIcon className=" group-data-[state=open]:rotate-270" />
            Overview
          </CollapsibleTrigger>
          <Separator />
          <CollapsibleContent>
            <div className="flex flex-col gap-3 mt-[10px] ">
              {data.map((item: Task) => (
                <DisplayInfo key={item.id} item={item} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Empty className="mt-[30vh]">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <BookIcon />
            </EmptyMedia>
            <EmptyTitle>No Tasks Are Available Yet</EmptyTitle>
          </EmptyHeader>
          <EmptyDescription className="flex flex-col items-center gap-3">
            <Label>You haven't started your journey yet. </Label>
            <Label>
              Start your fascinating journey by adding more tasks!!!
            </Label>
            <AddButton />
          </EmptyDescription>
        </Empty>
      )}
    </div>
  );
}


function EditContent({editData}:{editData:Task}){

  const [isLoading, setIsLoading] = useState(false)
  const hasValue = !!editData.description

  const handleSave = async (values:Task)=>{
    try{
      setIsLoading(true)
      const res = await fetch(`/api/todotask/${editData.id}`,{
      method : "PATCH",
      headers : {"Content-Type": "application/json"}, 
      body: JSON.stringify({
        title: values.title,
          description: values.description,
          completedBy: values.completedBy
            ? values.completedBy.toISOString()
            : null,
          priority: values.priority

      })
    })
    if(!res.ok) throw new Error("Task cannot be updated!")
    console.log(values)
    const data = await res.json()
    if (data.success){
      window.location.reload()
    }

    }catch(error){
      console.error(error)
    }finally{
      setIsLoading(false)
    }
    
  }
  
  const {
      reset,
      control,
      register,
      handleSubmit,
      formState: { errors, isDirty },
    } = useForm<Task>({
      resolver: zodResolver(taskSchema),
      defaultValues: {
        title: editData.title,
        description: hasValue? editData.description :  "No description",
        completedBy: editData.completedBy,
        priority: editData.priority,
      },
    });

  

  return(
    <form onSubmit={handleSubmit(handleSave)}>
        <DrawerHeader>
          <DrawerTitle> 
            <Input 
            className="border-none focus-visible:ring-0 !text-2xl"
            {...register("title")}/>
          </DrawerTitle>
        </DrawerHeader>
        <div>
          <Label className="mt-2 ml-5">
            Description:
          </Label>
          <Input
          className="border-none focus-visible:ring-0 ml-5 mt-2 text-black"
          {...register("description")}/>
          
          
          <div className="flex flex-col ml-5 gap-[10px] mt-5">
            <Label> Priority: </Label>
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select 
              onValueChange={field.onChange} 
              value={field.value}>
                <SelectTrigger className="[&>svg]:hidden ">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel> Priority </SelectLabel>
                    <SelectItem value="none"> None </SelectItem>
                    <SelectItem value="low"> Low </SelectItem>
                    <SelectItem value="medium"> Medium </SelectItem>
                    <SelectItem value="high"> High </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />


          </div>
        </div >
        <DrawerFooter className="absolute bottom-5">
          <Button 
          type ="submit"
          variant="outline"
          className="cursor-pointer ml-[250px]"
          disabled = {!isDirty}>  
          {isLoading? "Proceeding" : 'Save'}
            
          </Button>
        </DrawerFooter>
    </form>
  )
}




export {DisplayTask}