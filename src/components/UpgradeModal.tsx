import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpgradeModal = ({ open, onOpenChange }: UpgradeModalProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> Upgrade to Pro
          </DialogTitle>
          <DialogDescription>
            Unlock all AI tools and premium features.
          </DialogDescription>
        </DialogHeader>
        <ul className="space-y-2 my-4">
          {["All 5 AI creator tools", "Unlimited links", "All 10 themes", "Full analytics", "No branding"].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-primary shrink-0" /> {f}
            </li>
          ))}
        </ul>
        <p className="text-2xl font-display font-bold mb-4">₹199<span className="text-sm text-muted-foreground font-normal">/month</span></p>
        <Button variant="hero" className="w-full" onClick={() => { onOpenChange(false); navigate("/dashboard/pricing"); }}>
          View Pricing Plans
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
