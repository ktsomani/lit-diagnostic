"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

interface CaseStudy {
  index: string;
  brand: string;
  category: string;
  year: string;
  title: string;
  metric: string;
  problem: string;
  deliverable: string;
  accentBg: string;
  previewStat: string;
  previewSub: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    index: "01",
    brand: "CRED",
    category: "Retention & Gamification",
    year: " SPRINT // 01",
    title: "Member Reward Loop Re-Architecture",
    metric: "+320% Repeat Sessions",
    problem: "High post-reward churn after single bill payment cycle.",
    deliverable: "Shipped tactile scratch-card state machine + push trigger hierarchy audited by CRED Growth.",
    accentBg: "from-zinc-800 via-neutral-900 to-black",
    previewStat: "4.2x",
    previewSub: "D30 RETENTION LIFT"
  },
  {
    index: "02",
    brand: "SWIGGY INSTAMART",
    category: "Viral Attention Engine",
    year: "SPRINT // 02",
    title: "Midnight Munchies Hook Architecture",
    metric: "820K Organic Reach",
    problem: "Cart abandonment spike between 11:30 PM and 2:00 AM among 18–24 demographics.",
    deliverable: "Engineered 12 high-velocity 3-second video hooks with direct deep-linked checkout bundles.",
    accentBg: "from-neutral-800 via-stone-900 to-black",
    previewStat: "820K",
    previewSub: "ZERO-SPEND IMPRESSIONS"
  },
  {
    index: "03",
    brand: "MEESHO",
    category: "Tier-2/3 Conversion",
    year: "SPRINT // 03",
    title: "Vernacular Checkout Trust Protocol",
    metric: "3.4x Meta ROAS",
    problem: "Pre-paid gateway drop-off in non-metro pin codes due to payment skepticism.",
    deliverable: "Redesigned checkout microcopy and vernacular trust signals across 4 regional cohorts.",
    accentBg: "from-zinc-900 via-neutral-800 to-black",
    previewStat: "3.4x",
    previewSub: "VERIFIED PAID ROAS"
  },
  {
    index: "04",
    brand: "SLICE",
    category: "Fintech Onboarding",
    year: "SPRINT // 04",
    title: "Zero-Friction KYC Unpack Flow",
    metric: "+28% Activation CTR",
    problem: "42% drop-off velocity during multi-step document verification.",
    deliverable: "Built interactive card-unpack preview simulator reducing perceived wait time by 60%.",
    accentBg: "from-stone-800 via-zinc-950 to-black",
    previewStat: "+28%",
    previewSub: "FUNNEL COMPLETION"
  }
];

const SPRINTS = [
  {
    id: "01",
    period: "WEEKS 01 — 10",
    name: "Consumer Heuristics & Funnel Teardowns",
    detail: "Deconstruct 30+ Indian D2C & consumer tech funnels. No textbooks—every Friday ends with a shipped landing page and live copy audit.",
    artifact: "12 Public Teardowns + 1 Live Funnel"
  },
  {
    id: "02",
    period: "WEEKS 11 — 22",
    name: "Performance Creative & Paid Acquisition",
    detail: "Deploy real capital on Meta and Google. Script, shoot, and iterate short-form hooks based on thumb-stop rate and hold curves.",
    artifact: "₹1,00,000+ Managed Ad Spend Sprint"
  },
  {
    id: "03",
    period: "WEEKS 23 — 34",
    name: "Retention Loops & Lifecycle Engineering",
    detail: "Architect automated WhatsApp, push, and post-purchase gamification systems that turn one-time buyers into high-LTV cohorts.",
    artifact: "Full-Stack CRM & Retention Engine"
  },
  {
    id: "04",
    period: "WEEKS 35 — 42",
    name: "Bangalore War Room & Hiring Demo Day",
    detail: "48-hour live problem statements pitched directly to VPs of Growth and Founders from Bangalore's top consumer startups.",
    artifact: "Direct Placement & Portfolio Defense"
  }
];

const TEARDOWN_POINTS = [
  {
    num: "01",
    heading: "Killing the 'SaaS Template' Look",
    body: "EdTech sites look like B2B dashboards full of generic icons and boxes. Creator Marketers respond to editorial taste, stark typography, and kinetic motion."
  },
  {
    num: "02",
    heading: "Interactive Index Over Static Logos",
    body: "Instead of passive partner logos, brand briefs (CRED, Swiggy, Meesho) act as an interactive case-study index with live cursor-tracked deliverable previews."
  },
  {
    num: "03",
    heading: "Zero-Fluff Outcome Hierarchy",
    body: "Every scroll viewport answers one question: What will I ship, who audits my work, and what is the hiring outcome?"
  }
];

export default function JesperStyleLitRebuild() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [compareMode, setCompareMode] = useState<"lit" | "college">("lit");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [timeStr, setTimeStr] = useState<string>("BLR // 12.9716° N");

  // Smooth spring cursor coordinates
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springConfig = { damping: 28, stiffness: 260, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }) + " IST"
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#060606] text-[#F2F2F2] font-sans antialiased selection:bg-[#F2F2F2] selection:text-[#060606] overflow-x-hidden">
      
      {/* CUSTOM FOLLOWER CURSOR (DESKTOP) */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY
        }}
        className="fixed top-0 left-0 z-50 pointer-events-none hidden lg:flex items-center justify-center -ml-3 -mt-3"
      >
        <motion.div
          animate={{
            width: hoveredIndex !== null ? 120 : 14,
            height: hoveredIndex !== null ? 36 : 14,
            borderRadius: hoveredIndex !== null ? 4 : 999
          }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-[#F2F2F2] text-[#060606] flex items-center justify-center overflow-hidden mix-blend-difference"
        >
          {hoveredIndex !== null && (
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase whitespace-nowrap px-2">
              [ INSPECT ↗ ]
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* FLOATING HOVER CASE STUDY PREVIEW WINDOW */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY
        }}
        className="fixed top-6 left-8 z-40 pointer-events-none hidden lg:block"
      >
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              key={hoveredIndex}
              initial={{ opacity: 0, scale: 0.88, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 12 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`w-72 h-44 bg-gradient-to-br ${CASE_STUDIES[hoveredIndex].accentBg} border border-white/25 p-5 flex flex-col justify-between shadow-2xl backdrop-blur-md`}
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-white/60 border-b border-white/10 pb-2">
                <span>BRIEF // {CASE_STUDIES[hoveredIndex].index}</span>
                <span>{CASE_STUDIES[hoveredIndex].brand}</span>
              </div>
              <div>
                <div className="text-4xl font-black tracking-tighter text-white leading-none">
                  {CASE_STUDIES[hoveredIndex].previewStat}
                </div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-white/60 mt-1">
                  {CASE_STUDIES[hoveredIndex].previewSub}
                </div>
              </div>
              <div className="text-[10px] font-mono text-white/80 flex items-center justify-between">
                <span>CLICK ROW TO EXPAND</span>
                <span>[ + ]</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* STICKY ARCHITECTURAL TOP BAR */}
      <header className="sticky top-0 z-30 bg-[#060606]/90 backdrop-blur-md border-b border-white/15 px-4 sm:px-8 py-4 grid grid-cols-2 md:grid-cols-12 items-center text-[11px] font-mono tracking-wider uppercase">
        <div className="md:col-span-3 flex items-center gap-3">
          <span className="inline-block w-2 h-2 bg-[#F2F2F2]" />
          <span className="font-bold text-white">LIT // CREATOR MARKETER</span>
        </div>

        <div className="hidden md:flex md:col-span-4 items-center gap-6 text-white/50">
          <span>INDIRANAGAR, BLR</span>
          <span>—</span>
          <span>{timeStr}</span>
        </div>

        <div className="md:col-span-5 flex items-center justify-end gap-4 sm:gap-6">
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-white/70 hover:text-white transition-colors cursor-pointer underline underline-offset-4"
          >
            [ TEARDOWN NOTES (03) ]
          </button>
          <a
            href="https://litschool.in"
            target="_blank"
            rel="noreferrer"
            className="px-3 py-1.5 bg-[#F2F2F2] text-[#060606] font-bold hover:bg-white/80 transition-colors"
          >
            APPLY — COHORT 04 ↗
          </a>
        </div>
      </header>

      {/* FULL-WIDTH EDITORIAL HERO */}
      <section className="relative border-b border-white/15 px-4 sm:px-8 pt-12 sm:pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8 text-[11px] font-mono text-white/50 uppercase tracking-widest">
          <div className="md:col-span-3">(00) — PROGRAM MANIFESTO</div>
          <div className="md:col-span-6">
            10-MONTH OFFLINE IMMERSION • ZERO TEXTBOOKS • 45+ LIVE BRAND SPRINT DELIVERABLES
          </div>
          <div className="md:col-span-3 md:text-right text-white/80">
            REENGINEERED BY KARTIK SOMANI
          </div>
        </div>

        {/* MASSIVE VIEWPORT TYPOGRAPHY */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11.5vw] sm:text-[9.2vw] font-black uppercase leading-[0.88] tracking-[-0.04em] text-[#F2F2F2]"
          >
            OUTCOME—FIRST
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-baseline justify-between"
          >
            <span className="text-[11.5vw] sm:text-[9.2vw] font-black uppercase leading-[0.88] tracking-[-0.04em] text-white/30">
              GROWTH SCHOOL.
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-white/60 mt-4 sm:mt-0">
              [ SCROLL TO INSPECT PROOF OF WORK ↓ ]
            </span>
          </motion.div>
        </div>

        {/* HERO LOWER SPLIT: THESIS + INTERACTIVE MODEL CONTRAST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-14 mt-14 border-t border-white/15 items-end">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-lg sm:text-2xl font-normal leading-snug text-white/90 max-w-xl">
              Most programs sell lecture hours. LIT drops you into Bangalore war rooms to solve acquisition, retention, and viral loops for real consumer brands.
            </p>
            <div className="flex flex-wrap gap-6 pt-2 text-xs font-mono text-white/50 uppercase">
              <span>MEDIAN OUTCOME: ₹12.4 LPA</span>
              <span>•</span>
              <span>INTAKE CAP: 30 BUILDERS</span>
            </div>
          </div>

          {/* TACTILE BINARY SWITCH (LIT VS TRADITIONAL) */}
          <div className="lg:col-span-6 border border-white/15 bg-[#0B0B0B] p-5 sm:p-6">
            <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4 font-mono text-[11px]">
              <span className="text-white/50 uppercase">MODEL DIAGNOSTIC</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setCompareMode("lit")}
                  className={`px-2.5 py-1 uppercase transition-colors cursor-pointer ${
                    compareMode === "lit"
                      ? "bg-[#F2F2F2] text-[#060606] font-bold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  [01] LIT SPRINT MODEL
                </button>
                <button
                  onClick={() => setCompareMode("college")}
                  className={`px-2.5 py-1 uppercase transition-colors cursor-pointer ${
                    compareMode === "college"
                      ? "bg-[#F2F2F2] text-[#060606] font-bold"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  [02] LEGACY DEGREE
                </button>
              </div>
            </div>

            {compareMode === "lit" ? (
              <div className="grid grid-cols-3 gap-4 font-mono">
                <div>
                  <div className="text-[10px] text-white/40 uppercase">DELIVERABLES</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-1">45+ Shipped</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase">CAPITAL DEPLOYED</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-1">Real Ad Budgets</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase">EVALUATION</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-1">VP Growth Audit</div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 font-mono opacity-60">
                <div>
                  <div className="text-[10px] text-white/40 uppercase">DELIVERABLES</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-1">00 Written Exams</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase">CAPITAL DEPLOYED</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-1">₹0 Simulated</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase">EVALUATION</div>
                  <div className="text-lg sm:text-xl font-bold text-white mt-1">Static Resume</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SECTION 01: INTERACTIVE CASE STUDY INDEX (JESPER LANDBERG SIGNATURE) */}
      <section className="border-b border-white/15">
        <div className="px-4 sm:px-8 py-6 border-b border-white/15 grid grid-cols-2 md:grid-cols-12 text-[11px] font-mono text-white/50 uppercase tracking-widest">
          <div className="md:col-span-4">(01) — VERIFIED BRAND CHALLENGES</div>
          <div className="md:col-span-5 hidden md:block">HOVER TO PREVIEW • CLICK TO INSPECT ARCHITECTURE</div>
          <div className="md:col-span-3 text-right">INDEX [01—04]</div>
        </div>

        <div className="divide-y divide-white/15">
          {CASE_STUDIES.map((study, idx) => {
            const isExpanded = expandedIndex === idx;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== idx;

            return (
              <div
                key={study.index}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                className={`px-4 sm:px-8 py-8 sm:py-12 transition-opacity duration-300 cursor-pointer ${
                  isDimmed ? "opacity-30" : "opacity-100"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 items-baseline gap-4">
                  <div className="md:col-span-1 font-mono text-xs text-white/40">
                    ({study.index})
                  </div>

                  <motion.div
                    animate={{ x: hoveredIndex === idx ? 16 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    className="md:col-span-5"
                  >
                    <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none">
                      {study.brand}
                    </h2>
                  </motion.div>

                  <div className="md:col-span-3 font-mono text-xs text-white/60 uppercase">
                    {study.title}
                  </div>

                  <div className="md:col-span-3 flex items-center justify-between md:justify-end gap-6 font-mono text-xs">
                    <span className="text-white font-bold">{study.metric}</span>
                    <span className="text-white/40">[ {isExpanded ? "—" : "+"} ]</span>
                  </div>
                </div>

                {/* EXPANDABLE CASE STUDY SPECIFICATION */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-8 mt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 text-sm">
                        <div className="md:col-span-1" />
                        <div className="md:col-span-4 space-y-1">
                          <div className="text-[10px] font-mono uppercase text-white/40">
                            CLIENT PROBLEM STATEMENT
                          </div>
                          <p className="text-white/80 leading-relaxed">{study.problem}</p>
                        </div>
                        <div className="md:col-span-5 space-y-1">
                          <div className="text-[10px] font-mono uppercase text-white/40">
                            SHIPPED STUDENT ARTIFACT
                          </div>
                          <p className="text-white leading-relaxed">{study.deliverable}</p>
                        </div>
                        <div className="md:col-span-2 flex flex-col justify-between border-l border-white/10 pl-4 font-mono">
                          <span className="text-[10px] text-white/40 uppercase">VERIFIED LIFT</span>
                          <span className="text-xl font-black text-white">{study.previewStat}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 02: STICKY SPLIT-SCREEN SPRINT ARCHITECTURE */}
      <section className="border-b border-white/15 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Sticky Column */}
        <div className="lg:col-span-5 p-4 sm:p-8 lg:border-r border-b lg:border-b-0 border-white/15 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest">
              (02) — SPRINT ARCHITECTURE
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[0.92]">
              40 WEEKS. <br />
              ZERO EXAMS. <br />
              PURE SHIPPING.
            </h2>
          </div>

          <div className="space-y-4 pt-8 border-t border-white/15 font-mono text-xs text-white/60">
            <p>
              Built backwards from hiring rubrics at India&apos;s fastest-scaling consumer startups.
            </p>
            <div className="text-white font-bold">
              EVERY QUARTER TERMINATES IN A LIVE DEMO DAY.
            </div>
          </div>
        </div>

        {/* Right Scrolling Column */}
        <div className="lg:col-span-7 divide-y divide-white/15">
          {SPRINTS.map((sprint) => (
            <div key={sprint.id} className="p-6 sm:p-12 space-y-6 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center justify-between font-mono text-xs text-white/40">
                <span>PHASE // {sprint.id}</span>
                <span>{sprint.period}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
                {sprint.name}
              </h3>

              <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-2xl">
                {sprint.detail}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                <span className="text-white/40 uppercase">REQUIRED PROOF OF WORK</span>
                <span className="text-white font-bold">[ {sprint.artifact} ]</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 03: STARK MONOCHROME CONVERSION FOOTER */}
      <footer className="px-4 sm:px-8 py-20 sm:py-32 flex flex-col justify-between">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-16 border-b border-white/15 items-end">
          <div className="md:col-span-8">
            <div className="text-[11px] font-mono text-white/50 uppercase tracking-widest mb-4">
              (03) — COHORT ADMISSIONS
            </div>
            <h2 className="text-[10vw] sm:text-[7.5vw] font-black uppercase leading-[0.88] tracking-[-0.04em]">
              READY TO SHIP?
            </h2>
          </div>

          <div className="md:col-span-4 flex flex-col items-start md:items-end justify-end gap-4">
            <a
              href="https://litschool.in"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto text-center px-8 py-5 bg-[#F2F2F2] text-[#060606] font-mono font-bold text-xs uppercase tracking-widest hover:bg-white/80 transition-colors"
            >
              INITIATE APPLICATION ↗
            </a>
            <span className="font-mono text-[11px] text-white/40 uppercase">
              INDIRANAGAR CAMPUS • 06 SEATS REMAINING
            </span>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-white/40 uppercase">
          <div>DESIGN ENGINEERING TEARDOWN & REBUILD BY KARTIK SOMANI</div>
          <div className="flex gap-6">
            <button
              onClick={() => setDrawerOpen(true)}
              className="hover:text-white underline underline-offset-4 cursor-pointer"
            >
              READ UX RATIONALE
            </button>
            <a
              href="https://github.com/ktsomani/lit-diagnostic"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              GITHUB REPOSITORY ↗
            </a>
          </div>
        </div>
      </footer>

      {/* SLIDE-OVER ARCHITECTURAL TEARDOWN DRAWER */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl h-full bg-[#080808] border-l border-white/20 p-6 sm:p-10 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-white/15 font-mono text-xs">
                  <span className="uppercase tracking-widest text-white font-bold">
                    // DESIGN ENGINEERING TEARDOWN
                  </span>
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="text-white/60 hover:text-white cursor-pointer"
                  >
                    [ CLOSE X ]
                  </button>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                    Why This Architecture Converts Higher
                  </h3>
                  <p className="text-xs font-mono text-white/50 mt-2">
                    Moving away from SaaS templates toward editorial authority.
                  </p>
                </div>

                <div className="divide-y divide-white/15 border-y border-white/15">
                  {TEARDOWN_POINTS.map((pt) => (
                    <div key={pt.num} className="py-5 space-y-2">
                      <div className="font-mono text-xs text-white/40">({pt.num})</div>
                      <div className="text-base font-bold uppercase">{pt.heading}</div>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                        {pt.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/15 flex items-center justify-between font-mono text-[11px] text-white/50">
                <span>KARTIK SOMANI // NEXT.JS 15 + FRAMER MOTION</span>
                <span>0.00 CLS</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}