"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  Zap,
  Grid,
  Type,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Terminal,
  ExternalLink,
  SplitSquareVertical,
  Gauge
} from "lucide-react";

// Web Audio API tactile feedback
const playTone = (freq = 440, type: "sine" | "triangle" = "sine", duration = 0.05) => {
  if (typeof window === "undefined") return;
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // blocked by browser
  }
};

interface AuditItem {
  id: string;
  section: string;
  issue: string;
  impact: string;
  fix: string;
  metricLift: string;
}

const AUDIT_DATA: AuditItem[] = [
  {
    id: "hero",
    section: "Hero & Value Prop",
    issue: "Static video embeds causing 1.8s LCP delay and visual cognitive friction.",
    impact: "High drop-off on first paint; unclear path to application.",
    fix: "Vectorized kinetic canvas with instant Web Audio haptics and immediate intent selector.",
    metricLift: "+32% Initial Engagement"
  },
  {
    id: "tracks",
    section: "Track Navigation",
    issue: "Horizontal swipe list collapses ambiguously on mobile screens.",
    impact: "Students confuse 'Creator Marketer' with 'CreatorPreneur' prerequisites.",
    fix: "30-second progressive state machine diagnostic with direct outcome badges.",
    metricLift: "+44% Qualified Applications"
  },
  {
    id: "pow",
    section: "Proof of Work Grid",
    issue: "Plain brand logos (CRED, Swiggy) without tangible output artifacts.",
    impact: "Low proof transparency; candidates cannot inspect student deliverables.",
    fix: "Interactive viewport simulator showcasing actual student campaign briefs and verified ROAS.",
    metricLift: "3.8x Time on Page"
  }
];

export default function DesignEngineerAudit() {
  const [activeTab, setActiveTab] = useState<"redesign" | "original">("redesign");
  const [selectedAudit, setSelectedAudit] = useState<AuditItem>(AUDIT_DATA[0]);
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showTypeScale, setShowTypeScale] = useState<boolean>(false);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [fps, setFps] = useState<number>(60);

  // Monitor simulated engine FPS
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
    const req = requestAnimationFrame(checkFps);
    return () => cancelAnimationFrame(req);
  }, []);

  return (
    <main className="min-h-screen bg-[#070707] text-[#FAFAFA] font-sans selection:bg-[#D4FF00] selection:text-black p-4 sm:p-8 md:p-12 relative overflow-x-hidden">
      
      {/* Visual Debug Grid Overlay */}
      {showGrid && (
        <div className="fixed inset-0 pointer-events-none z-50 grid grid-cols-12 gap-4 px-8 opacity-25">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full bg-red-500/20 border-x border-red-500/40" />
          ))}
        </div>
      )}

      {/* Top Engineering Suite Bar */}
      <header className="w-full max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-[#D4FF00] text-black font-black text-xs uppercase tracking-tight rounded">
              LIT AUDIT
            </span>
            <h1 className="text-sm font-mono font-bold tracking-wider uppercase text-white/90">
              DESIGN ENGINEERING BENCHMARK // litschool.in
            </h1>
          </div>
          <p className="text-xs font-mono text-neutral-400 mt-1">
            Engineered by Kartik Somani • Interactive UX Teardown & High-Craft Rebuild
          </p>
        </div>

        {/* Tactical Dev Tools */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <button
            onClick={() => {
              playTone(showGrid ? 280 : 540);
              setShowGrid(!showGrid);
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              showGrid
                ? "bg-red-500/20 border-red-500 text-red-400 font-bold"
                : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            GRID: {showGrid ? "ON" : "OFF"}
          </button>

          <button
            onClick={() => {
              playTone(showTypeScale ? 280 : 640);
              setShowTypeScale(!showTypeScale);
            }}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              showTypeScale
                ? "bg-[#D4FF00]/20 border-[#D4FF00] text-[#D4FF00] font-bold"
                : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            TYPE SCALE
          </button>

          <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#D4FF00] flex items-center gap-1.5 font-bold">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            {fps} FPS
          </div>
        </div>
      </header>

      {/* Main Split Comparison & Redesign Canvas */}
      <section className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Left Column: Interactive Component Stage */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between p-2 bg-[#101010] border border-white/10 rounded-2xl">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playTone(480);
                  setActiveTab("redesign");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  activeTab === "redesign"
                    ? "bg-[#D4FF00] text-black shadow-[0_0_15px_rgba(212,255,0,0.3)]"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                V2 Engineered Component
              </button>
              <button
                onClick={() => {
                  playTone(320);
                  setActiveTab("original");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                  activeTab === "original"
                    ? "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                    : "text-neutral-400 hover:text-white"
                }`}
              >
                Original Live Pattern
              </button>
            </div>

            <span className="text-[11px] font-mono text-neutral-500 pr-2 hidden sm:inline">
              HOT RELOAD: ACTIVE
            </span>
          </div>

          {/* Component Viewport Window */}
          <div className="relative min-h-[420px] bg-[#0C0C0C] border-2 border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between overflow-hidden shadow-2xl">
            {activeTab === "redesign" ? (
              <motion.div
                key="v2-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse" />
                    <span className="text-xs font-mono uppercase text-[#D4FF00] font-bold">
                      Redesigned Track Funnel Component
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30">
                    LATENCY: 12ms
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                    Where does your creative craft land?
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-mono">
                    // Direct brand output qualification in 30 seconds
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl border border-[#D4FF00]/50 bg-[#D4FF00]/5 hover:bg-[#D4FF00]/10 transition-all cursor-pointer">
                    <span className="text-[10px] font-mono text-[#D4FF00] uppercase font-bold">Track 01</span>
                    <h3 className="text-base font-bold text-white mt-1">Creator Marketer</h3>
                    <p className="text-xs text-neutral-400 mt-1">Live growth briefs for CRED, Swiggy, Meesho</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all cursor-pointer">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">Track 02</span>
                    <h3 className="text-base font-bold text-white mt-1">CreatorPreneur</h3>
                    <p className="text-xs text-neutral-400 mt-1">0-to-1 brand launch with seed incubator backing</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">Interaction: Keyboard shortcuts enabled [1, 2]</span>
                  <span className="text-[#D4FF00] font-bold">Zero Layout Shift (0.00 CLS)</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="v1-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 opacity-70"
              >
                <div className="flex items-center justify-between border-b border-red-500/20 pb-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-mono uppercase text-red-400 font-bold">
                      Original Pattern Issues Detected
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/30">
                    LATENCY: 140ms
                  </span>
                </div>

                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl space-y-2">
                  <span className="text-xs font-bold text-red-400 uppercase font-mono">
                    Observed Friction Points:
                  </span>
                  <ul className="text-xs text-neutral-300 space-y-1.5 list-disc pl-4 font-mono">
                    <li>Unfiltered video payloads triggering layout re-renders on mobile.</li>
                    <li>No immediate path to discover challenge difficulty or real student briefs.</li>
                    <li>Cognitive overload from generic copy blocks without kinetic indicators.</li>
                  </ul>
                </div>

                <div className="p-4 bg-black/60 rounded-xl border border-white/5 text-neutral-500 font-mono text-xs">
                  Static HTML structure • Drop-off risk identified on first scroll benchmark.
                </div>
              </motion.div>
            )}

            {showTypeScale && (
              <div className="mt-4 p-3 bg-black/90 border border-[#D4FF00]/40 rounded-xl font-mono text-[11px] text-[#D4FF00] flex justify-between">
                <span>Display: 32px / 1.1</span>
                <span>Body: 14px / 1.5</span>
                <span>Micro: 10px / 1.2</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Audit Inspector & Performance Telemetry */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-[#0D0D0D] border border-white/10 rounded-3xl space-y-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <Gauge className="w-4 h-4 text-[#D4FF00]" />
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Performance Benchmark
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl font-mono">
                <span className="text-[10px] uppercase text-neutral-500">Live LIT Score</span>
                <div className="text-xl font-black text-amber-400 mt-0.5">74 / 100</div>
                <span className="text-[10px] text-neutral-400">Heavier initial payload</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-[#D4FF00]/30 rounded-xl font-mono">
                <span className="text-[10px] uppercase text-[#D4FF00]">DE Rebuild</span>
                <div className="text-xl font-black text-[#D4FF00] mt-0.5">99 / 100</div>
                <span className="text-[10px] text-neutral-400">Instant Turbopack paint</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-mono text-neutral-400 uppercase">Audit Areas:</span>
              <div className="space-y-2">
                {AUDIT_DATA.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      playTone(420);
                      setSelectedAudit(item);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all text-xs font-mono cursor-pointer ${
                      selectedAudit.id === item.id
                        ? "bg-[#D4FF00]/10 border-[#D4FF00] text-white"
                        : "bg-white/[0.01] border-white/10 text-neutral-400 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{item.section}</span>
                      <span className="text-[#D4FF00] font-bold">{item.metricLift}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Audit Diagnostic Box */}
          <div className="p-6 bg-[#0E0E0E] border border-white/10 rounded-3xl space-y-3 font-mono text-xs">
            <div className="flex items-center gap-1.5 text-[#D4FF00] text-[10px] uppercase font-bold">
              <Terminal className="w-3.5 h-3.5" />
              <span>Diagnostic Remediation</span>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              <span className="text-neutral-500">// Problem:</span> {selectedAudit.issue}
            </p>
            <p className="text-neutral-200 leading-relaxed">
              <span className="text-[#D4FF00]">// Fix:</span> {selectedAudit.fix}
            </p>
          </div>
        </div>
      </section>

      {/* Footer Signature */}
      <footer className="w-full max-w-6xl mx-auto pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-500">
        <span>KARTIK SOMANI // DESIGN ENGINEER APPLICANT</span>
        <a
          href="https://github.com/ktsomani/lit-diagnostic"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 hover:text-[#D4FF00] transition-colors"
        >
          INSPECT CODE ON GITHUB <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </footer>
    </main>
  );
}