import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export const LegalLayout = ({ children, title, lastUpdated }: { children: React.ReactNode, title: string, lastUpdated: string }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          <div>
            <h1 className="text-4xl font-display font-bold mb-4">{title}</h1>
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
