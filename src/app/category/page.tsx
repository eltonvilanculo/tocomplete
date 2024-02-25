import CategoryItem from "@/components/category/CategoryItem";
import { CategorySkeleton } from "@/components/category/CategorySkeleton";
import CategoryCreateForm from "@/components/category/CreateFrom";
import CustomDialog from "@/components/common/CustomDialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { indexCategories } from "@/db/queries/category";
import { Suspense } from "react";

export default async function CategoryPage() {
  // await new Promise((resolve, reject) => {
  //   setTimeout(resolve, 8000);
  // });
  const categories = await indexCategories();
  return (
    <div className="flex justify-center items-center w-full sm:h-screen my-4">
      <Card className="flex flex-col  items-center sm:w-1/2 sm:h-3/4 sm:border border-none ">
        <CardHeader className="grid grid-col-2 gap-2 items-center">
          <CardTitle>
            <h1>Lista de Categorias de tarefas </h1>
          </CardTitle>

          <CustomDialog
            trigger="ADD +"
            title="Criar Categoria"
            description="crie as catego"
          >
            <CategoryCreateForm />
          </CustomDialog>
          <CardDescription>
            Tenha acesso a todos agrupamentos de tarefas
          </CardDescription>
        </CardHeader>
        <Suspense fallback={<CategorySkeleton />}>
          <CardContent className="grid sm:grid-cols-3 gap-4 sm:gap-8 items-center">
            {categories.map((category: { id: string; name: string }) => (
              <CategoryItem
                name={category.name}
                id={category.id}
                key={category.id}
              />
            ))}
          </CardContent>
        </Suspense>
      </Card>
    </div>
  );
}
