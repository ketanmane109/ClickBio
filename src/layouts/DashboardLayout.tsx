import { Link, Outlet } from "react-router-dom";
import { Zap, Eye, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const DashboardLayout = () => {
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 h-14 flex items-center px-4 gap-3">
            <SidebarTrigger />
            <Link to="/" className="flex items-center gap-2 font-display font-bold">
              <Zap className="h-4 w-4 text-primary" />
              BioForge
            </Link>
            <div className="flex-1" />
            {profile?.username && (
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/${profile.username}`} className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> Preview
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-3.5 w-3.5 mr-1" /> Sign Out
            </Button>
          </header>
          <main className="flex-1 p-4 md:p-8 max-w-4xl">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
