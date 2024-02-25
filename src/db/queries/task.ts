import { db } from "@/utils/db";

export const indexTasks = (id: string) => {
  return db.task.findMany({
    where: {
      categoryId: id,
    },
    orderBy: {
      created_at: "desc",
    },
  });
};
