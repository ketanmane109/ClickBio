const PhoneMockup = () => {
  return (
    <div className="relative animate-float">
      {/* Outer Phone Frame */}
      <div className="w-[280px] h-[560px] rounded-[2.5rem] border-[6px] border-border bg-card p-2 card-shadow relative z-10 before:absolute before:-z-10 before:inset-0 before:rounded-[2.5rem] before:bg-gradient-to-b before:from-border/50 before:to-transparent">
        {/* Screen */}
        <div className="w-full h-full rounded-[2rem] bg-background/95 backdrop-blur-3xl overflow-hidden flex flex-col items-center pt-12 px-5 border border-border/30 relative">
          
          {/* Subtle gradient background for the screen */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-border rounded-b-2xl" />
          
          {/* Profile Section */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-tr from-primary/20 to-primary/5 border border-primary/20 mb-4 flex items-center justify-center shadow-lg shadow-primary/5 overflow-hidden">
            <img src="/favicon.png" alt="ClickBio" className="w-10 h-10 object-contain opacity-80" />
          </div>
          
          <h3 className="font-display font-semibold text-base mb-1 tracking-tight">@ClickBio</h3>
          <p className="text-[11px] text-muted-foreground mb-6 text-center font-medium">Premium Creator Tools</p>

          {/* Links Skeleton Style */}
          <div className="w-full space-y-3 relative z-10">
            {["Website", "YouTube", "Instagram", "Contact"].map((label) => (
              <div
                key={label}
                className="w-full py-3 px-4 rounded-xl bg-card border border-border/50 text-center text-[13px] font-medium hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2 group"
              >
                <div className="w-4 h-4 rounded-sm bg-muted-foreground/20 group-hover:bg-primary/20 transition-colors" />
                <span className="text-foreground/80 group-hover:text-foreground transition-colors">{label}</span>
              </div>
            ))}
          </div>
          
          {/* Bottom Analytics Card Skeleton */}
          <div className="mt-auto mb-4 w-full p-4 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-md">
            <div className="flex justify-between items-end mb-3">
              <div className="space-y-1.5">
                <div className="h-2 w-12 bg-muted rounded-full" />
                <div className="h-4 w-16 bg-foreground/20 rounded-full" />
              </div>
              <div className="h-8 w-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500/40 rounded-full" />
              </div>
            </div>
            <div className="flex gap-1 items-end h-8 mt-2">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

        </div>
      </div>
      
      {/* Decorative blurred background behind the phone */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent/20 blur-2xl -z-10 rounded-full opacity-50" />
    </div>
  );
};

export default PhoneMockup;
