import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SettingsPage = () => {
  const { user, signOut } = useAuth();
  const { profile, updateProfile, loading } = useProfile();
  const { plan } = useSubscription();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile) setUsername(profile.username || "");
  }, [profile]);

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" /></div>;

  const saveUsername = async () => {
    if (!username.trim()) return toast.error("Username cannot be empty");
    setSaving(true);
    const { data: existing } = await supabase
      .from("profiles").select("id").eq("username", username.toLowerCase()).neq("id", profile?.id || "").maybeSingle();
    if (existing) { setSaving(false); return toast.error("Username already taken"); }
    const err = await updateProfile({ username: username.toLowerCase() });
    setSaving(false);
    if (err) toast.error("Failed to save");
    else toast.success("Username updated!");
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure? This will permanently delete your account and all data.")) return;
    if (profile) await supabase.from("profiles").delete().eq("id", profile.id);
    await signOut();
    toast.success("Account deleted");
    navigate("/");
  };

  const planLabel = plan === "pro" ? "Pro" : plan === "basic" ? "Basic" : "Free";

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-display font-bold mb-6">Settings</h1>

      <div className="rounded-xl border border-border bg-card p-6 space-y-5 mb-6">
        <h3 className="font-display font-semibold">Profile</h3>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Username</label>
          <div className="flex gap-2">
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            <Button variant="hero" size="sm" onClick={saveUsername} disabled={saving}>{saving ? "..." : "Save"}</Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Your public page: /{username}</p>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Email</label>
          <Input value={user?.email || ""} disabled className="opacity-60" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <h3 className="font-display font-semibold mb-2">Subscription</h3>
        <p className="text-sm text-muted-foreground">
          Current plan: <span className="font-medium text-foreground">{planLabel}</span>
        </p>
      </div>

      <div className="rounded-xl border border-destructive/30 bg-card p-6">
        <h3 className="font-display font-semibold mb-2 text-destructive">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all associated data.</p>
        <Button variant="destructive" size="sm" onClick={handleDeleteAccount}>Delete Account</Button>
      </div>
    </motion.div>
  );
};

export default SettingsPage;