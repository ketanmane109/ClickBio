import { Button } from "@/components/ui/button";
import { XCircle, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-sm"
      >
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <XCircle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="text-2xl font-display font-bold mb-2">Payment Failed</h1>
        <p className="text-muted-foreground mb-6">
          Something went wrong with your payment. Don't worry — no charges were made.
        </p>
        <div className="flex flex-col gap-2">
          <Button variant="hero" onClick={() => navigate("/dashboard/pricing")} className="gap-2">
            <RotateCcw className="h-4 w-4" /> Try Again
          </Button>
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailed;
