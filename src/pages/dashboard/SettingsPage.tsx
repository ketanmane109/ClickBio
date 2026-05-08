import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, CreditCard, Shield, AlertTriangle, LogOut, KeyRound } from "lucide-react";

const SettingsPage = () => {

  const auth = useAuth();
  const { user, signOut } = auth;
  const { profile, updateProfile, loading: profileLoading } = useProfile();
  const { plan } = useSubscription();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);


  const usernameMemo = useMemo(() => profile?.username || "", [profile]);
  useEffect(() => {
    setUsername(usernameMemo);
  }, [usernameMemo]);

  if (profileLoading || !user) return (
    <div className="flex items-center justify-center min-h-[400px] p-8">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full mr-3"
      />
      <div>
        <h2 className="text-xl font-semibold mb-2">Loading settings...</h2>
        <p className="text-muted-foreground">Please wait while we load your profile.</p>
      </div>
    </div>
  );


  const saveUsername = async () => {
    if (!username.trim()) return toast.error("Username cannot be empty");
    if (!profile) return toast.error("Profile not loaded");
    setSaving(true);
    try {
      const { data: existing } = await supabase
        .from("profiles").select("id").eq("username", username.toLowerCase()).neq("id", profile.id).maybeSingle();
      if (existing) { setSaving(false); return toast.error("Username already taken"); }
      const err = await updateProfile({ username: username.toLowerCase() });
      setSaving(false);
      if (err) toast.error("Failed to save");
      else toast.success("Username updated!");
    } catch (error) {
      setSaving(false);
      toast.error("Save failed. Try again.");
    }
  };

  const handleLogOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? This will permanently delete your account and all data.")) return;
    if (profile) await supabase.from("profiles").delete().eq("id", profile.id);
    await signOut();
    toast.success("Account deleted");
    navigate("/");
  };

  const planLabel = plan === "pro" ? "Pro Plan" : plan === "basic" ? "Standard Plan" : "Free Plan";
  const billingCycle = plan === "free" ? "Forever Free" : "Monthly";
  const expiryDate = plan === "free" ? "Never" : "Oct 15, 2026"; // Mock date for now

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-10 pb-12">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-xl">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your profile, subscription, and security preferences.</p>
        </div>
      </div>

      <div className="grid gap-8">
        {/* Profile Settings */}
        <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
          <div className="p-6 md:px-8 border-b border-border/50 bg-muted/20 flex items-center gap-3">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <h3 className="font-display font-semibold text-lg tracking-tight">Profile Information</h3>
              <p className="text-sm text-muted-foreground">Update your account identity and email.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 space-y-8">
            <div className="space-y-3 max-w-2xl">
              <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Username</label>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 flex rounded-lg shadow-sm border border-input bg-background focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all overflow-hidden">
                  <span className="inline-flex items-center px-4 border-r border-input bg-muted/50 text-muted-foreground text-sm font-medium">
                    clickbio.in/
                  </span>
                  <Input 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className="border-0 focus-visible:ring-0 rounded-none bg-transparent h-11"
                  />
                </div>
                <Button className="w-full sm:w-auto h-11 px-6 shadow-sm hover:shadow-md transition-all glow font-medium" onClick={saveUsername} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
            <div className="space-y-3 max-w-2xl">
              <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
              <Input value={user?.email || ""} disabled className="h-11 bg-muted/50 text-muted-foreground cursor-not-allowed border-dashed" />
              <p className="text-xs text-muted-foreground mt-2">Email address cannot be changed at this time.</p>
            </div>
          </div>
        </div>

        {/* Subscription Settings */}
        <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-md overflow-hidden relative transition-all hover:shadow-lg">
          {plan !== 'free' && <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blur-[100px] rounded-full pointer-events-none -mr-40 -mt-40" />}
          <div className="p-6 md:px-8 border-b border-border/50 bg-muted/20 relative z-10 flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-muted-foreground" />
            <div>
              <h3 className="font-display font-semibold text-lg tracking-tight">Subscription Plan</h3>
              <p className="text-sm text-muted-foreground">Manage your billing cycle and upgrades.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 p-6 rounded-2xl bg-background/50 border border-border/50 shadow-sm backdrop-blur-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${
                    plan === 'pro' ? 'bg-primary/20 text-primary border border-primary/20' : 
                    plan === 'basic' ? 'bg-blue-500/20 text-blue-500 border border-blue-500/20' : 
                    'bg-muted text-muted-foreground border border-border'
                  }`}>
                    {planLabel}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">• {billingCycle}</span>
                </div>
                <p className="text-muted-foreground">
                  Your plan renews on <span className="font-semibold text-foreground">{expiryDate}</span>
                </p>
              </div>
              <Button asChild variant={plan === 'free' ? 'default' : 'outline'} size="lg" className={plan === 'free' ? 'glow font-medium' : 'font-medium bg-background'}>
                <a href="/dashboard/pricing">{plan === 'free' ? 'Upgrade to Premium' : 'Manage Subscription'}</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
          <div className="p-6 md:px-8 border-b border-border/50 bg-muted/20 flex items-center gap-3">
            <Shield className="w-5 h-5 text-muted-foreground" />
            <div>
              <h3 className="font-display font-semibold text-lg tracking-tight">Security & Access</h3>
              <p className="text-sm text-muted-foreground">Manage your password and active sessions.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center gap-4">
            <Button variant="outline" onClick={() => window.location.href = '/reset-password'} className="w-full sm:w-auto h-11 px-6 border-border/50 hover:bg-muted font-medium flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-muted-foreground" /> Change Password
            </Button>
            <Button variant="outline" onClick={handleLogOut} className="w-full sm:w-auto h-11 px-6 border-border/50 hover:bg-muted font-medium flex items-center gap-2">
              <LogOut className="w-4 h-4 text-muted-foreground" /> Log Out of All Devices
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 backdrop-blur-xl shadow-md overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent pointer-events-none" />
          <div className="p-6 md:px-8 border-b border-destructive/20 bg-destructive/10 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <div>
              <h3 className="font-display font-semibold text-lg text-destructive tracking-tight">Danger Zone</h3>
              <p className="text-sm text-destructive/80">Irreversible actions for your account.</p>
            </div>
          </div>
          <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
            <div className="max-w-md space-y-1">
              <p className="font-medium text-foreground">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account, your bio page, and all analytics data. This action cannot be undone.
              </p>
            </div>
            <Button variant="destructive" size="lg" onClick={handleDeleteAccount} className="w-full sm:w-auto shrink-0 shadow-lg shadow-destructive/20 hover:shadow-destructive/40 font-medium tracking-wide">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;