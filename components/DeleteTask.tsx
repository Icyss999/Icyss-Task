import { TrashIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState } from "react";

function DeleteTask({ deleteId }: { deleteId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/todotask/${deleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hidden group-hover:block ">
      <AlertDialog>
        <AlertDialogTrigger>
          <TrashIcon className="w-5 h-5 opacity-50 transition-transform duration-200 hover:scale-105 hover:opacity-100 cursor-pointer mt-2" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> Are you sure ?</AlertDialogTitle>
            <AlertDialogDescription>
              {" "}
              There's no going back :)
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer" disabled={isLoading}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleClick();
              }}
              disabled={isLoading}
            >
              {" "}
              {isLoading ? "Proceeding..." : "Delete"}{" "}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { DeleteTask };
