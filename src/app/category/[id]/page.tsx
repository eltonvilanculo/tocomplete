import { CategorySkeleton } from "@/components/category/CategorySkeleton";
import CustomDialog from "@/components/common/CustomDialog";
import DataTableDemo from "@/components/common/DataTableExample";
import TaskCreateForm from "@/components/task/CreateFrom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategoryById } from "@/db/queries/category";
import { indexTasks } from "@/db/queries/task";
import { Suspense } from "react";

type TaskPageProps = {
  params: {
    id: string;
  };
};

export default async function TaskPage({ params }: TaskPageProps) {
  const data = await indexTasks(params.id);
  const category = await getCategoryById(params.id);

  return (
    <div className="flex justify-center items-center w-full sm:h-screen my-4">
      <Card className="flex flex-col  items-center sm:w-1/2 sm:h-3/4 sm:border border-none ">
        <CardHeader className="grid grid-col-2 gap-2 items-center">
          <CardTitle>
            <h1>Gestão de Tarefas </h1>
          </CardTitle>

          <CustomDialog
            trigger="ADD +"
            title="Criar Tarefa"
            description={`Criar tarefas para ${category?.name}`}
          >
            <TaskCreateForm categoryId={params.id} />
          </CustomDialog>
          <CardDescription>
            Gerencie as tarefas de {category?.name}
          </CardDescription>
        </CardHeader>
        <Suspense fallback={<CategorySkeleton />}>
          <CardContent className="w-full">
            <DataTableDemo data={data} />
          </CardContent>
        </Suspense>
      </Card>
    </div>
  );
}
