"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormState } from "react-dom";
import ErrorAlert from "../common/ErrorAlert";
import FormButton from "../common/FormButton";
import InputCalendar from "../common/InputCalendar";
import { storeTask } from "@/actions/task.action";
import { useState } from "react";
import { AnyZodObject } from "zod";

export default function TaskCreateForm({ categoryId }: { categoryId: string }) {
  const [start_at, setStartAt] = useState<Date>(new Date());
  const [end_at, setEndAt] = useState<Date>(new Date());
  const [formState, storeTaskActionState] = useFormState(
    storeTask.bind(null, { categoryId, start_at, end_at }),
    {
      errors: {},
    }
  );
  return (
    <form
      action={storeTaskActionState}
      className="grid w-full max-w-sm items-center gap-1.5"
    >
      <div>
        <Label htmlFor="name">Nome</Label>
        <Input type="text" id="name" name="name" placeholder="Nome da tarefa" />
        <span className="text-red-500">
          {formState?.errors?.name?.join(", ")}
        </span>
      </div>
      <div className="w-full">
        <Label htmlFor="name">Início</Label>
        <InputCalendar
          name="start_at"
          onSelectDate={(value: any) => setStartAt(value)}
        />
        <span className="text-red-500">
          {formState?.errors?.start_at?.join(", ")}
        </span>
      </div>
      <div className="w-full mb-1">
        <Label htmlFor="name">Fim</Label>
        <InputCalendar
          name="end_at"
          onSelectDate={(value: any) => setEndAt(value)}
        />
        <span className="text-red-500">
          {formState?.errors?.end_at?.join(", ")}
        </span>
      </div>

      {formState?.errors?.otherErrors ? (
        <ErrorAlert
          title="Error ao adicionar tarefa"
          message={formState?.errors?.otherErrors?.join(", ")}
        />
      ) : null}
      <FormButton />
    </form>
  );
}
