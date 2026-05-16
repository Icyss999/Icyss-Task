"use client";
import { DisplayTask } from "@/components/DisplayTask";
import { Label } from "@/components/ui/label";
import { Task } from "@/src/types/schema";
import { useEffect, useState } from "react";

export default function AllTask() {


  const [loading, setLoading] = useState(false)
  const [task, setTask] = useState<Task[]>([]);
  
  useEffect(() => {
    const getTask = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/todotask");
        if (!res.ok) throw new Error("Data cannot be fetch !");
        const data = await res.json();
        setTask(data)
        console.log(data);
      } catch (error) {
        console.error(Error);
      }finally{
        setLoading(false)
      }
      
    };

    getTask()
  }, []);

  if (loading) return(<Label className="ml-[20px] mt-[10px]"> Loading... </Label>)

  return (
        <DisplayTask data={task}/>
  )
}
