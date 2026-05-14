import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSubscription } from "@/hooks/useSubscription";

interface UpgradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const UpgradeModal = ({ open, onOpenChange }: UpgradeModalProps) => {
  const navigate = useNavigate();
  const { plan } = useSubscription();

  const isBasic = plan === "basic";
  const titleText = isBasic ? "Upgrade to Pro" : "Upgrade to Premium";
  const descText = isBasic
    ? "Unlock premium themes, advanced analytics, unlimited links, and remove ClickBio branding."
    : "Unlock premium themes, analytics, custom backgrounds, more links, and remove branding.";

  const priceText = isBasic ? "₹199" : "₹99";
  const pricingDetail = isBasic 
    ? "Upgrade to Pro for unlimited links & full features" 
    : "Standard plan starts from just ₹99/month";

  const features = isBasic
    ? ["Unlimited links (Standard is limited to 10)", "All 10 professional themes", "Advanced click analytics", "No ClickBio branding"]
    : ["Up to 10 premium links (Free is limited to 5)", "10 beautiful custom themes", "Custom background images", "Click tracking & analytics", "Remove brand logo"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display font-bold text-xl">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" /> {titleText}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-1.5">
            {descText}
          </DialogDescription>
        </DialogHeader>
        
        <ul className="space-y-3 my-5">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm font-medium">
              <Check className="h-4 w-4 text-primary shrink-0" /> {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-1 mb-6 p-4 rounded-xl bg-muted/50 border border-border/50">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-display font-extrabold text-foreground">{priceText}</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <p className="text-xs text-muted-foreground">{pricingDetail}</p>
          {isBasic && (
            <span className="text-[11px] text-primary font-medium mt-1">
              You are currently subscribed to Standard (₹99/mo)
            </span>
          )}
        </div>

        <Button variant="hero" className="w-full h-11 text-sm font-bold tracking-wide glow" onClick={() => { onOpenChange(false); navigate("/dashboard/pricing"); }}>
          View Pricing Plans
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UpgradeModal;
