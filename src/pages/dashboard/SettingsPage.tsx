import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const SettingsPage = () => {
  const [username, setUsername] = useState("ketan");
  const [email, setEmail] = useState("ketan@example.com");

  return (
    <div>
      <h1 className="text-2xl font-display font-bold mb-6">Settings</h1>

      <div className="rounded-xl border border-border bg-card p-6 space-y-5 mb-6">
        <h3 className="font-display font-semibold">Profile</h3>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Username</label>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          <p className="text-xs text-muted-foreground mt-1">Your public page: /{username}</p>
        </div>
        <div>
          <label className="text-sm font-medium mb-1.5 block">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        </div>
        <Button variant="hero" size="sm">Save Changes</Button>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-display font-semibold mb-2">Plan</h3>
        <p className="text-sm text-muted-foreground mb-4">You're on the <span className="text-primary font-medium">Free</span> plan.</p>
        <Button variant="outline" size="sm">Upgrade to Pro</Button>
      </div>
    </div>
  );
};

export default SettingsPage;
