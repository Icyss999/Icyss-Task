import { Task } from "@/src/types/schema";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { DeleteTask } from "./DeleteTask";

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
    <Card
      key={item.id}
      className="w-[55vw] h-[120px] ml-10  border-x-0 group transition-transformation duration-200 hover:scale-102"
    >
      <CardHeader className="flex items-center gap-[20px] ">
        <Checkbox
          id={item.id}
          className="rounded-lg w-5 h-5"
          checked={isChecked}
          onCheckedChange={(isChecked) =>
            handleCheck(item.id, isChecked as boolean)
          }
        />
        <Label htmlFor={item.id} className="text-lg font-bold w-[30vw]">
          {item.title}
        </Label>
          <DeleteTask deleteId={item.id}/>
        
        
      </CardHeader>
      <CardContent className="ml-10 flex flex-col gap-[10px]">
        <Label className="text-sm  text-[grey]">{item.description}</Label>
        <Label className="border-2 w-[50px] rounded-lg px-1.5"> 
          {item.priority} 
        </Label>
      </CardContent>
    </Card>
  );
}

function DisplayTask({ data }: { data: Task }) {
  return (
    <div className="grid grid-cols-1 gap-5 mt-[30px] ">
      {data.map((item: Task) => (
        <DisplayInfo key={item.id} item={item} />
      ))}
    </div>
  );
}

export { DisplayTask };
