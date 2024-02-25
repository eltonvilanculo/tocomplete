"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { SunIcon } from "./icons";
import { Button } from "../ui/button";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";

export default function ProfileTrigger() {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();

  const handleChangeTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  if (status === "loading") {
    return <p>Hang on there...</p>;
  }
  if (status === "authenticated") {
    return (
      <Menubar className="border-none">
        <MenubarMenu>
          <MenubarTrigger className="bg-none border-none">
            <Avatar className="border-none size-6">
              <AvatarImage src={session?.user?.image ?? ""} />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
          </MenubarTrigger>

          <MenubarContent>
            <MenubarItem disabled>
              {session?.user?.name} <MenubarShortcut></MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />

            <MenubarItem>
              <Button variant={"ghost"} onClick={handleChangeTheme}>
                {" "}
                <SunIcon />
              </Button>
            </MenubarItem>
            <MenubarItem>
              <Button variant={"ghost"} onClick={() => signOut()}>
                Sair
              </Button>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  }
}
