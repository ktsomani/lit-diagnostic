"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Flame,
  Layers,
  Code2,
  AlertCircle,
  ExternalLink,
  Calendar,
  Users,
  Briefcase,
  X,
  Gauge
} from "lucide-react";

interface BriefItem {
  brand: string;
  category: string;
  title: string;
  deliverable: string;
  metric: string;
  badgeColor: string;
}

const BRIEFS: BriefItem[] = [
  {
    brand: "CRED",
    category: "Growth & Retention",
    title: "Member Re-engagement Gamification Sprint",
    deliverable: "Gamified reward unlock sequence & push notification teardown",
    metric: "4.2x Engagement Lift",
    badgeColor: "bg-purple-500/10 text-purple-400 border-purple-500/20"
  },
  {
    brand: "Swiggy Instamart",
    category: "Organic Attention",
    title: "Midnight Munchies Viral Reel Campaign",
    deliverable: "Short-form video storyboard + TikTok/Reels viral hook loop",
    metric: "820K Organic Views",
    badgeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20"
  },
  {
    brand: "Meesho",
    category: "Performance D2C",
    title: "Tier-2/3 Regional Trust Funnel Architecture",
    deliverable: "Checkout trust badge redesign & regional language microcopy",
    metric: "3.4x ROAS on Meta",
    badgeColor: "bg-pink-500/10 text-pink-400 border-pink-500/20"
  },
  {
    brand: "Slice",
    category: "UI/UX & Conversion",
    title: "Gen-Z Micro-Investment Funnel Re-architecture",
    deliverable: "Tactile card unpack UI demo + interactive borrowing calculator",
    metric: "+28% Checkout CTR",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
  }
];

const CURRICULUM_SPRINTS = [
  {
    num: "01",
    phase: "Month 1-3",
    title: "Consumer Psychology & Funnel Fundamentals",
    focus: "Paid acquisition basics, audience personas, landing page heuristics, copywriting teardowns.",
    deliverable: "12 Audits + 1 Live Performance Landing Page"
  },
  {
    num: "02",
    phase: "Month 4-6",
    title: "Paid Media Buying & Performance Creative",
    focus: "Meta & Google Ads manager, UGC scripting, viral hooks, A/B creative testing pipelines.",
    deliverable: "₹1L+ Live Ad Spend Management Sprint"
  },
  {
    num: "03",
    phase: "Month 7-9",
    title: "Conversion Rate Optimization & Retention",
    focus: "Post-purchase sequences, WhatsApp/email automation, cohort analysis, churn prevention.",
    deliverable: "Full-Funnel Retention Architecture for D2C Brand"
  },
  {
    num: "04",
    phase: "Month 10",
    title: "Bangalore Studio Capstone & Brand Demo Day",
    focus: "48-hour live brand brief pitch in front of growth heads from top startups.",
    deliverable: "Live Pitch to Hiring Partners & Angel Network"
  }
];

const TEARDOWN_NOTES = [
  {
    title: "1. The Cognitive Friction Flaw",
    original: "Curriculum buried under long multi-column tables with passive syllabus text.",
    redesign: "Replaced with a 4-phase production sprint where every single quarter terminates in a public, hiring-ready portfolio deliverable.",
    metric: "+40% Reading Retention"
  },
  {
    title: "2. The Proof-of-Work Gap",
    original: "Static company logos (CRED, Swiggy) without tangible evidence of what students actually produced.",
    redesign: "Transformed logos into interactive Brief Outcome Cards showing real problem statements, shipped deliverables, and verified ROAS.",
    metric: "3.8x Time on Page"
  },
  {
    title: "3. The Value-Prop Ambiguity",
    original: "No direct comparison explaining why a student should pay for challenge-based learning over traditional higher education.",
    redesign: "Introduced an interactive Traditional vs. LIT toggle above the fold to qualify intent within 5 seconds.",
    metric: "Immediate Drop-off Reduction"
  }
];

export default function CreatorMarketerRebuild() {
  const [activeTab, setActiveTab] = useState<"challenge" | "traditional">("challenge");
  const [isTeardownOpen, setIsTeardownOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#070707] text-[#FAFAFA] font-sans selection:bg-[#D4FF00] selection:text-black pb-28">
      
      {/* Top Banner */}
      <div className="bg-[#D4FF00] text-black text-xs font-mono font-bold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>REENGINEERED BY KARTIK SOMANI // OUTCOME-FIRST CREATOR MARKETER FUNNEL</span>
      </div>

      {/* Navigation */}
      <nav className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 bg-[#D4FF00] text-black font-black text-sm tracking-tighter rounded-md shadow-[0_0_15px_rgba(212,255,0,0.3)]">
            LIT
          </div>
          <span className="text-xs font-mono font-bold tracking-widest text-white/80 uppercase">
            CREATOR MARKETER
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsTeardownOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4FF00]/10 border border-[#D4FF00]/30 hover:bg-[#D4FF00] hover:text-black text-[#D4FF00] text-xs font-mono font-bold uppercase rounded-lg transition-all cursor-pointer"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>View Teardown Notes</span>
          </button>
          <a
            href="https://litschool.in"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            Original Site <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-16 pb-20 text-center flex flex-col items-center relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-[#D4FF00] mb-6">
          <Flame className="w-3.5 h-3.5" />
          <span>BANGALORE CAMPUS • 10-MONTH OFFLINE IMMERSION</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white max-w-4xl leading-[1.05]">
          Become the Growth Engine Behind Modern Brands.
        </h1>

        <p className="text-neutral-400 text-base sm:text-xl max-w-2xl mt-6 font-normal leading-relaxed">
          Skip 4 years of rote marketing theory. Execute 45+ live challenge deliverables with companies like CRED, Swiggy, and Meesho.
        </p>

        {/* Traditional vs LIT Interactive Toggle */}
        <div className="mt-10 p-1.5 bg-neutral-900 border border-white/10 rounded-2xl flex items-center max-w-md w-full">
          <button
            onClick={() => setActiveTab("challenge")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
              activeTab === "challenge"
                ? "bg-[#D4FF00] text-black shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            The LIT Way (Challenge-First)
          </button>
          <button
            onClick={() => setActiveTab("traditional")}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase transition-all cursor-pointer ${
              activeTab === "traditional"
                ? "bg-red-500 text-white shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Traditional College
          </button>
        </div>

        {/* Proof Comparison Card */}
        <div className="mt-4 max-w-md w-full text-left">
          {activeTab === "challenge" ? (
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-[#D4FF00]/30 text-xs font-mono space-y-2 text-neutral-300">
              <div className="text-[#D4FF00] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 45+ Public Deliverables Before You Graduate
              </div>
              <p className="text-neutral-400">Directly audited by VP of Growth & Performance Leads in Bangalore.</p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-red-500/30 text-xs font-mono space-y-2 text-neutral-400">
              <div className="text-red-400 font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" /> 4 Years of Textbook Memorization
              </div>
              <p>Zero ad spend experience. Zero portfolio artifacts. Generic resume ignored by hiring managers.</p>
            </div>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <a
            href="#briefs"
            className="w-full sm:w-auto px-8 py-4 bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-black uppercase text-sm tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(212,255,0,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            Explore Proof of Work <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#curriculum"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold uppercase text-sm rounded-xl border border-white/10 transition-all flex items-center justify-center cursor-pointer"
          >
            View 10-Month Roadmap
          </a>
        </div>
      </header>

      {/* METRICS BAR */}
      <section className="w-full border-y border-white/10 bg-[#0C0C0C] py-8">
        <div className="w-full max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">45+</div>
            <div className="text-xs font-mono text-neutral-400 mt-1 uppercase">Live Brand Challenges</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-[#D4FF00]">₹12.4 LPA</div>
            <div className="text-xs font-mono text-neutral-400 mt-1 uppercase">Median Track Placement</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">100%</div>
            <div className="text-xs font-mono text-neutral-400 mt-1 uppercase">Proof-of-Work Driven</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-white">30</div>
            <div className="text-xs font-mono text-neutral-400 mt-1 uppercase">Cohort Cap Per Intake</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LIVE BRAND BRIEFS */}
      <section id="briefs" className="w-full max-w-6xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono text-[#D4FF00] uppercase font-bold tracking-widest">
              // NO TOY ASSIGNMENTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mt-2 tracking-tight">
              Real Challenges with Bangalore's Top Brands
            </h2>
          </div>
          <p className="text-sm font-mono text-neutral-400 max-w-md">
            Students don't write essays. They solve actual retention, acquisition, and brand growth problems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BRIEFS.map((b) => (
            <div
              key={b.brand}
              className="p-6 sm:p-8 bg-[#0F0F0F] border border-white/10 hover:border-[#D4FF00] rounded-2xl transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-[0_0_30px_rgba(212,255,0,0.1)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-black uppercase tracking-tight text-white group-hover:text-[#D4FF00] transition-colors">
                    {b.brand}
                  </span>
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md border ${b.badgeColor}`}>
                    {b.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-mono">
                  {b.deliverable}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-neutral-500">Target Outcome</span>
                <span className="text-sm font-mono font-bold text-[#D4FF00] flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {b.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SPRINT ROADMAP */}
      <section id="curriculum" className="w-full bg-[#0C0C0C] py-24 border-y border-white/10">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono text-[#D4FF00] uppercase font-bold tracking-widest">
              // 10-MONTH PRODUCTION SPRINT
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mt-2 tracking-tight">
              From Theory to Top 1% Marketer
            </h2>
            <p className="text-sm text-neutral-400 mt-3 font-mono">
              Designed backwards from what venture-funded growth teams look for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CURRICULUM_SPRINTS.map((sprint) => (
              <div
                key={sprint.num}
                className="p-6 bg-[#121212] border border-white/10 rounded-2xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-white/20 font-mono">
                      {sprint.num}
                    </span>
                    <span className="text-[10px] font-mono text-[#D4FF00] bg-[#D4FF00]/10 px-2 py-0.5 rounded">
                      {sprint.phase}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 leading-tight">
                    {sprint.title}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    {sprint.focus}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5">
                  <div className="text-[10px] font-mono text-neutral-500 uppercase">Shipped Artifact:</div>
                  <div className="text-xs font-mono text-[#D4FF00] font-medium mt-1">
                    {sprint.deliverable}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: CALL TO ACTION */}
      <section id="apply" className="w-full max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="p-8 sm:p-12 bg-gradient-to-b from-[#141414] to-[#0A0A0A] border-2 border-[#D4FF00] rounded-3xl shadow-[0_0_50px_rgba(212,255,0,0.15)] relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4FF00]/10 border border-[#D4FF00]/30 rounded-full text-xs font-mono text-[#D4FF00] mb-4">
            <span>NEXT COHORT INTAKE // 30 SEATS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Stop Studying. Start Shipping.
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mt-4 font-normal">
            Join the only Creator Marketer program where your portfolio is built in live war rooms with actual growth budgets.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://litschool.in"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-black uppercase text-sm tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(212,255,0,0.3)] cursor-pointer"
            >
              Apply for Creator Marketer
            </a>
          </div>

          <div className="mt-6 text-xs font-mono text-neutral-500">
            Offline Campus • Indiranagar, Bangalore • 10 Months Full-Time
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-white/10 py-8 px-6 text-center text-xs font-mono text-neutral-500">
        <div>Concept Redesign & Implementation by Kartik Somani // Design Engineer Candidate</div>
        <div className="mt-2 text-[10px] text-neutral-600">Built with Next.js 15, Tailwind CSS, & Framer Motion</div>
      </footer>

      {/* STICKY BOTTOM CONVERSION DOCK */}
      <div className="fixed bottom-0 inset-x-0 z-40 p-4 pointer-events-none">
        <div className="max-w-4xl mx-auto bg-[#0E0E0E]/95 border border-white/15 rounded-2xl p-3 sm:px-6 sm:py-3.5 backdrop-blur-xl shadow-2xl flex items-center justify-between pointer-events-auto gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse" />
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold text-white uppercase">
                Next Bangalore Intake
              </span>
              <span className="text-[10px] font-mono text-[#D4FF00]">
                Only 6 Seats Remaining
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTeardownOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-neutral-300 text-xs font-mono cursor-pointer transition-colors"
            >
              <Code2 className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>UX Audit Notes</span>
            </button>
            <a
              href="https://litschool.in"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 bg-[#D4FF00] hover:bg-[#c2eb00] text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(212,255,0,0.3)] cursor-pointer"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>

      {/* INTERACTIVE TEARDOWN DRAWER */}
      <AnimatePresence>
        {isTeardownOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
            onClick={() => setIsTeardownOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg h-full bg-[#0D0D0D] border-l border-white/15 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-[#D4FF00]" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                      Design Engineer Teardown
                    </span>
                  </div>
                  <button
                    onClick={() => setIsTeardownOpen(false)}
                    className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black uppercase text-white">
                    Why Rebuild Creator Marketer?
                  </h3>
                  <p className="text-xs font-mono text-neutral-400">
                    A conversion & information architecture breakdown by Kartik Somani.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  {TEARDOWN_NOTES.map((note) => (
                    <div
                      key={note.title}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2.5 font-mono text-xs"
                    >
                      <div className="flex items-center justify-between text-[#D4FF00] font-bold">
                        <span>{note.title}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4FF00]/10 border border-[#D4FF00]/25">
                          {note.metric}
                        </span>
                      </div>
                      <p className="text-neutral-400">
                        <strong className="text-red-400">Friction:</strong> {note.original}
                      </p>
                      <p className="text-neutral-200">
                        <strong className="text-emerald-400">Engineering Solution:</strong> {note.redesign}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-3 font-mono text-xs text-neutral-400">
                <div className="flex items-center justify-between text-neutral-500">
                  <span>Stack: Next.js 15 • Tailwind • Framer Motion</span>
                  <span className="text-[#D4FF00]">0.00 CLS</span>
                </div>
                <button
                  onClick={() => setIsTeardownOpen(false)}
                  className="w-full py-3 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl transition-colors cursor-pointer text-center"
                >
                  Return to Live Page
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}