import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const plan = params.get("plan") || "pro";
  const planName = plan.charAt(0).toUpperCase() + plan.slice(1);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-sm"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">Payment Successful 🎉</h1>
        <p className="text-muted-foreground mb-6">
          Your <span className="font-semibold text-foreground">{planName} Plan</span> has been activated. Enjoy all premium features!
        </p>
        <Button variant="hero" onClick={() => navigate("/dashboard")} className="gap-2">
          Go to Dashboard <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
