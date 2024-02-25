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

import { BellIcon } from "./icons";

export default async function NotificationTrigger() {
  return (
    <Menubar className="border-none">
      <MenubarMenu>
        <MenubarTrigger className="bg-none border-none">
          <BellIcon />
        </MenubarTrigger>

        <MenubarContent>
          <MenubarItem disabled>
            <MenubarShortcut>Admin</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Settings</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Profile</MenubarItem>
              <MenubarItem>Profile</MenubarItem>
              <MenubarItem>Profile</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>Sair</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
