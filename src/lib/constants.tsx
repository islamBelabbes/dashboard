import { TDashboardMenuItems } from "@/types";
import { Home } from "lucide-react";

export const HEADER_HEIGHT: string = "60";


export const DASHBOARD_NAV_ITEMS: TDashboardMenuItems[] = [
    {
      name: "home",
      href: "/dashboard",
      icon: <Home />,
      subMenu: null,
    },
    {
      name: "project",
      href: "/dashboard/project",
      icon: <Home />,
      subMenu: [
        {
          name: "all",
          href: "/dashboard/project/all",
          icon: <Home />,
        },
        {
          name: "create",
          href: "/dashboard/project/create",
          icon: <Home />,
        },
      ],
    },
    {
      name: "category",
      href: "/dashboard/category",
      icon: <Home />,
      subMenu: [
        {
          name: "all",
          href: "/dashboard/category/all",
          icon: <Home />,
        },
        {
          name: "create",
          href: "/dashboard/category/create",
          icon: <Home />,
        },
      ],
    },
  ];