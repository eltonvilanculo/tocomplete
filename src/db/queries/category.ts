import { db } from "@/utils/db";
import { cache } from "react";

export type IndexCategories = {
  name: string;
};

export const indexCategories = cache(() => {
  return db.category.findMany({
    orderBy: {
      created_at: "desc",
    },
  });
});
export const getCategoryById = (id: string) => {
  return db.category.findUnique({
    where: {
      id,
    },
  });
};
export const deleteCategory = (id: string) => {
  return db.category.delete({
    where: {
      id,
    },
  });
};
