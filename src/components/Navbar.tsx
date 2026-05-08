import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link2, Menu, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const Navbar = () => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
      scrolled ? "bg-background/90 backdrop-blur-xl shadow-md border-border/50" : "bg-background/80 backdrop-blur-sm border-transparent"
    }`}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight group">
          <img src="/logo.svg" alt="ClickBio Logo" className="h-7 w-7 object-contain transition-transform group-hover:scale-105" />
          <span>ClickBio</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
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
