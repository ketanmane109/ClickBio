const PhoneMockup = () => {
  return (
    <div className="relative animate-float">
      <div className="w-[280px] h-[560px] rounded-[2.5rem] border-2 border-border bg-card p-3 card-shadow">
        <div className="w-full h-full rounded-[2rem] bg-secondary overflow-hidden flex flex-col items-center pt-10 px-6">
          {/* Notch */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-5 bg-background rounded-full" />
          
          {/* Profile */}
          <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary mb-3 flex items-center justify-center">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="font-display font-bold text-sm mb-1">@ketan</h3>
          <p className="text-[10px] text-muted-foreground mb-5 text-center">Creator · Builder · Dreamer</p>

          {/* Links */}
          <div className="w-full space-y-2.5">
            {["My Portfolio", "YouTube Channel", "Newsletter", "Book a Call"].map((label) => (
              <div
                key={label}
                className="w-full py-2.5 rounded-lg bg-muted text-center text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {label}
              </div>
            ))}
            <div className="w-full py-3 rounded-lg bg-primary text-primary-foreground text-center text-xs font-bold glow">
              ⭐ Featured: My Course
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
