import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Settings,
  LogOut,
  LayoutDashboard,
  ClipboardList,
  ClipboardCheck,
  Boxes,
  Truck,
  Wrench,
  CalendarClock,
  Users,
  Shield,
  Activity,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/fonzoLogo.jpg";
import supabase from "@/helper/supabaseClient";
import { useAuthChecker } from "@/hooks/useAuthChecker";
import { roleAccess } from "@/types/roles";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Job Orders",
    url: "/job-orders",
    icon: ClipboardList,
  },
  {
    title: "Work Assign",
    url: "/work-assign",
    icon: ClipboardCheck,
  },
  {
    title: "Inventory & Supplies",
    url: "/inventory-supplies",
    icon: Boxes,
  },
  {
    title: "Suppliers",
    url: "/suppliers",
    icon: Truck,
  },
  {
    title: "Mechanics",
    url: "/mechanics",
    icon: Wrench,
  },
  {
    title: "Appointment Scheduling",
    url: "/appointment-scheduling",
    icon: CalendarClock,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: Users,
  },
  {
    title: "User Management",
    url: "/user-management",
    icon: Shield,
  },
  {
    title: "Activity Logs",
    url: "/activity-logs",
    icon: Activity,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, isLoading } = useAuthChecker();

  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter((item) => {
    const allowedRoles = roleAccess[item.url];
    // While loading or if role is null, show all items for admin (fallback)
    // Once role is loaded, filter properly
    if (!allowedRoles) return false;
    if (isLoading || !userRole) return true; // Show all while loading
    return allowedRoles.includes(userRole);
  });

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      // Force navigation to login even if signOut fails
      navigate("/login");
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex justify-center h-16 border-b border-sidebar-border ">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <div className="flex h-8 w-8 items-center justify-center bg-sidebar-primary rounded-full flex-shrink-0">
            <img src={Logo} alt="Fonzo Logo" className="rounded-full" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold">Fonzo Calibration</span>
            <span className="text-xs text-sidebar-foreground/70">
              Dashboard
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => navigate(item.url)}
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                    className="hover:cursor-pointer"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="hover:cursor-pointer"
              tooltip="Logout"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}