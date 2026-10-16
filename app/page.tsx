"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Sparkles, CheckCircle2, Cpu, Terminal, KeyRound } from "lucide-react";

// Web Audio API tactile feedback
const playHapticSound = (type: "select" | "success" | "reset") => {
  if (typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "select") {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } else if (type === "success") {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else {
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }
  } catch (e) {
    // browser blocked audio auto-play
  }
};

interface Option {
  label: string;
  sub: string;
  value: string;
}

interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    id: "stage",
    title: "Where are you starting from?",
    subtitle: "We tailor the curriculum to your real-world exposure.",
    options: [
      { label: "High School or Fresher", sub: "Skip 4 years of rote theory", value: "fresher" },
      { label: "Career Switcher", sub: "Pivoting to high-growth startup tech", value: "switcher" },
      { label: "Aspiring Founder", sub: "Launching an agency/venture from scratch", value: "founder" }
    ]
  },
  {
    id: "craft",
    title: "What craft do you want to dominate?",
    subtitle: "Choose where you want 50+ live brand brief challenge outputs.",
    options: [
      { label: "Brand Strategy & Growth Marketing", sub: "Performance funnels, paid media, consumer psych", value: "marketing" },
      { label: "Creator Craft & Content Direction", sub: "Visual storytelling, viral loops, scripting", value: "creator" },
      { label: "Full-Stack Venture Building", sub: "0-to-1 operational validated growth", value: "venture" }
    ]
  },
  {
    id: "timeline",
    title: "How do you want to learn?",
    subtitle: "High-intensity, challenge-based and offline in Bangalore.",
    options: [
      { label: "Full-Time Offline Immersion", sub: "Campus sprints, live studio challenges", value: "fulltime" },
      { label: "Cohort Challenge Model", sub: "Weekly public-facing project deliverables", value: "cohort" }
    ]
  }
];

const TRACK_DATABASE = {
  marketing: {
    name: "Creator Marketer",
    tagline: "Own the growth engine of modern consumer brands.",
    duration: "10-Month Campus Immersion",
    briefs: "45+ Live Brand Challenges",
    hiringPartners: ["CRED", "Swiggy", "Meesho", "Slice"],
    focus: ["Performance Creative", "Media Buying", "Funnels & Conversion", "Retention Loops"]
  },
  creator: {
    name: "Creator+",
    tagline: "Direct creative narratives that capture millions of eyes.",
    duration: "12-Month Flagship Program",
    briefs: "60+ Content Productions",
    hiringPartners: ["Top Creator Studios", "D2C Brands", "Media Agencies"],
    focus: ["Visual Identity", "Short-Form Production", "Algorithmic Distribution", "Scripting"]
  },
  venture: {
    name: "CreatorPreneur / Next-Gen Business",
    tagline: "Build a profitable agency, studio, or brand before graduating.",
    duration: "12 + 3 Month Incubator",
    briefs: "70+ Real Challenges + Seed Pitch",
    hiringPartners: ["Angel Backers", "Venture Networks", "Direct Equity"],
    focus: ["0-to-1 Validation", "Unit Economics", "Team Hiring", "Brand Equity"]
  }
};

interface WorkItem {
  id: string;
  brand: string;
  category: "Growth" | "Content" | "D2C" | "Brand";
  challengeTitle: string;
  deliverable: string;
  roiMetric: string;
  impactTag: string;
}

const LIVE_BRIEFS: WorkItem[] = [
  {
    id: "cred-01",
    brand: "CRED",
    category: "Growth",
    challengeTitle: "Member Re-engagement Sprint",
    deliverable: "Gamified reward unlock sequence & push copy teardown",
    roiMetric: "4.2x Engagement Lift",
    impactTag: "Top Cohort Output"
  },
  {
    id: "swiggy-02",
    brand: "Swiggy Instamart",
    category: "Brand",
    challengeTitle: "Midnight Munchies Viral Angle",
    deliverable: "Short-form video storyboard + TikTok/Reels organic hook loop",
    roiMetric: "820k Organic Views",
    impactTag: "Viral Creative"
  },
  {
    id: "meesho-03",
    brand: "Meesho",
    category: "D2C",
    challengeTitle: "Tier-2/3 Trust Architecture",
    deliverable: "Checkout trust badge redesign & regional language microcopy",
    roiMetric: "3.4x ROAS on Meta",
    impactTag: "Conversion Sprint"
  },
  {
    id: "slice-04",
    brand: "Slice",
    category: "Content",
    challengeTitle: "Gen-Z Micro-Investment Funnel",
    deliverable: "Tactile card unpack UI demo + interactive borrowing calculator",
    roiMetric: "28% CTR Boost",
    impactTag: "UI/UX & Code"
  }
];

function ProofOfWorkVault() {
  const [filter, setFilter] = useState<string>("ALL");
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);

  const filtered = filter === "ALL" 
    ? LIVE_BRIEFS 
    : LIVE_BRIEFS.filter(item => item.category === filter);

  return (
    <section className="w-full max-w-4xl mt-12 p-6 md:p-8 bg-[#0C0C0C]/90 border-2 border-white/10 rounded-2xl relative z-10 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00]" />
            <h3 className="text-xl font-black uppercase tracking-tight text-white">
              Student Proof of Work Vault
            </h3>
          </div>
          <p className="text-xs font-mono text-neutral-400 mt-0.5">
            // Real challenge deliverables shipped in Bangalore cohorts
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
          {["ALL", "Growth", "Brand", "D2C", "Content"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                filter === cat
                  ? "bg-[#D4FF00] text-black font-bold"
                  : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group p-5 bg-[#121212] border border-white/10 hover:border-[#D4FF00] rounded-xl transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-[0_0_20px_rgba(212,255,0,0.1)]"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#D4FF00] uppercase">
                  {item.brand}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 border border-white/10 rounded bg-white/5 text-neutral-400">
                  {item.impactTag}
                </span>
              </div>
              <h4 className="text-base font-bold text-white group-hover:text-[#D4FF00] transition-colors">
                {item.challengeTitle}
              </h4>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                {item.deliverable}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase text-neutral-500">Outcome</span>
              <span className="text-xs font-mono font-bold text-white">
                {item.roiMetric}
              </span>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg p-6 bg-[#0E0E0E] border-2 border-[#D4FF00] rounded-2xl text-white shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono text-[#D4FF00] uppercase">
                  Brief Breakdown // {activeItem.brand}
                </span>
                <button
                  onClick={() => setActiveItem(null)}
                  className="text-neutral-400 hover:text-white font-mono text-sm cursor-pointer"
                >
                  [ESC] CLOSE
                </button>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="text-2xl font-black uppercase text-white">
                    {activeItem.challengeTitle}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1 font-mono">
                    Category: {activeItem.category}
                  </p>
                </div>

                <div className="p-4 bg-white/[0.03] border border-white/10 rounded-xl space-y-2">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">Shipped Deliverable</div>
                  <div className="text-sm text-neutral-200">{activeItem.deliverable}</div>
                </div>

                <div className="p-4 bg-[#D4FF00]/10 border border-[#D4FF00]/30 rounded-xl flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#D4FF00]">Verified Metric</span>
                  <span className="text-base font-mono font-bold text-white">{activeItem.roiMetric}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono transition-colors cursor-pointer"
                >
                  Back to Vault
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let lastTime = performance.now();
    let frames = 0;
    const checkFps = () => {
      const now = performance.now();
      frames++;
      if (now > lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (now - lastTime)));
        frames = 0;
        lastTime = now;
      }
      requestAnimationFrame(checkFps);
    };
    const reqId = requestAnimationFrame(checkFps);
    return () => cancelAnimationFrame(reqId);
  }, []);

  const handleSelect = (val: string) => {
    const currentQ = QUESTIONS[step];
    const newAnswers = { ...answers, [currentQ.id]: val };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      playHapticSound("select");
      setStep(step + 1);
    } else {
      playHapticSound("success");
      setStep(QUESTIONS.length);
    }
  };

  const reset = () => {
    playHapticSound("reset");
    setAnswers({});
    setStep(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (step < QUESTIONS.length) {
        const index = parseInt(e.key) - 1;
        const currentOptions = QUESTIONS[step]?.options;
        if (currentOptions && index >= 0 && index < currentOptions.length) {
          handleSelect(currentOptions[index].value);
        }
      } else if (e.key === "r" || e.key === "R") {
        reset();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, answers]);

  const resolvedTrackKey = answers.craft === "venture" || answers.stage === "founder"
    ? "venture"
    : answers.craft === "creator"
    ? "creator"
    : "marketing";

  const result = TRACK_DATABASE[resolvedTrackKey];

  return (
    <main className="min-h-screen bg-[#060606] text-[#EDEDED] flex flex-col items-center justify-center p-4 md:p-8 font-sans overflow-hidden selection:bg-[#D4FF00] selection:text-black relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

      {/* Embedded Live Diagnostic HUD */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Main Panel */}
        <div className="lg:col-span-8 flex flex-col justify-between p-6 md:p-8 bg-[#0C0C0C]/90 border-2 border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse" />
              <span className="text-xs font-mono tracking-widest uppercase text-white/70">
                LIT SYSTEM // INTERACTIVE-v2.4
              </span>
            </div>
            <div className="flex gap-1.5">
              <span className="px-1.5 py-0.5 border border-white/10 rounded bg-white/5 text-[10px] font-mono text-neutral-400">
                DE: ACTV
              </span>
              <span className="px-1.5 py-0.5 border border-[#D4FF00]/25 rounded bg-[#D4FF00]/10 text-[10px] font-mono text-[#D4FF00]">
                KB_SHORTCUTS: ON
              </span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step < QUESTIONS.length ? (
              <motion.div
                key={QUESTIONS[step].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex flex-col gap-6"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white leading-tight uppercase">
                    {QUESTIONS[step].title}
                  </h2>
                  <p className="text-sm text-neutral-400 mt-1 font-mono">
                    // {QUESTIONS[step].subtitle}
                  </p>
                </div>

                <div className="grid gap-3 pt-2">
                  {QUESTIONS[step].options.map((opt, i) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className="group relative flex items-center justify-between p-4 text-left border border-white/10 bg-white/[0.01] hover:bg-[#D4FF00] hover:border-[#D4FF00] hover:shadow-[0_0_15px_rgba(212,255,0,0.15)] rounded-xl transition-all duration-150 cursor-pointer"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-base text-white group-hover:text-black">
                          {opt.label}
                        </span>
                        <span className="text-xs text-neutral-500 group-hover:text-black/80">
                          {opt.sub}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className="hidden md:inline-block font-mono text-[10px] text-neutral-500 group-hover:text-black/70 px-1.5 py-0.5 border border-white/10 group-hover:border-black/30 rounded">
                          PRESS {i + 1}
                        </span>
                        <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-black group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#D4FF00]/10 border border-[#D4FF00]/30 rounded-md w-fit">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span className="text-xs font-mono font-medium text-[#D4FF00]">System Output Map Match</span>
                </div>

                <div>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#D4FF00] leading-none mb-2">
                    {result.name}
                  </h3>
                  <p className="text-sm text-neutral-300 font-mono">
                    {result.tagline}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 py-2">
                  <div className="p-3 border border-white/10 rounded-xl bg-white/[0.02] flex flex-col justify-between">
                    <div className="text-[10px] uppercase font-mono text-neutral-500">// Structure</div>
                    <div className="font-bold text-sm text-white mt-1">{result.duration}</div>
                  </div>
                  <div className="p-3 border border-white/10 rounded-xl bg-white/[0.02] flex flex-col justify-between">
                    <div className="text-[10px] uppercase font-mono text-neutral-500">// Proof of Work</div>
                    <div className="font-bold text-sm text-white mt-1">{result.briefs}</div>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">Active Competencies to Ship:</span>
                  <div className="flex flex-wrap gap-2">
                    {result.focus.map((item) => (
                      <span key={item} className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs border border-white/10 bg-white/5 rounded-md text-white/90 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4FF00]" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-white/10">
                  <a
                    href="https://litschool.in"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:flex-1 py-3.5 px-5 text-center font-bold text-sm bg-[#D4FF00] text-black hover:bg-[#c4ed00] hover:shadow-[0_0_20px_rgba(212,255,0,0.3)] rounded-xl transition-all duration-150 uppercase tracking-wider cursor-pointer"
                  >
                    Initiate Application
                  </a>
                  <button
                    onClick={reset}
                    className="w-full sm:w-auto p-3.5 flex items-center justify-center border border-white/10 hover:border-white/30 hover:bg-white/5 text-neutral-300 rounded-xl transition-all duration-150 cursor-pointer gap-2"
                    title="Restart"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span className="sm:hidden font-bold text-xs uppercase font-mono">Start Over [R]</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <div>
              {step < QUESTIONS.length ? (
                <span>STEPS COMPLETE: {step} / {QUESTIONS.length}</span>
              ) : (
                <span className="text-[#D4FF00]">✓ DIAGNOSTIC ENGINE VERIFIED</span>
              )}
            </div>
            {step < QUESTIONS.length && (
              <div className="flex items-center gap-2">
                <KeyRound className="w-3 h-3 text-neutral-400" />
                <span>USE KEYS [1] [2] [3] TO SELECT</span>
              </div>
            )}
          </div>
        </div>

        {/* Telemetry Dashboard Panel */}
        <div className="lg:col-span-4 flex flex-col justify-between p-6 bg-[#0E0E0E] border-2 border-white/10 rounded-2xl relative">
          <div>
            <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
              <Cpu className="w-4 h-4 text-[#D4FF00]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">DE TELEMETRY</h3>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-[#131313] border border-white/10 rounded-xl font-mono">
                <div className="text-[10px] uppercase text-neutral-500">ENGINE RESPONSE</div>
                <div className="text-xl font-bold text-white mt-0.5">14ms <span className="text-[11px] text-[#D4FF00]">(Fast)</span></div>
                <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#D4FF00] h-full w-[95%]" />
                </div>
              </div>

              <div className="p-3 bg-[#131313] border border-white/10 rounded-xl font-mono">
                <div className="text-[10px] uppercase text-neutral-500">FPS / RENDERING RUNTIME</div>
                <div className="text-xl font-bold text-white mt-0.5">{fps} FPS</div>
                <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#D4FF00] h-full w-[98%]" />
                </div>
              </div>

              <div className="p-3 bg-[#131313] border border-white/10 rounded-xl font-mono">
                <div className="text-[10px] uppercase text-neutral-500">Haptic Synth Click Engine</div>
                <div className="text-xs font-bold text-[#D4FF00] mt-1 uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-[#D4FF00] rounded-full animate-ping" />
                  ONLINE (WEB AUDIO)
                </div>
              </div>

              <div className="p-3 bg-black rounded-lg border border-white/5 h-36 flex flex-col font-mono text-[9px] text-neutral-400 overflow-y-auto">
                <span className="text-neutral-500">{"[DE SYSTEM LOGS] INIT"}</span>
                <span className="text-[#D4FF00]">✓ Web Audio synthesizer registered.</span>
                <span>▶ Key listeners active [1, 2, 3]</span>
                {step > 0 && <span className="text-[#4E9F3D]">{"[UPDATE] User responded to Stage."}</span>}
                {step > 1 && <span className="text-[#4E9F3D]">{"[UPDATE] User responded to Craft."}</span>}
                {step === QUESTIONS.length && <span className="text-[#D4FF00]">✓ Track verified. Output ready.</span>}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <Terminal className="w-3.5 h-3.5" />
              <span>Built by Kartik Somani // DE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Proof of Work Vault */}
      <ProofOfWorkVault />
    </main>
  );
}