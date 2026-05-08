import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PhoneMockup from "@/components/PhoneMockup";

export default function HeroSection() {
  return (
    <section className="relative hero-gradient overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background glowing blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            ClickBio 2.0 is here
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-foreground mb-6 leading-tight">
            Your Links. Your Brand. <br/>
            <span className="text-gradient">One Powerful Bio Page.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Create a premium creator bio page with beautiful themes, analytics, and customization designed to grow your audience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base glow" asChild>
              <Link to="/auth">
                Start Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base bg-background/50 backdrop-blur-sm" asChild>
              <Link to="/#themes">Explore Themes</Link>
            </Button>
          </div>
        </motion.div>

        {/* Mockups container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative max-w-5xl mx-auto mt-12 md:mt-24"
        >
          {/* Dashboard Mockup */}
          <div className="relative rounded-2xl border border-border/40 bg-background/60 backdrop-blur-2xl shadow-2xl overflow-hidden aspect-video hidden md:block w-full card-shadow ring-1 ring-white/10">
            {/* Top Bar */}
            <div className="h-12 border-b border-border/40 bg-muted/20 flex items-center px-4 justify-between">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/80 shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm"></div>
              </div>
              <div className="w-64 h-6 rounded-md bg-muted/50 border border-border/50"></div>
              <div className="flex gap-3 items-center">
                <div className="w-6 h-6 rounded bg-muted/50"></div>
                <div className="w-6 h-6 rounded-full bg-primary/20"></div>
              </div>
            </div>
            
            <div className="p-6 flex h-[calc(100%-3rem)] gap-6">
              {/* Sidebar Skeleton */}
              <div className="w-56 border-r border-border/30 pr-6 space-y-6 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                     <div className="w-4 h-4 bg-primary/60 rounded-sm"></div>
                   </div>
                   <div className="h-4 rounded bg-foreground/20 w-24"></div>
                </div>
                
                <div className="space-y-3">
                  <div className="h-3 rounded bg-muted-foreground/30 w-16 mb-2"></div>
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`h-8 rounded-lg w-full flex items-center px-3 gap-3 ${i === 1 ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'}`}>
                      <div className={`w-4 h-4 rounded ${i === 1 ? 'bg-primary/50' : 'bg-muted-foreground/30'}`}></div>
                      <div className={`h-2.5 rounded w-20 ${i === 1 ? 'bg-primary/60' : 'bg-muted-foreground/40'}`}></div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-auto h-12 rounded-xl border border-border/50 bg-muted/20 flex items-center px-3 gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary/30 to-primary/10"></div>
                  <div className="space-y-1.5 flex-1">
                    <div className="h-2 rounded bg-foreground/30 w-16"></div>
                    <div className="h-1.5 rounded bg-muted-foreground/30 w-12"></div>
                  </div>
                </div>
              </div>
              
              {/* Main Content Skeleton */}
              <div className="flex-1 space-y-6 overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <div className="h-6 rounded bg-foreground/20 w-48"></div>
                    <div className="h-3 rounded bg-muted-foreground/30 w-64"></div>
                  </div>
                  <div className="h-9 w-28 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                     <div className="h-2.5 rounded bg-primary w-12"></div>
                  </div>
                </div>
                
                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 32, val: 24, glow: 'from-blue-500/10' },
                    { label: 24, val: 16, glow: 'from-purple-500/10' },
                    { label: 28, val: 20, glow: 'from-emerald-500/10' }
                  ].map((stat, i) => (
                    <div key={i} className={`h-28 rounded-xl bg-gradient-to-br ${stat.glow} to-transparent border border-border/40 p-4 flex flex-col justify-between relative overflow-hidden`}>
                      <div className="flex justify-between items-start">
                        <div className="h-3 rounded bg-muted-foreground/40" style={{ width: `${stat.label}px` }}></div>
                        <div className="w-5 h-5 rounded bg-background/50 backdrop-blur-sm border border-border/50"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-6 rounded bg-foreground/30" style={{ width: `${stat.label * 1.5}px` }}></div>
                        <div className="h-2 rounded bg-primary/60" style={{ width: `${stat.val}px` }}></div>
                      </div>
                      {/* Decorative chart line */}
                      <div className="absolute bottom-0 left-0 right-0 h-10 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMjAiPjxwYXRoIGQ9Ik0wLDIwIEwxMCwxNSBMMjAsMTggTDMwLDEwIEw0MCwxMiBMNTAsNSBMNjAsOCBMNzAsMiBMODAsNiBMOTAsMCBMMTAwLDEwIEwxMDAsMjAgWiIgZmlsbD0iY3VycmVudENvbG9yIi8+PC9zdmc+')] bg-cover bg-no-repeat bg-bottom text-primary"></div>
                    </div>
                  ))}
                </div>
                
                {/* Chart Area */}
                <div className="flex-1 rounded-xl bg-card/40 border border-border/40 p-5 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-4 rounded bg-foreground/20 w-32"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 rounded bg-muted/50"></div>
                      <div className="h-6 w-16 rounded bg-muted/50"></div>
                    </div>
                  </div>
                  <div className="flex-1 flex items-end gap-2 px-2">
                    {[30, 45, 25, 60, 40, 75, 50, 85, 55, 65, 45, 90, 70, 80].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/10 rounded-t-sm relative group">
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/40 to-primary/20 rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Mockup Floating */}
          <div className="md:absolute md:-right-8 md:-bottom-16 w-full max-w-[320px] mx-auto z-20 md:w-80 transform md:rotate-[-5deg] transition-transform hover:rotate-0 duration-500">
            <div className="animate-float">
              <PhoneMockup />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

