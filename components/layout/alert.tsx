

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button"

   
  type AlertProps = {
    children: React.ReactNode
    title: string
    desc: string
    action: () => void
  }
  export function Alert({
    children,
    title,
    desc,
    action
  }:AlertProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {desc}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>
            <Button
              variant={"delete"}
              onClick={action}
            >
              Lanjut
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }