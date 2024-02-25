import { SignInWithGithub } from "@/actions/auth.action";
import { GithubIcon, GoogleIcon } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/utils/auth";

import { GoogleLogo, GithubLogo } from "@phosphor-icons/react";
import CategoryPage from "./category/page";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) {
    return redirect("/category");
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <Card className=" w-[400px]">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="font-semibold">TO COMPLETE</CardTitle>
          <CardDescription>
            Use as contas do google/facebook para ter acesso
          </CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2  gap-2">
          <Button className="flex justify-center items-center  gap-2 w-full">
            <GoogleIcon /> Google{" "}
          </Button>
          <form action={SignInWithGithub}>
            <Button
              className="flex justify-center items-center  gap-2 w-full"
              type="submit"
            >
              <GithubIcon /> Github{" "}
            </Button>
          </form>
        </CardContent>

        <CardFooter></CardFooter>
      </Card>
    </main>
  );
}
