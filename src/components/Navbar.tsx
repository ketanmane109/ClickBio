import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link2, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Navbar = () => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <Link2 className="h-5 w-5 text-primary" />
          BioSpark
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
          <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <Button variant="hero" size="sm" asChild>
              <Link to="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild><Link to="/auth">Log in</Link></Button>
              <Button variant="hero" size="sm" asChild><Link to="/auth">Get Started</Link></Button>
            </>
          )}
        </div>
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background p-4 space-y-3">
          <a href="#features" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#pricing" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Pricing</a>
          <a href="#testimonials" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Testimonials</a>
          <div className="pt-2">
            {user ? (
              <Button variant="hero" size="sm" className="w-full" asChild><Link to="/dashboard">Dashboard</Link></Button>
            ) : (
              <Button variant="hero" size="sm" className="w-full" asChild><Link to="/auth">Get Started</Link></Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;