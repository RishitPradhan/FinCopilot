'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import {
  BrainCircuit,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  Lock,
  BarChart3,
  CheckCircle2,
  PieChart,
  CandlestickChart,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { LandingNav } from '@/components/landing/LandingNav';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const SplineHome = dynamic(() => import('@/components/landing/SplineHome'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black/20 animate-pulse" />
});

const serifFont = "font-serif";
const monoFont = "font-mono";

const GlitchText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <div className="relative inline-block">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={className}
      >
        {text}
      </motion.span>
      <motion.span
        animate={{
          x: [-2, 2, -1, 1, 0],
          opacity: [0, 0.5, 0.2, 0.8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.2,
          repeatDelay: Math.random() * 5,
        }}
        className={cn(className, "absolute top-0 left-0 text-red-500 mix-blend-screen pointer-events-none")}
      >
        {text}
      </motion.span>
      <motion.span
        animate={{
          x: [2, -2, 1, -1, 0],
          opacity: [0, 0.4, 0.1, 0.6, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 0.2,
          repeatDelay: Math.random() * 4,
        }}
        className={cn(className, "absolute top-0 left-0 text-cyan-500 mix-blend-screen pointer-events-none")}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const leftX = useTransform(scrollYProgress, [0, 0.3], [0, -200]);
  const rightX = useTransform(scrollYProgress, [0, 0.3], [0, 200]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.2], [0, 10]);

  return (
    <div ref={containerRef} className="min-h-[200vh] bg-black text-white selection:bg-white selection:text-black no-scrollbar relative">
      {/* Grain Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.03] contrast-150 brightness-150 mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <LandingNav />

      {/* Hero Section - Full Page Cinematic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Spline 3D Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
          <SplineHome
            scene="https://prod.spline.design/u1z08GYMTIh6kUVN/scene.splinecode"
          />
        </div>

        {/* Flanking Typography Content Overlay */}
        <motion.div
          style={{ opacity, filter: blur ? `blur(${blur}px)` : 'none' }}
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 px-8 md:px-20 pointer-events-none flex justify-between items-center w-full"
        >
          {/* Left Side */}
          <motion.div
            style={{ x: leftX, scale: heroScale }}
            className="flex flex-col space-y-2 md:space-y-8"
          >
            <h1 className={cn("text-6xl md:text-[6rem] font-black tracking-tighter text-white uppercase italic leading-[0.8] opacity-90", serifFont)}>
              <GlitchText text="Master" />
            </h1>
            <h1 className={cn("text-6xl md:text-[6rem] font-black tracking-tighter text-white uppercase italic leading-[0.8] opacity-90", serifFont)}>
              <GlitchText text="New" />
            </h1>
          </motion.div>

          {/* Right Side */}
          <motion.div
            style={{ x: rightX, scale: heroScale }}
            className="flex flex-col space-y-2 md:space-y-8 text-right"
          >
            <h1 className={cn("text-6xl md:text-[6rem] font-black tracking-tighter text-white uppercase italic leading-[0.8] opacity-40", serifFont)}>
              <GlitchText text="The" />
            </h1>
            <h1 className={cn("text-6xl md:text-[6rem] font-black tracking-tighter text-white uppercase italic leading-[0.8] opacity-40", serifFont)}>
              <GlitchText text="Era." />
            </h1>
          </motion.div>
        </motion.div>

      </section>

      {/* Minimalist Bottom Section */}
      <section className="py-60 relative flex flex-col items-center justify-center text-center space-y-20">
        <div className="max-w-2xl mx-auto px-6 space-y-6">
          <h2 className={cn("text-5xl md:text-7xl font-bold tracking-tight text-white", serifFont)}>
            Simplicity in <br />
            <span className="text-white/40 italic">Sophistication.</span>
          </h2>
          <p className="text-lg text-white/40 font-medium leading-relaxed uppercase tracking-[0.2em]">
            Everything you need. Nothing you don't.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 max-w-4xl mx-auto px-6">
          {[
            { tag: "Phase 01", title: "Learn", desc: "Interactive modules for the modern investor." },
            { tag: "Phase 02", title: "Analyze", desc: "Deep AI intelligence for market mastery." },
            { tag: "Phase 03", title: "Evolve", desc: "Real-time alerts and institutional tools." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: i * 0.15
              }}
              className="space-y-4 group cursor-default"
            >
              <div className="text-[10px] font-black tracking-[0.5em] text-white/20 uppercase italic group-hover:text-white/60 transition-colors">{item.tag}</div>
              <h4 className="text-xl font-bold uppercase tracking-tighter group-hover:scale-110 transition-transform origin-left">{item.title}</h4>
              <p className="text-xs text-white/40 leading-relaxed group-hover:text-white/80 transition-colors">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover="hover"
          initial="initial"
        >
          <Link href="/auth">
            <Button size="lg" variant="ghost" className="text-white hover:bg-transparent p-0 font-black tracking-[0.4em] uppercase text-[10px] flex items-center gap-4 group relative">
              <motion.span
                variants={{
                  initial: { letterSpacing: "0.4em" },
                  hover: { letterSpacing: "0.6em" }
                }}
                transition={{ duration: 0.5, ease: "circOut" }}
              >
                Enter the ecosystem
              </motion.span>
              <motion.div
                variants={{
                  initial: { x: 0 },
                  hover: { x: 10 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
              </motion.div>
              <motion.div
                className="absolute -bottom-4 left-0 right-0 h-[1px] bg-white/20 origin-left"
                variants={{
                  initial: { scaleX: 0 },
                  hover: { scaleX: 1, backgroundColor: "rgba(255,255,255,0.8)" }
                }}
                transition={{ duration: 0.5, ease: "circOut" }}
              />
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-900/50" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 space-y-12">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={cn("text-6xl md:text-8xl font-black tracking-tighter text-white", serifFont)}
          >
            Ready to <br /> Evolve?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/50 font-medium"
          >
            Join thousands of investors who are redefining their financial future with AI-driven intelligence.
          </motion.p>
          <Link href="/auth" className="inline-block">
            <motion.div
              whileHover="hover"
              initial="initial"
              whileTap="tap"
              className="relative"
            >
              <motion.div
                variants={{
                  hover: { scale: 1.05, filter: "brightness(1.1)" },
                  tap: { scale: 0.98 }
                }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Button size="lg" className="bg-white text-black hover:bg-white rounded-full font-black uppercase tracking-widest px-12 py-10 text-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] group overflow-hidden relative">
                  <span className="relative z-10 flex items-center">
                    Get Started Free
                    <motion.div
                      variants={{
                        hover: { x: 8 }
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowRight className="ml-4 w-6 h-6" />
                    </motion.div>
                  </span>

                  {/* Premium Shimmer Effect */}
                  <motion.div
                    variants={{
                      hover: { x: "150%" }
                    }}
                    initial={{ x: "-150%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-black/10 to-transparent skew-x-[35deg]"
                  />

                  {/* Subtle Glow Pulse */}
                  <motion.div
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 bg-white/5 rounded-full blur-2xl"
                  />
                </Button>
              </motion.div>

              {/* External Bloom */}
              <motion.div
                variants={{
                  hover: { opacity: 0.4, scale: 1.15 }
                }}
                initial={{ opacity: 0, scale: 1 }}
                className="absolute inset-0 bg-white/20 blur-3xl -z-10 rounded-full"
              />
            </motion.div>
          </Link>
        </div>
      </section>

      <footer className="py-20 border-t border-white/10 text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
          <div className="flex items-center gap-2 grayscale brightness-200">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-black tracking-tighter text-white uppercase italic">FinCopilot</span>
          </div>
          <div className="text-[10px] uppercase font-black tracking-[0.4em] text-white/20">
            &copy; 2026 FinCopilot Intelligence. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="p-10 border border-white/10 rounded-[2.5rem] bg-black hover:bg-white/5 transition-colors duration-500 space-y-6 group cursor-default"
    >
      <div className={cn(
        "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
        color === 'blue' ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
          color === 'emerald' ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
            "bg-amber-500/10 text-amber-400 border border-amber-500/20"
      )}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-2xl font-black tracking-tight text-white group-hover:translate-x-1 transition-transform">{title}</h3>
      <p className="text-white/40 font-medium leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function AcademyItem({ num, title, desc }: any) {
  return (
    <div className="flex gap-6 group cursor-default">
      <div className="text-xs font-black tracking-widest text-white/20 mt-1.5">{num}</div>
      <div className="space-y-1">
        <h4 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{title}</h4>
        <p className="text-white/40 text-sm font-medium">{desc}</p>
      </div>
    </div>
  );
}
