"use client";
import { storeCategory } from "@/actions/category.action";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useFormState } from "react-dom";
import ErrorAlert from "../common/ErrorAlert";
import FormButton from "../common/FormButton";

export default function CategoryCreateForm() {
  const [formState, storeCategoryActionState] = useFormState(storeCategory, {
    errors: {},
  });
  return (
    <form
      action={storeCategoryActionState}
      className="grid w-full max-w-sm items-center gap-1.5"
    >
      <Label htmlFor="name">Nome</Label>
      <Input
        type="text"
        id="name"
        name="name"
        placeholder="Nome da categoria"
      />
      <span className="text-red-500">
        {formState?.errors?.name?.join(", ")}
      </span>

      {formState?.errors?.otherErrors ? (
        <ErrorAlert
          title="Error ao adicionar categoria"
          message={formState?.errors?.otherErrors?.join(", ")}
        />
      ) : null}

      <FormButton />
    </form>
  );
}
