import { Link2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10 bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 font-display font-bold">
          <Link2 className="h-4 w-4 text-primary" />
          clickbio
        </Link>
        <p className="text-xs text-muted-foreground">© 2026 clickbio. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;