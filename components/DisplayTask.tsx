import { Task } from "@/src/types/schema";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { DeleteTask } from "./DeleteTask";
import { Separator } from "./ui/separator";
import { AddTask } from "./AddTask";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";
import { BookIcon, ChevronDownIcon, PaperclipIcon } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

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
    <div className="w-[60vw] flex flex-col gap-3 ml-auto mr-auto group cursor-pointer">
      
      <div className="flex flex-col gap-3 ">
        <div className="flex gap-5 items-center mt-[10px] ">
          <Checkbox
            id={item.id}
            className="rounded-lg w-5 h-5"
            checked={isChecked}
            onCheckedChange={(isChecked) =>
              handleCheck(item.id, isChecked as boolean)
            }
          />
          <Label htmlFor={item.id} className="text-lg = w-[30vw]">
            {item.title}
          </Label>

          <DeleteTask deleteId={item.id} />
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
      <Separator/>
    </div>
  );
}

function DisplayTask({ data }: { data: Task[] }) {
  const hasData = data.length > 0;
  return (
    <div>
      {hasData ? (
        <Collapsible 
        defaultOpen
        className="w-[60vw] ml-auto mr-auto">
          <CollapsibleTrigger 
          className='mt-[30px] mb-[10px] font-bold flex gap-1 group transition-transform duration-200 hover:translate-x-2 cursor-pointer'> 
            <ChevronDownIcon className=" group-data-[state=open]:rotate-270"/>
            Overview 
          </CollapsibleTrigger>
          <Separator/>
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
          </EmptyDescription>
        </Empty>
      )}
    </div>
  );
}

export { DisplayTask };
