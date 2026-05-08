import { Link, Outlet } from "react-router-dom";
import { Link2, Eye, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DashboardLayout = () => {
  const { signOut, user } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/");
  };

  const userName = user?.user_metadata?.full_name || profile?.username || "User";
  const avatarUrl = user?.user_metadata?.avatar_url;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 h-14 flex items-center px-4 gap-3">
            <SidebarTrigger />
            <Link to="/" className="flex items-center gap-2 font-display font-bold">
              <img src="/logo.svg" alt="ClickBio Logo" className="h-4 w-4 object-contain" />
              ClickBio
            </Link>
            <div className="flex-1" />
            <ThemeToggle />
            {profile?.username && (
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/${profile.username}`} className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> Preview
                </Link>
              </Button>
            )}
            
            <div className="flex items-center gap-2 pl-2 border-l border-border ml-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl} alt={userName} />
                <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium hidden md:inline-block">{userName}</span>
            </div>
            
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="ml-2">
              <LogOut className="h-3.5 w-3.5" /> <span className="hidden md:inline-block ml-1">Sign Out</span>
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