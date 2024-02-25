import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTriggerProps } from "@radix-ui/react-dialog";
import React from "react";
import { useFormStatus } from "react-dom";
interface CustomDialogProps extends DialogTriggerProps {
  trigger: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}
export default function CustomDialog({
  trigger,
  title,
  description,
  children,
  ...rest
}: CustomDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        className="bg-primary rounded-sm text-white dark:text-black hover:bg-gray-900 p-1"
        {...rest}
      >
        {trigger}
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center items-center">
        <DialogHeader>
          <DialogTitle className="uppercase">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
