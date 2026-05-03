import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Label } from "./ui/label";


function UserProfile (){


    return (
        <div className = "flex items-center gap-[10px]">
            <Avatar className = " ">
                <AvatarImage src = "https://i.pinimg.com/originals/6d/6e/4a/6d6e4a5db72b70f28170a2deceba18ee.jpg?nii=t" />
                <AvatarFallback> CT </AvatarFallback>
            </Avatar>
            <div >
                    <Label>User Name </Label>
                    <Label> user@gmail.com</Label>
            </div>
                
        </div>

    )
}

export {UserProfile}