"use server";

import { auth } from "@/utils/auth";
import z from "zod";

import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import paths from "@/utils/paths";
import { redirect } from "next/navigation";

interface storeTaskFormState {
  errors: {
    name?: string[];
    start_at?: string[];
    end_at?: string[];
    otherErrors?: string[];
  };
}

export async function storeTask(
  {
    categoryId,
    start_at,
    end_at,
  }: { categoryId: string; start_at: any; end_at: any },
  formState: storeTaskFormState,
  formData: FormData
): Promise<storeTaskFormState> {
  const name = formData.get("name");

  const session = await auth();

  const inputSchema = z.object({
    name: z
      .string()
      .min(3, { message: "A categoria deve ter no mínimo 3 caracteres" }),
    start_at: z.date(),
    end_at: z.date(),
  });

  const result = inputSchema.safeParse({ name, start_at, end_at });

  let task;

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
    task = await db.task.create({
      data: {
        name: nameFiled,
        userId: user?.id,
        start_at: result.data.start_at,
        end_at: result.data.end_at,
        categoryId,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("🚀 ~ error:", error);
      return {
        errors: {
          otherErrors: ["Erro no formato das datas"],
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

  revalidatePath(paths.showCategory(categoryId));
  redirect(paths.showCategory(categoryId));
}
