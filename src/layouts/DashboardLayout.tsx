import { Link, Outlet, useLocation } from "react-router-dom";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 h-14 flex items-center px-4 gap-3">
            <SidebarTrigger />
            <Link to="/" className="flex items-center gap-2 font-display font-bold">
              <Zap className="h-4 w-4 text-primary" />
              BioForge
            </Link>
            <div className="flex-1" />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/ketan" className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" /> Preview
              </Link>
            </Button>
            <Button variant="hero" size="sm">Publish</Button>
          </header>

          {/* Content */}
          <main className="flex-1 p-6 md:p-8 max-w-4xl">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
