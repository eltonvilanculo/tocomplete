"use server";

import { auth } from "@/utils/auth";
import z from "zod";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import paths from "@/utils/paths";
import { redirect } from "next/navigation";

interface storeCategoryFormState {
  errors: {
    name?: string[];
    otherErrors?: string[];
  };
}

export async function storeCategory(
  formState: storeCategoryFormState,
  formData: FormData
): Promise<storeCategoryFormState> {
  const name = formData.get("name");

  const session = await auth();

  const inputSchema = z.object({
    name: z
      .string()
      .min(3, { message: "A categoria deve ter no mínimo 3 caracteres" }),
  });

  const result = inputSchema.safeParse({ name });

  let category;

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  if (!session?.user) {
    return {
      errors: {
        otherErrors: ["Precisa se autenticar para poder criar "],
      },
    };
  }

  const nameFiled = result.data.name;

  const user = await db.user.findUnique({
    where: {
      email: session.user.email ?? "",
    },
  });

  try {
    category = await db.category.create({
      data: {
        name: nameFiled,
        userId: user?.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          otherErrors: [error.message],
        },
      };
    } else {
      return {
        errors: {
          otherErrors: ["Ocorreu um error ao adicionar categoria"],
        },
      };
    }
  }

  revalidatePath(paths.categoriesPage());
  redirect(paths.showCategory(category?.id));
}

export async function removeCategory(formData: FormData) {
  const id = formData.get("id") as string;

  if (id) {
    await db.category.delete({
      where: {
        id,
      },
    });
  }
  revalidatePath(paths.categoriesPage());
  redirect(paths.categoriesPage());
}
