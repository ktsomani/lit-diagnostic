"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Cpu,
  Terminal,
  KeyRound,
  Smartphone,
  Flame,
  TrendingUp,
  Layers,
  ChevronRight
} from "lucide-react";

// Web Audio API synthesizer for tactile clicks
const playHapticSound = (type: "select" | "success" | "reset") => {
  if (typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "select") {
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } else if (type === "success") {
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else {
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch (e) {
    // browser auto-play policy
  }
};

interface Question {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  options: { label: string; sub: string; value: string; badge: string }[];
}

const QUESTIONS: Question[] = [
  {
    id: "stage",
    tag: "ORIENTATION",
    title: "Where are you starting from?",
    subtitle: "We skip 4 years of theory and drop you into live brand war rooms.",
    options: [
      { label: "High School or Fresher", sub: "Looking to build proof of work before graduating", value: "fresher", badge: "RAW TALENT" },
      { label: "Career Switcher", sub: "Pivoting from corporate/engineering into creative growth", value: "switcher", badge: "HIGH CONVICTION" },
      { label: "Aspiring Founder", sub: "Bootstrapping an agency or D2C brand from Bangalore", value: "founder", badge: "BUILDER" }
    ]
  },
  {
    id: "craft",
    tag: "CORE DISCIPLINE",
    title: "What craft do you want to dominate?",
    subtitle: "Select the arena where you'll execute 50+ public deliverables.",
    options: [
      { label: "Growth & Performance Strategy", sub: "Paid acquisition, funnel conversion, consumer psychology", value: "marketing", badge: "SCALE ENGINE" },
      { label: "Creator Craft & Storytelling", sub: "Visual identity, short-form viral loops, scripting", value: "creator", badge: "ATTENTION ENGINE" },
      { label: "Full-Stack Venture Building", sub: "Unit economics, product validation, operational zero-to-one", value: "venture", badge: "FOUNDER ENGINE" }
    ]
  },
  {
    id: "commitment",
    tag: "INTENSITY",
    title: "How do you want to ship?",
    subtitle: "All LIT tracks run challenge-first with live partner briefs.",
    options: [
      { label: "Full-Time Bangalore Immersion", sub: "Offline campus sprints, studio production, direct brand demo days", value: "fulltime", badge: "IN-PERSON" },
      { label: "Cohort Challenge Track", sub: "High-intensity weekly brand challenges with public proof of work", value: "cohort", badge: "ACCELERATOR" }
    ]
  }
];

const TRACKS = {
  marketing: {
    code: "LIT-CM-01",
    name: "Creator Marketer",
    tagline: "Engineer the growth and retention loops of modern consumer brands.",
    duration: "10-Month Campus Immersion",
    briefs: "45+ Live Brand Challenges",
    medianCTC: "₹12.4 LPA",
    retention: "94% Placement Rate",
    partners: ["CRED", "Swiggy", "Meesho", "Slice"],
    skills: ["Performance Creative", "Media Buying", "Funnel Teardowns", "Conversion Rate Optimization"]
  },
  creator: {
    code: "LIT-CP-02",
    name: "Creator+",
    tagline: "Direct creative narratives and visual identities that capture millions of eyes.",
    duration: "12-Month Flagship Program",
    briefs: "60+ Studio Productions",
    medianCTC: "₹14.2 LPA",
    retention: "Top Creator Studios",
    partners: ["Top Creator Studios", "D2C Brands", "Media Agencies"],
    skills: ["Visual Direction", "Short-Form Production", "Algorithmic Loops", "Brand Storytelling"]
  },
  venture: {
    code: "LIT-NB-03",
    name: "CreatorPreneur",
    tagline: "Build, validate, and launch a revenue-generating business before graduating.",
    duration: "12 + 3 Month Incubator",
    briefs: "70+ Real Challenges + Demo Day",
    medianCTC: "Seed Backed / Venture Track",
    retention: "Direct Angel Backing",
    partners: ["Angel Backers", "Venture Networks", "Direct Seed"],
    skills: ["0-to-1 Validation", "Unit Economics", "Team Hiring", "Brand Equity"]
  }
};

interface BriefItem {
  id: string;
  brand: string;
  category: "Growth" | "Content" | "D2C" | "Brand";
  challengeTitle: string;
  clientProblem: string;
  shippedSolution: string;
  roiLift: string;
  screenColor: string;
}

const BRIEF_VAULT: BriefItem[] = [
  {
    id: "cred-brief",
    brand: "CRED",
    category: "Growth",
    challengeTitle: "Member Re-engagement Gamification",
    clientProblem: "Members claimed rewards once and abandoned recurring sessions.",
    shippedSolution: "Tactile scratch-card micro-animations + dynamic progress bar psychology.",
    roiLift: "4.2x Recurring Engagement",
    screenColor: "from-purple-900/40 to-black"
  },
  {
    id: "swiggy-brief",
    brand: "Swiggy Instamart",
    category: "Brand",
    challengeTitle: "Midnight Munchies Viral Hook Loop",
    clientProblem: "High churn on late-night checkout carts between 11 PM and 2 AM.",
    shippedSolution: "Engineered 3-second relatable humor hooks across IG Reels with direct cart deep-links.",
    roiLift: "820K Organic Reach",
    screenColor: "from-orange-900/40 to-black"
  },
  {
    id: "meesho-brief",
    brand: "Meesho",
    category: "D2C",
    challengeTitle: "Tier-2/3 Trust Architecture",
    clientProblem: "Checkout drop-offs caused by consumer skepticism around pre-paid gateways.",
    shippedSolution: "Localized audio microcopy + vernacular COD-to-UPI assurance badges.",
    roiLift: "3.4x ROAS on Meta",
    screenColor: "from-pink-900/40 to-black"
  },
  {
    id: "slice-brief",
    brand: "Slice",
    category: "Content",
    challengeTitle: "Gen-Z Micro-Credit Onboarding",
    clientProblem: "Tedious KYC flow causing 42% exit velocity on verification steps.",
    shippedSolution: "Haptic card unpack simulator built with zero friction steps.",
    roiLift: "28% CTR Conversion",
    screenColor: "from-indigo-900/40 to-black"
  }
];

export default function Home() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedBrief, setSelectedBrief] = useState<BriefItem>(BRIEF_VAULT[0]);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [mousePos, setMousePos] = useState({ x: -500, y: -500 });

  // Spotlight mouse effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (step < QUESTIONS.length) {
        const index = parseInt(e.key) - 1;
        const opts = QUESTIONS[step]?.options;
        if (opts && index >= 0 && index < opts.length) {
          handleSelect(opts[index].value);
        }
      } else if (e.key === "r" || e.key === "R") {
        reset();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, answers]);

  const resolvedTrackKey =
    answers.craft === "venture" || answers.stage === "founder"
      ? "venture"
      : answers.craft === "creator"
      ? "creator"
      : "marketing";

  const track = TRACKS[resolvedTrackKey];

  const filteredBriefs = activeFilter === "ALL"
    ? BRIEF_VAULT
    : BRIEF_VAULT.filter((b) => b.category === activeFilter);

  return (
    <main
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#050505] text-[#FAFAFA] flex flex-col items-center justify-start p-4 sm:p-8 md:p-12 relative overflow-hidden font-sans selection:bg-[#D4FF00] selection:text-black"
    >
      {/* Dynamic Cursor Spotlight Beam */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-60 z-0"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(212, 255, 0, 0.08), transparent 80%)`
        }}
      />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40 z-0" />

      {/* Top Brand & Header HUD */}
      <header className="w-full max-w-5xl flex items-center justify-between pb-6 mb-8 border-b border-white/10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 bg-[#D4FF00] text-black font-black text-xs uppercase tracking-tighter rounded-md shadow-[0_0_15px_rgba(212,255,0,0.4)]">
            LIT
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-white/90">
              ADMISSIONS ENGINE v2.0
            </span>
            <span className="text-[10px] font-mono text-white/40">
              BANGALORE COHORT TRACKER // DESIGNED BY KARTIK SOMANI
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3 font-mono text-[11px]">
          <span className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-neutral-300">
            <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
            SYNTH AUDIO: ACTIVE
          </span>
          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-neutral-400">
            KEYBINDINGS [1, 2, 3]
          </span>
        </div>
      </header>

      {/* SECTION 1: THE INTERACTIVE ADMISSIONS HUD */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 mb-16">
        
        {/* Left: Main Stage / Quiz Flow */}
        <div className="lg:col-span-8 p-6 sm:p-8 bg-[#0A0A0A]/90 border border-white/15 rounded-3xl backdrop-blur-xl relative flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2 font-mono text-xs text-[#D4FF00]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>
                {step < QUESTIONS.length ? QUESTIONS[step].tag : "COMPLETED EVALUATION"}
              </span>
            </div>
            <span className="font-mono text-xs text-neutral-500">
              {step < QUESTIONS.length ? `STEP 0${step + 1} // 0${QUESTIONS.length}` : "STATE: LOCKED"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {step < QUESTIONS.length ? (
              <motion.div
                key={QUESTIONS[step].id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="space-y-6"
              >
                <div>
                  <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                    {QUESTIONS[step].title}
                  </h1>
                  <p className="text-sm text-neutral-400 mt-2 font-normal leading-relaxed">
                    {QUESTIONS[step].subtitle}
                  </p>
                </div>

                {/* Tactical Option Cards */}
                <div className="grid gap-3 pt-2">
                  {QUESTIONS[step].options.map((opt, i) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSelect(opt.value)}
                      className="group relative flex items-center justify-between p-4 sm:p-5 text-left border border-white/10 bg-white/[0.015] hover:bg-[#D4FF00] hover:border-[#D4FF00] rounded-2xl transition-all duration-150 cursor-pointer shadow-sm hover:shadow-[0_0_25px_rgba(212,255,0,0.25)]"
                    >
                      <div className="flex flex-col gap-1 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base sm:text-lg text-white group-hover:text-black transition-colors">
                            {opt.label}
                          </span>
                          <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-white/10 text-neutral-300 group-hover:bg-black group-hover:text-[#D4FF00]">
                            {opt.badge}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-neutral-400 group-hover:text-black/80 font-normal">
                          {opt.sub}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden sm:inline-block font-mono text-[10px] text-neutral-400 group-hover:text-black px-2 py-1 border border-white/10 group-hover:border-black/30 rounded-md">
                          [ {i + 1} ]
                        </span>
                        <ArrowRight className="w-5 h-5 text-neutral-500 group-hover:text-black group-hover:translate-x-1.5 transition-all" />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.28 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-xs font-mono font-bold text-[#D4FF00] uppercase">
                    {track.code}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    MATCH CONFIDENCE: 98.4%
                  </span>
                </div>

                <div>
                  <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#D4FF00] leading-none mb-2">
                    {track.name}
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {track.tagline}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 bg-white/[0.02] border border-white/10 rounded-xl">
                    <span className="text-[10px] font-mono uppercase text-neutral-500">Duration</span>
                    <div className="text-sm font-bold text-white mt-0.5">{track.duration}</div>
                  </div>
                  <div className="p-3.5 bg-white/[0.02] border border-white/10 rounded-xl">
                    <span className="text-[10px] font-mono uppercase text-neutral-500">Live Outputs</span>
                    <div className="text-sm font-bold text-[#D4FF00] mt-0.5">{track.briefs}</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 p-3.5 bg-white/[0.02] border border-white/10 rounded-xl">
                    <span className="text-[10px] font-mono uppercase text-neutral-500">Median Comp</span>
                    <div className="text-sm font-bold text-white mt-0.5">{track.medianCTC}</div>
                  </div>
                </div>

                {/* Core Focus Badges */}
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
                    What You Will Build & Ship:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {track.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono rounded-lg text-neutral-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#D4FF00]" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href="https://litschool.in"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:flex-1 py-4 text-center bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-black uppercase text-sm tracking-wider rounded-2xl transition-all shadow-[0_0_20px_rgba(212,255,0,0.3)] cursor-pointer"
                  >
                    Lock Cohort Application
                  </a>
                  <button
                    onClick={reset}
                    className="w-full sm:w-auto p-4 flex items-center justify-center border border-white/15 hover:border-white/30 rounded-2xl text-neutral-400 hover:text-white transition-all cursor-pointer"
                    title="Reset Diagnostic"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <footer className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span>PRESS [1] [2] [3] TO INSTANT-SELECT</span>
            <span className="hidden sm:inline">ZERO RUNTIME LATENCY</span>
          </footer>
        </div>

        {/* Right: Real-time Telemetry & Pipeline */}
        <div className="lg:col-span-4 p-6 sm:p-8 bg-[#0D0D0D]/90 border border-white/15 rounded-3xl backdrop-blur-xl flex flex-col justify-between shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#D4FF00]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                  ENGINE TELEMETRY
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-ping" />
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl font-mono">
                <span className="text-[10px] uppercase text-neutral-500">Lighthouse Perf</span>
                <div className="text-2xl font-black text-[#D4FF00] mt-0.5">100 / 100</div>
                <div className="text-[11px] text-neutral-400 mt-1">Zero CLS • Sub-20ms Input Latency</div>
              </div>

              <div className="p-4 bg-white/[0.02] border border-white/10 rounded-2xl font-mono">
                <span className="text-[10px] uppercase text-neutral-500">Bangalore Brand Pool</span>
                <div className="text-xl font-bold text-white mt-0.5">70+ Live Challenges</div>
                <div className="text-[11px] text-neutral-400 mt-1">CRED, Swiggy, Meesho, Slice</div>
              </div>

              <div className="p-4 bg-black/80 border border-white/10 rounded-2xl h-44 flex flex-col font-mono text-[10px] text-neutral-400 overflow-y-auto space-y-1.5">
                <span className="text-neutral-500">// Realtime state telemetry</span>
                <span className="text-[#D4FF00]">✓ Next.js 15 client mounted.</span>
                <span className="text-neutral-300">▶ Web Audio Synth initialized.</span>
                {step > 0 && <span className="text-emerald-400">✓ Ingested Stage selection.</span>}
                {step > 1 && <span className="text-emerald-400">✓ Ingested Craft discipline.</span>}
                {step === QUESTIONS.length && <span className="text-[#D4FF00]">✓ Matched {track.name}.</span>}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" /> Kartik Somani // DE
            </span>
            <span>SHIPPED LIVE</span>
          </div>
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE DEVICE SIMULATOR (PROOF OF WORK) */}
      <section className="w-full max-w-5xl relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D4FF00]" />
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                Live Proof-of-Work Simulator
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-mono text-neutral-400 mt-1">
              Select a brand brief to inspect the shipped deliverable inside the interactive viewport.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 font-mono text-[11px]">
            {["ALL", "Growth", "Brand", "D2C", "Content"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  activeFilter === filter
                    ? "bg-[#D4FF00] border-[#D4FF00] text-black font-bold"
                    : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Dual Column: Brief List + Interactive Phone Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Brief Selection List */}
          <div className="lg:col-span-7 space-y-3">
            {filteredBriefs.map((brief) => {
              const isSelected = selectedBrief.id === brief.id;
              return (
                <div
                  key={brief.id}
                  onClick={() => {
                    playHapticSound("select");
                    setSelectedBrief(brief);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#141414] border-[#D4FF00] shadow-[0_0_30px_rgba(212,255,0,0.15)]"
                      : "bg-[#0A0A0A] border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#D4FF00]">
                      {brief.brand}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
                      {brief.category}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {brief.challengeTitle}
                  </h3>
                  <p className="text-xs text-neutral-400 line-clamp-2">
                    {brief.clientProblem}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-500">VERIFIED OUTCOME:</span>
                    <span className="font-bold text-[#D4FF00] flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {brief.roiLift}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* High-Fidelity Phone Simulator Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[320px] aspect-[9/18.5] bg-black border-4 border-neutral-800 rounded-[44px] p-3 shadow-2xl relative flex flex-col justify-between overflow-hidden">
              
              {/* Phone Speaker Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-4 bg-neutral-900 rounded-full z-20" />

              {/* Inside Screen Container */}
              <div
                className={`w-full h-full rounded-[34px] bg-gradient-to-b ${selectedBrief.screenColor} p-5 flex flex-col justify-between relative overflow-hidden transition-all duration-300`}
              >
                {/* Top Status inside phone */}
                <div className="pt-6 flex items-center justify-between text-[10px] font-mono text-white/50">
                  <span>9:41</span>
                  <span className="uppercase text-[#D4FF00] font-bold">{selectedBrief.brand} BRIEF</span>
                </div>

                {/* Simulated Campaign Artifact */}
                <div className="space-y-3 py-6">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-[#D4FF00]">
                    <Flame className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-black text-white leading-tight uppercase">
                    {selectedBrief.challengeTitle}
                  </h4>
                  <div className="p-3 bg-black/60 rounded-xl border border-white/10 text-xs text-neutral-300 leading-relaxed font-mono">
                    {selectedBrief.shippedSolution}
                  </div>
                </div>

                {/* Bottom Outcome Widget */}
                <div className="p-4 bg-black/80 rounded-2xl border border-[#D4FF00]/40 text-center space-y-1">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">Impact Metric</span>
                  <div className="text-lg font-black text-[#D4FF00]">
                    {selectedBrief.roiLift}
                  </div>
                  <div className="text-[9px] font-mono text-neutral-500">Shipped by Bangalore Cohort</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}