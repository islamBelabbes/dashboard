export type TDashboardMenuItems = {
  name: string;
  href: string;
  icon: JSX.Element;
  subMenu?: TDashboardMenuItems[] | null;
};
