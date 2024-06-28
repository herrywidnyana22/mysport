import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./dropdown-menu";
import { Button } from "./button";

type OptionActionProps = {
    deleteAction: () => void
    editAction: () => void
}

export const OptionAction= ({
    editAction,
    deleteAction
}: OptionActionProps) => {
    return ( 
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            
            <DropdownMenuItem>
                Ubah ini
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem >
                Hapus ini
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    );
}