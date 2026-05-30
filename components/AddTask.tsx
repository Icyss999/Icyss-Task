import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { ShowCalendar } from "./ShowCalendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Controller, useForm } from "react-hook-form";
import { Task, taskSchema } from "@/src/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

function AddTask() {
  return (
    <Dialog>
      <DialogTrigger className="flex gap-[10px]" asChild>
        <SidebarMenu className="w-[240px]">
          <SidebarMenuItem>
            <SidebarMenuButton className="transition-transform duration-200 hover:scale-102 ">
              <PlusIcon />
              <Label className="text-base">Add Task</Label>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <Content />
      </DialogContent>
    </Dialog>
  );
}

function Content() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<Task>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      completedBy: undefined,
      priority: "none",
    },
  });

  const onSubmit = async (values: Task) => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/todotask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          completedBy: values.completedBy
            ? values.completedBy.toISOString
            : null,
          priority: values.priority,
        }),
      });

      const data = await res.json();
      if (data.success) {
        reset();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[10px]"
    >
      <DialogHeader>
        <DialogTitle className="text-[gray]">New Task</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-[10px]">
        <Input
          className="!text-2xl border-none shadow-none focus-visible:ring-0 "
          placeholder="Wash the dishes !!!!"
          {...register("title")}
        />

        <Input
          className=" border-none shadow-none focus-visible:ring-0 "
          placeholder="Add a Note..."
          {...register("description")}
        />
      </div>

      <Separator />
      <section className="flex gap-[20px]">
        <ShowCalendar control={control} />

        <div>
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
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
      </section>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" disabled={isLoading}>
            {" "}
            Cancel{" "}
          </Button>
        </DialogClose>
        <Button
          variant="outline"
          type="submit"
          disabled={!isDirty ? true : isLoading}
        >
          {" "}
          {isLoading ? "Proceeding..." : "Add Task"}{" "}
        </Button>
      </DialogFooter>
    </form>
  );
}

function AddButton() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button 
          variant="outline"
          className="mt-[10px] ">
            <PlusIcon className="font-bold" />
            <Label className="font-bold"> Add Task</Label>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Content/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export { AddTask, AddButton };
