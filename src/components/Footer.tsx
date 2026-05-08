import { Link2 } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 bg-background">
      <div className="container grid gap-8 md:grid-cols-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2 font-display font-bold mb-4">
            <img src="/logo.svg" alt="ClickBio Logo" className="h-6 w-6 object-contain" />
            <span className="text-xl">ClickBio</span>
          </Link>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            The only link in bio you'll ever need. Connect your audience to all your content with just one click.
          </p>
          <p className="text-xs text-muted-foreground">© 2026 ClickBio. All rights reserved.</p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Product</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/auth" className="hover:text-primary transition-colors">Sign In</Link></li>
            <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
            <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Company</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm">Legal</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link to="/refund" className="hover:text-primary transition-colors">Refund Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;