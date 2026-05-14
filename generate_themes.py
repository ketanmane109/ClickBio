import json

free_themes = {
    "minimal-white": {
        "bg": "bg-white", "fg": "text-zinc-900",
        "btn": "bg-white text-zinc-900 border border-zinc-200 shadow-sm",
        "btnHover": "hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-zinc-900 text-white shadow-md hover:bg-black hover:shadow-lg hover:scale-[1.02]"
    },
    "soft-sky": {
        "bg": "bg-sky-50/50", "fg": "text-sky-950",
        "btn": "bg-white text-sky-900 border border-sky-100 shadow-sm",
        "btnHover": "hover:bg-sky-50 hover:border-sky-200 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-sky-600 text-white shadow-md hover:bg-sky-700 hover:shadow-lg hover:scale-[1.02]"
    },
    "mint-clean": {
        "bg": "bg-emerald-50/50", "fg": "text-emerald-950",
        "btn": "bg-white text-emerald-900 border border-emerald-100 shadow-sm",
        "btnHover": "hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-emerald-600 text-white shadow-md hover:bg-emerald-700 hover:shadow-lg hover:scale-[1.02]"
    },
    "warm-sunset": {
        "bg": "bg-orange-50/50", "fg": "text-orange-950",
        "btn": "bg-white text-orange-900 border border-orange-100 shadow-sm",
        "btnHover": "hover:bg-orange-50 hover:border-orange-200 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-orange-500 text-white shadow-md hover:bg-orange-600 hover:shadow-lg hover:scale-[1.02]"
    },
    "simple-dark": {
        "bg": "bg-zinc-950", "fg": "text-zinc-50",
        "btn": "bg-zinc-900 text-zinc-100 border border-zinc-800",
        "btnHover": "hover:bg-zinc-800 hover:border-zinc-700 hover:scale-[1.02]",
        "featured": "bg-white text-zinc-950 shadow-md hover:bg-zinc-200 hover:scale-[1.02]"
    }
}

standard_themes = {
    "ocean-creator": {
        "bg": "bg-gradient-to-br from-blue-900 to-cyan-900", "fg": "text-cyan-50",
        "btn": "bg-white/10 text-cyan-50 backdrop-blur-md border border-white/20 shadow-sm",
        "btnHover": "hover:bg-white/20 hover:border-white/30 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:bg-cyan-400 hover:scale-[1.02]"
    },
    "lavender-haze": {
        "bg": "bg-fuchsia-50/50", "fg": "text-fuchsia-950",
        "btn": "bg-white/80 text-fuchsia-900 backdrop-blur-sm border border-fuchsia-100 shadow-sm",
        "btnHover": "hover:bg-white hover:border-fuchsia-200 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-fuchsia-500 text-white shadow-md hover:bg-fuchsia-600 hover:shadow-lg hover:scale-[1.02]"
    },
    "glass-creator": {
        "bg": "bg-gradient-to-tr from-indigo-100 via-purple-50 to-teal-50", "fg": "text-indigo-950",
        "btn": "bg-white/40 text-indigo-900 backdrop-blur-md border border-white/60 shadow-sm",
        "btnHover": "hover:bg-white/60 hover:border-white/80 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-indigo-600/90 text-white backdrop-blur-md hover:bg-indigo-600 hover:shadow-lg hover:scale-[1.02]"
    },
    "midnight-blue": {
        "bg": "bg-slate-950", "fg": "text-slate-100",
        "btn": "bg-slate-900 text-slate-100 border border-slate-800 shadow-sm",
        "btnHover": "hover:bg-slate-800 hover:border-slate-700 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-blue-600 text-white shadow-md hover:bg-blue-500 hover:shadow-lg hover:scale-[1.02]"
    },
    "peach-gradient": {
        "bg": "bg-gradient-to-br from-rose-100 to-teal-50", "fg": "text-rose-950",
        "btn": "bg-white/60 text-rose-900 backdrop-blur-sm border border-white/80 shadow-sm",
        "btnHover": "hover:bg-white/80 hover:border-white hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-rose-500 text-white shadow-md hover:bg-rose-600 hover:shadow-lg hover:scale-[1.02]"
    },
    "aesthetic-beige": {
        "bg": "bg-[#FDFBF7]", "fg": "text-[#4A443A]",
        "btn": "bg-white text-[#4A443A] border border-[#EBE7DF] shadow-sm",
        "btnHover": "hover:bg-[#F9F7F1] hover:border-[#DCD7CD] hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-[#8C7A6B] text-white shadow-md hover:bg-[#7A6B5C] hover:shadow-lg hover:scale-[1.02]"
    },
    "creator-carbon": {
        "bg": "bg-[#111111]", "fg": "text-zinc-200",
        "btn": "bg-[#1a1a1a] text-zinc-200 border border-zinc-800 shadow-sm",
        "btnHover": "hover:bg-[#222222] hover:border-zinc-700 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-zinc-100 text-black shadow-lg hover:bg-white hover:scale-[1.02]"
    },
    "frost-white": {
        "bg": "bg-slate-50", "fg": "text-slate-800",
        "btn": "bg-white text-slate-800 border border-slate-200 shadow-sm",
        "btnHover": "hover:bg-slate-100 hover:border-slate-300 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-slate-900 text-white shadow-md hover:bg-black hover:shadow-lg hover:scale-[1.02]"
    },
    "cyber-violet": {
        "bg": "bg-indigo-950", "fg": "text-indigo-50",
        "btn": "bg-indigo-900/40 text-indigo-50 border border-indigo-500/30",
        "btnHover": "hover:bg-indigo-800/60 hover:border-indigo-400/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-[1.02]",
        "featured": "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:bg-indigo-400 hover:scale-[1.02]"
    },
    "soft-gold": {
        "bg": "bg-amber-50/50", "fg": "text-amber-950",
        "btn": "bg-white text-amber-950 border border-amber-200 shadow-sm",
        "btnHover": "hover:bg-amber-100/50 hover:border-amber-300 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-amber-600 text-white shadow-md hover:bg-amber-700 hover:shadow-lg hover:scale-[1.02]"
    }
}

pro_themes = {
    # LUXURY LIGHT & DARK
    "pearl-white": {
        "bg": "bg-[#FAFAFA]", "fg": "text-[#333333]",
        "btn": "bg-white text-[#333333] border border-[#EEEEEE] shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl",
        "btnHover": "hover:bg-[#F5F5F5] hover:border-[#DDDDDD] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:scale-[1.02]",
        "featured": "bg-[#222222] text-white shadow-lg hover:bg-black hover:scale-[1.02] rounded-2xl"
    },
    "black-diamond": {
        "bg": "bg-black", "fg": "text-zinc-200",
        "btn": "bg-zinc-900 text-zinc-200 border border-zinc-800 shadow-[0_0_10px_rgba(255,255,255,0.02)]",
        "btnHover": "hover:bg-zinc-800 hover:border-zinc-600 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:scale-[1.02]",
        "featured": "bg-gradient-to-r from-zinc-300 to-zinc-100 text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
    },
    "royal-gold": {
        "bg": "bg-zinc-950", "fg": "text-yellow-100",
        "btn": "bg-zinc-900/80 text-yellow-100 border border-yellow-900/30",
        "btnHover": "hover:bg-zinc-800 hover:border-yellow-600/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:scale-[1.02]",
        "featured": "bg-gradient-to-r from-yellow-600 to-yellow-400 text-black shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:scale-[1.02]"
    },
    "platinum-glass": {
        "bg": "bg-gradient-to-br from-slate-200 to-slate-400", "fg": "text-slate-900",
        "btn": "bg-white/40 text-slate-900 backdrop-blur-md border border-white/60 shadow-lg",
        "btnHover": "hover:bg-white/60 hover:border-white/80 hover:shadow-xl hover:scale-[1.02]",
        "featured": "bg-slate-900/90 text-white backdrop-blur-md shadow-xl hover:bg-slate-900 hover:scale-[1.02]"
    },
    "ivory-elegance": {
        "bg": "bg-[#FFFFF0]", "fg": "text-[#4A4A4A]",
        "btn": "bg-[#FAFAD2]/30 text-[#4A4A4A] border border-[#EAEAA0]/50 shadow-sm rounded-none",
        "btnHover": "hover:bg-[#FAFAD2]/60 hover:border-[#EAEAA0] hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-[#8B7D6B] text-white shadow-md hover:bg-[#6E6355] hover:scale-[1.02] rounded-none"
    },
    # CREATOR / SOCIAL
    "tiktok-creator": {
        "bg": "bg-[#000000]", "fg": "text-white",
        "btn": "bg-[#111111] text-white border-2 border-transparent shadow-[4px_4px_0_#00f2fe,-4px_-4px_0_#fe0979]",
        "btnHover": "hover:bg-[#222222] hover:scale-[1.02]",
        "featured": "bg-white text-black font-bold shadow-[4px_4px_0_#00f2fe,-4px_-4px_0_#fe0979] hover:scale-[1.02]"
    },
    "youtube-creator": {
        "bg": "bg-[#0f0f0f]", "fg": "text-zinc-100",
        "btn": "bg-[#272727] text-zinc-100 border border-transparent shadow-sm",
        "btnHover": "hover:bg-[#3f3f3f] hover:scale-[1.02]",
        "featured": "bg-[#FF0000] text-white shadow-[0_0_20px_rgba(255,0,0,0.3)] hover:bg-[#cc0000] hover:scale-[1.02]"
    },
    "instagram-elite": {
        "bg": "bg-[#000000]", "fg": "text-zinc-100",
        "btn": "bg-[#121212] text-zinc-100 border border-zinc-800",
        "btnHover": "hover:bg-[#262626] hover:border-zinc-700 hover:scale-[1.02]",
        "featured": "bg-gradient-to-tr from-[#fd5949] to-[#d6249f] text-white shadow-[0_0_20px_rgba(214,36,159,0.3)] hover:scale-[1.02]"
    },
    "gamer-stream": {
        "bg": "bg-[#0e0e10]", "fg": "text-purple-50",
        "btn": "bg-[#18181b] text-purple-50 border border-[#2f2f35]",
        "btnHover": "hover:bg-[#26262c] hover:border-purple-500/50 hover:scale-[1.02]",
        "featured": "bg-[#9146FF] text-white shadow-[0_0_20px_rgba(145,70,255,0.4)] hover:bg-[#772ce8] hover:scale-[1.02]"
    },
    "podcast-studio": {
        "bg": "bg-[#120a05]", "fg": "text-orange-50",
        "btn": "bg-[#1f120a] text-orange-50 border border-orange-900/30",
        "btnHover": "hover:bg-[#2e1a0f] hover:border-orange-800/50 hover:scale-[1.02]",
        "featured": "bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:bg-orange-500 hover:scale-[1.02]"
    },
    "artist-mode": {
        "bg": "bg-[#FDFBF7]", "fg": "text-[#2A2A2A]",
        "btn": "bg-transparent text-[#2A2A2A] border-2 border-[#2A2A2A] shadow-[4px_4px_0_#2A2A2A] rounded-none",
        "btnHover": "hover:bg-[#2A2A2A] hover:text-[#FDFBF7] hover:shadow-[2px_2px_0_#2A2A2A] hover:translate-x-[2px] hover:translate-y-[2px]",
        "featured": "bg-[#E63946] text-white border-2 border-[#2A2A2A] shadow-[4px_4px_0_#2A2A2A] hover:shadow-[2px_2px_0_#2A2A2A] hover:translate-x-[2px] hover:translate-y-[2px] rounded-none"
    },
    # PASTEL / LIGHT
    "blush-pink": {
        "bg": "bg-[#FFF0F5]", "fg": "text-[#5A3A4A]",
        "btn": "bg-white text-[#5A3A4A] border border-[#FADADD] shadow-sm",
        "btnHover": "hover:bg-[#FADADD]/30 hover:border-[#FADADD] hover:scale-[1.02]",
        "featured": "bg-[#FFB6C1] text-[#5A3A4A] shadow-md hover:bg-[#FFA07A] hover:scale-[1.02]"
    },
    "mint-breeze": {
        "bg": "bg-[#F0FFF0]", "fg": "text-[#2E4A35]",
        "btn": "bg-white text-[#2E4A35] border border-[#C1E1C1] shadow-sm",
        "btnHover": "hover:bg-[#E0F4E0] hover:border-[#A0D8A0] hover:scale-[1.02]",
        "featured": "bg-[#98FB98] text-[#2E4A35] shadow-md hover:bg-[#8FBC8F] hover:scale-[1.02]"
    },
    "lemon-chiffon": {
        "bg": "bg-[#FFFACD]", "fg": "text-[#5C5016]",
        "btn": "bg-white text-[#5C5016] border border-[#EEE8AA] shadow-sm",
        "btnHover": "hover:bg-[#FFF8DC] hover:border-[#BDB76B] hover:scale-[1.02]",
        "featured": "bg-[#F0E68C] text-[#5C5016] shadow-md hover:bg-[#DAA520] hover:scale-[1.02]"
    },
    "lilac-dream": {
        "bg": "bg-[#F8F8FF]", "fg": "text-[#4B0082]",
        "btn": "bg-white text-[#4B0082] border border-[#E6E6FA] shadow-sm",
        "btnHover": "hover:bg-[#E6E6FA]/50 hover:border-[#D8BFD8] hover:scale-[1.02]",
        "featured": "bg-[#9370DB] text-white shadow-md hover:bg-[#8A2BE2] hover:scale-[1.02]"
    },
    # GLASSMORPHISM (BALANCED)
    "frost-glass": {
        "bg": "bg-[url('https://images.unsplash.com/photo-1551008475-4533d141425b?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-slate-900/50 before:backdrop-blur-xl", "fg": "text-slate-50",
        "btn": "bg-white/10 text-slate-50 backdrop-blur-md border border-white/20 shadow-lg",
        "btnHover": "hover:bg-white/20 hover:border-white/30 hover:scale-[1.02]",
        "featured": "bg-white/25 text-white backdrop-blur-xl border border-white/40 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-white/35 hover:scale-[1.02]"
    },
    "crystal-blur": {
        "bg": "bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-black/50 before:backdrop-blur-2xl", "fg": "text-white",
        "btn": "bg-white/10 text-white backdrop-blur-xl border border-white/20 shadow-xl",
        "btnHover": "hover:bg-white/20 hover:border-white/30 hover:scale-[1.02]",
        "featured": "bg-white/30 text-white backdrop-blur-2xl border border-white/50 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:bg-white/40 hover:scale-[1.02]"
    },
    "aurora-glass": {
        "bg": "bg-[url('https://images.unsplash.com/photo-1531366936337-7759a6857f35?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-black/60 before:backdrop-blur-xl", "fg": "text-emerald-50",
        "btn": "bg-emerald-900/30 text-emerald-50 backdrop-blur-md border border-emerald-500/20 shadow-lg",
        "btnHover": "hover:bg-emerald-800/40 hover:border-emerald-400/40 hover:scale-[1.02]",
        "featured": "bg-emerald-500/80 text-white backdrop-blur-md shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:bg-emerald-400/90 hover:scale-[1.02]"
    },
    "liquid-glass": {
        "bg": "bg-[url('https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-black/60 before:backdrop-blur-xl", "fg": "text-blue-50",
        "btn": "bg-blue-900/30 text-blue-50 backdrop-blur-md border border-blue-500/20 shadow-lg",
        "btnHover": "hover:bg-blue-800/40 hover:border-blue-400/40 hover:scale-[1.02]",
        "featured": "bg-blue-500/80 text-white backdrop-blur-md shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:bg-blue-400/90 hover:scale-[1.02]"
    },
    # MODERN MINIMAL
    "minimal-pro": {
        "bg": "bg-white", "fg": "text-black",
        "btn": "bg-white text-black border-2 border-black font-bold uppercase tracking-wider rounded-none",
        "btnHover": "hover:bg-black hover:text-white hover:scale-[1.02]",
        "featured": "bg-black text-white font-bold uppercase tracking-wider shadow-lg hover:bg-zinc-800 hover:scale-[1.02] rounded-none"
    },
    "soft-neutral": {
        "bg": "bg-[#f5f5f0]", "fg": "text-[#4a4a45]",
        "btn": "bg-[#ebebe6] text-[#4a4a45] border border-[#deded9] shadow-sm",
        "btnHover": "hover:bg-[#e0e0db] hover:border-[#d0d0cb] hover:scale-[1.02]",
        "featured": "bg-[#7a7a73] text-white shadow-md hover:bg-[#6a6a63] hover:scale-[1.02]"
    },
    "mono-space": {
        "bg": "bg-zinc-100", "fg": "text-zinc-900 font-mono",
        "btn": "bg-zinc-200 text-zinc-900 border border-zinc-400 font-mono rounded-none",
        "btnHover": "hover:bg-zinc-300 hover:border-zinc-500 hover:scale-[1.02]",
        "featured": "bg-zinc-900 text-zinc-100 font-mono shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[2px_2px_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] rounded-none"
    },
    "zen-white": {
        "bg": "bg-[#fafafa]", "fg": "text-zinc-500",
        "btn": "bg-white text-zinc-600 border border-zinc-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] rounded-3xl",
        "btnHover": "hover:shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:text-zinc-900 hover:scale-[1.02]",
        "featured": "bg-zinc-100 text-zinc-900 border border-zinc-200 shadow-[0_5px_15px_rgba(0,0,0,0.05)] rounded-3xl hover:bg-zinc-200 hover:scale-[1.02]"
    },
    "slate-minimal": {
        "bg": "bg-slate-100", "fg": "text-slate-800",
        "btn": "bg-slate-200/50 text-slate-800 border border-slate-300 shadow-sm",
        "btnHover": "hover:bg-slate-200 hover:border-slate-400 hover:scale-[1.02]",
        "featured": "bg-slate-800 text-white shadow-md hover:bg-slate-700 hover:scale-[1.02]"
    },
    # CYBER / FUTURISTIC
    "neon-matrix": {
        "bg": "bg-black", "fg": "text-emerald-400 font-mono",
        "btn": "bg-black text-emerald-400 border border-emerald-900 rounded-none",
        "btnHover": "hover:bg-emerald-950 hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:scale-[1.02]",
        "featured": "bg-emerald-500 text-black shadow-[0_0_25px_rgba(16,185,129,0.6)] hover:bg-emerald-400 hover:scale-[1.02] rounded-none"
    },
    "cyberpunk-x": {
        "bg": "bg-[#080414]", "fg": "text-cyan-400",
        "btn": "bg-[#100826] text-cyan-400 border border-fuchsia-800",
        "btnHover": "hover:bg-[#1a0c3d] hover:border-fuchsia-500 hover:shadow-[0_0_15px_rgba(217,70,239,0.4)] hover:scale-[1.02]",
        "featured": "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-bold shadow-[0_0_25px_rgba(34,211,238,0.5)] hover:scale-[1.02]"
    },
    "quantum-glow": {
        "bg": "bg-[#0a0014]", "fg": "text-fuchsia-100",
        "btn": "bg-[#1a0033] text-fuchsia-100 border border-fuchsia-900/50",
        "btnHover": "hover:bg-[#2a004d] hover:border-fuchsia-600/60 hover:shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:scale-[1.02]",
        "featured": "bg-fuchsia-600 text-white shadow-[0_0_30px_rgba(217,70,239,0.6)] hover:bg-fuchsia-500 hover:scale-[1.02]"
    },
    # GRADIENT PREMIUM
    "aurora-wave": {
        "bg": "bg-gradient-to-br from-[#004e92] to-[#000428]", "fg": "text-blue-50",
        "btn": "bg-white/10 text-blue-50 backdrop-blur-md border border-white/20",
        "btnHover": "hover:bg-white/20 hover:border-white/30 hover:scale-[1.02]",
        "featured": "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-[1.02]"
    },
    "cosmic-gradient": {
        "bg": "bg-gradient-to-tr from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]", "fg": "text-orange-50",
        "btn": "bg-white/15 text-orange-50 backdrop-blur-md border border-white/20 shadow-lg",
        "btnHover": "hover:bg-white/25 hover:border-white/30 hover:scale-[1.02]",
        "featured": "bg-white/30 text-white backdrop-blur-xl border border-white/40 shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:bg-white/40 hover:scale-[1.02]"
    },
    "purple-horizon": {
        "bg": "bg-gradient-to-b from-[#4e54c8] to-[#8f94fb]", "fg": "text-indigo-50",
        "btn": "bg-white/10 text-indigo-50 backdrop-blur-md border border-white/20",
        "btnHover": "hover:bg-white/20 hover:border-white/30 hover:scale-[1.02]",
        "featured": "bg-white text-[#4e54c8] shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:bg-indigo-50 hover:scale-[1.02]"
    },
    "galaxy-flow": {
        "bg": "bg-gradient-to-br from-[#141e30] to-[#243b55]", "fg": "text-blue-50",
        "btn": "bg-[#2a4365] text-blue-50 border border-[#3182ce]/30 shadow-md",
        "btnHover": "hover:bg-[#2c5282] hover:border-[#3182ce]/60 hover:scale-[1.02]",
        "featured": "bg-gradient-to-r from-[#3182ce] to-[#63b3ed] text-white shadow-[0_0_20px_rgba(49,130,206,0.4)] hover:scale-[1.02]"
    },
    "dreamwave": {
        "bg": "bg-gradient-to-br from-[#ff9a9e] via-[#fecfef] to-[#ffc3a0]", "fg": "text-rose-950",
        "btn": "bg-white/40 text-rose-950 backdrop-blur-sm border border-white/60 shadow-sm",
        "btnHover": "hover:bg-white/60 hover:border-white/80 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)] hover:bg-rose-600 hover:scale-[1.02]"
    },
    "sunset-vibes": {
        "bg": "bg-gradient-to-br from-[#f2709c] to-[#ff9472]", "fg": "text-white",
        "btn": "bg-white/20 text-white backdrop-blur-sm border border-white/30 shadow-sm",
        "btnHover": "hover:bg-white/30 hover:border-white/50 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-white text-[#f2709c] font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:bg-gray-50 hover:scale-[1.02]"
    },
    "ocean-breeze": {
        "bg": "bg-gradient-to-br from-[#4facfe] to-[#00f2fe]", "fg": "text-white",
        "btn": "bg-white/20 text-white backdrop-blur-sm border border-white/30 shadow-sm",
        "btnHover": "hover:bg-white/30 hover:border-white/50 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-white text-[#4facfe] font-bold shadow-[0_0_15px_rgba(255,255,255,0.4)] hover:bg-gray-50 hover:scale-[1.02]"
    },
    "peach-glow": {
        "bg": "bg-gradient-to-br from-[#FFDAB9] to-[#F08080]", "fg": "text-[#4A0E0E]",
        "btn": "bg-white/40 text-[#4A0E0E] backdrop-blur-sm border border-white/50 shadow-sm",
        "btnHover": "hover:bg-white/60 hover:border-white/80 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-[#CD5C5C] text-white shadow-[0_0_15px_rgba(205,92,92,0.4)] hover:bg-[#BC4A4A] hover:scale-[1.02]"
    }
}

extra_fallbacks = {
    "minimal-light": {
        "bg": "bg-white", "fg": "text-zinc-900",
        "btn": "bg-white text-zinc-900 border border-zinc-200 shadow-sm",
        "btnHover": "hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-zinc-900 text-white shadow-md hover:bg-black hover:shadow-lg hover:scale-[1.02]"
    },
    "dark": {
        "bg": "bg-[#0f172a]", "fg": "text-white",
        "btn": "bg-slate-800 text-white border border-slate-700 shadow-sm",
        "btnHover": "hover:bg-slate-700 hover:border-slate-600 hover:scale-[1.02]",
        "featured": "bg-white text-slate-900 shadow-lg hover:bg-slate-100 hover:scale-[1.02]"
    },
    "light": {
        "bg": "bg-white", "fg": "text-zinc-900",
        "btn": "bg-white text-zinc-900 border border-zinc-200 shadow-sm",
        "btnHover": "hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-zinc-900 text-white shadow-md hover:bg-black hover:shadow-lg hover:scale-[1.02]"
    },
    "minimal": {
        "bg": "bg-white", "fg": "text-zinc-900",
        "btn": "bg-white text-zinc-900 border border-zinc-200 shadow-sm",
        "btnHover": "hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-zinc-900 text-white shadow-md hover:bg-black hover:shadow-lg hover:scale-[1.02]"
    },
    "gradient": {
        "bg": "bg-gradient-to-br from-rose-100 to-teal-50", "fg": "text-rose-950",
        "btn": "bg-white/60 text-rose-900 backdrop-blur-sm border border-white/80 shadow-sm",
        "btnHover": "hover:bg-white/80 hover:border-white hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-rose-500 text-white shadow-md hover:bg-rose-600 hover:shadow-lg hover:scale-[1.02]"
    },
    "glass": {
        "bg": "bg-gradient-to-tr from-indigo-100 via-purple-50 to-teal-50", "fg": "text-indigo-950",
        "btn": "bg-white/40 text-indigo-900 backdrop-blur-md border border-white/60 shadow-sm",
        "btnHover": "hover:bg-white/60 hover:border-white/80 hover:shadow-md hover:scale-[1.02]",
        "featured": "bg-indigo-600/90 text-white backdrop-blur-md hover:bg-indigo-600 hover:shadow-lg hover:scale-[1.02]"
    }
}

# Insert minimal-light at the beginning of the generated record
all_themes = {"minimal-light": extra_fallbacks["minimal-light"], **free_themes, **standard_themes, **pro_themes, **extra_fallbacks}

with open("c:\\Users\\MCS\\OneDrive\\Desktop\\clickbio\\biostack-studio\\src\\utils\\themes.ts", "w") as f:
    f.write("export const themeStyles: Record<string, { bg: string; fg: string; btn: string; btnHover: string; featured: string }> = {\n")
    for name, styles in all_themes.items():
        if name in ["dark", "light", "minimal", "gradient", "glass"]:
            f.write(f'\n  // Add Explicit Legacy/System Fallbacks\n')
        f.write(f'  "{name}": {{\n')
        for k, v in styles.items():
            f.write(f'    {k}: "{v}",\n')
        f.write('  },\n')
    f.write("};\n")
    
    f.write("\nexport const FREE_THEMES = " + json.dumps(list(free_themes.keys())) + ";\n")
    f.write("export const STANDARD_THEMES = " + json.dumps(list(standard_themes.keys())) + ";\n")
    f.write("export const PRO_THEMES = " + json.dumps(list(pro_themes.keys())) + ";\n")

