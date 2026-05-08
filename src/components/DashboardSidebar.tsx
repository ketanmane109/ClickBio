import {
  LayoutDashboard, FileText, Palette, BarChart3, Settings, CreditCard,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Bio Builder", url: "/dashboard/bio", icon: FileText },
  { title: "Themes", url: "/dashboard/themes", icon: Palette },
  { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
  { title: "Pricing", url: "/dashboard/pricing", icon: CreditCard },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) =>
    path === "/dashboard" ? currentPath === "/dashboard" : currentPath.startsWith(path);

  return (
    <Sidebar collapsible="icon">
      <div className="p-4 flex items-center gap-3">
        <img src="/favicon.png" alt="ClickBio Logo" className="h-8 w-8 object-contain shrink-0" />
        {!collapsed && <span className="font-display text-xl font-bold tracking-tight">ClickBio</span>}
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink to={item.url} end={item.url === "/dashboard"} className="hover:bg-muted/50" activeClassName="bg-muted text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}