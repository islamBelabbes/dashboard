import React from "react";
import { DashboardSideBarProvider } from "./dashboard-sidebar-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return <DashboardSideBarProvider>{children}</DashboardSideBarProvider>;
}

export default Providers;
