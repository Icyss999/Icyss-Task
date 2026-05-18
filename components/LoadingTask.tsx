import { Skeleton } from "./ui/skeleton";


export default function SkeletonTask (){


    return(
        <div className="ml-[10vw] mt-[45px] flex flex-col gap-[30px]"> 
            <Skeleton className="w-[100px] h-5"/>
           {Array.from({length:5}).map((_,i)=>( <Skeleton className="w-[60vw] h-35" key={i}/>))}

            
        </div>
    )
}