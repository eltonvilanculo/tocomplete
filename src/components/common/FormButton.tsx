"use client";
import { CircleNotch } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text?: string;
}

export default function FormButton({
  text = "Submeter",
  ...rest
}: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button {...rest} disabled={pending} type="submit">
      {pending ? <CircleNotch className="mr-2 h-4 w-4 animate-spin" /> : null}
      {text}
    </Button>
  );
}
