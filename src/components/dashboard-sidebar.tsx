"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { MenuIcon, XCircle } from "lucide-react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next13-progressbar";

import { TDashboardMenuItems } from "@/types";
import { cn } from "@/lib/utils";
import useDashboardSideBar from "@/providers/dashboard-sidebar-provider";
import { DASHBOARD_NAV_ITEMS } from "@/lib/constants";
import { Separator } from "./ui/separator";
import DashboardSideBarToggle from "./dashboard-sidebar-toggle";

type TMenuHeaderProps = {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

type TMenuItemProps = {
  items: TDashboardMenuItems[];
  currentPath: string;
  handleNavigation: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => void;
};

function DashboardSideBar() {
  const { isCollapsed, setIsCollapsed, isToggled, setIsToggled } =
    useDashboardSideBar();

  const currentPath = usePathname();
  const router = useRouter();

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    href: string
  ) => {
    e.preventDefault();
    setIsToggled(false);
    router.push(href);
    router.refresh();
  };

  return (
    <Sidebar
      toggled={isToggled}
      breakPoint="lg"
      width="250px"
      backgroundColor="#fff"
      collapsed={isCollapsed}
      className={cn("lg:block lg:!relative z-10")}
    >
      <MenuHeader isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Separator />
      <Menu
        className="z-10"
        menuItemStyles={{
          button: {
            "&:hover": {
              backgroundColor: "#E1F8FD",
            },
          },
        }}
      >
        <MenuItems
          currentPath={currentPath}
          items={DASHBOARD_NAV_ITEMS}
          handleNavigation={handleNavigation}
        />
      </Menu>
    </Sidebar>
  );
}

const MenuItems = ({
  items,
  currentPath,
  handleNavigation,
}: TMenuItemProps) => {
  const parentPatch = currentPath.split("/").filter(Boolean);

  return items.map((item: TDashboardMenuItems) =>
    item.subMenu ? (
      <SubMenu
        key={item.href}
        icon={item.icon}
        label={item.name}
        className={cn({
          "bg-[#E1F8FD]": parentPatch[1] === item.name,
        })}
      >
        <MenuItems
          currentPath={currentPath}
          items={item.subMenu}
          handleNavigation={handleNavigation}
        />
      </SubMenu>
    ) : (
      <MenuItem
        data-test={currentPath}
        key={item.href}
        className={cn({
          "bg-[#E1F8FD]": currentPath === item.href,
        })}
        icon={item.icon}
        component={
          <Link
            prefetch={false}
            href={item.href}
            onClick={(e) => handleNavigation(e, item.href)}
          />
        }
      >
        {item.name}
      </MenuItem>
    )
  );
};

const MenuHeader = ({ isCollapsed, setIsCollapsed }: TMenuHeaderProps) => {
  return (
    <div className="h-[60px] flex justify-around items-center">
      {!isCollapsed && <DashboardSideBarToggle />}
      <AnimatePresence initial={false} mode="popLayout">
        {!isCollapsed && (
          <motion.a
            href="/"
            target="_blank"
            layout
            initial={{
              opacity: 0,
              translateX: -100,
            }}
            animate={{
              opacity: 1,
              translateX: 0,
            }}
            exit={{
              opacity: 0,
              translateX: -100,
            }}
            transition={{ duration: 0.2 }}
            className="text-xl font-medium dark:text-WhitePrimary text-BlackPrimary "
          >
            BelabbesIslam.
          </motion.a>
        )}
      </AnimatePresence>

      <motion.div layout className="cursor-pointer">
        {isCollapsed ? (
          <MenuIcon onClick={() => setIsCollapsed(!isCollapsed)} />
        ) : (
          <XCircle onClick={() => setIsCollapsed(!isCollapsed)} />
        )}
      </motion.div>
    </div>
  );
};
export default DashboardSideBar;
