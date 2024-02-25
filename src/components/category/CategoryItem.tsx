import paths from "@/utils/paths";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "../ui/button";
import { TrashIcon } from "../common/icons";
import { Input } from "../ui/input";

import { removeCategory } from "@/actions/category.action";

interface CategoryProps {
  id: string;
  name: string;
}
export default function CategoryItem({ id, name }: CategoryProps) {
  return (
    <Card className="flex items-center justify-center bg-secondary flex-col">
      <Link
        href={paths.showCategory(id)}
        className="flex  justify-center items-center "
      >
        <CardContent className="p-8">
          <p className="text-xl font-semibold">{name}</p>
        </CardContent>
      </Link>
      <CardFooter className="h-5">
        <form action={removeCategory}>
          <Input name="id" value={id} className="hidden" />
          <Button type="submit" variant={"ghost"}>
            <TrashIcon />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
